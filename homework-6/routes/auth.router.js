const router = require('express')
    .Router();

const {
    constants: {BODY, DELETE},
    tokenTypes: {REFRESH_TOKEN},
    validatorsName: {AUTH}
} = require('../configs');
const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {authValidator} = require('../validators');

router.post('/',
    userMiddleware.isDataValid(authValidator, AUTH, BODY),
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordsMatched,
    authMiddleware.generateTokenPair,
    authController.login
);
router.post('/refresh',
    authMiddleware.checkToken(DELETE, REFRESH_TOKEN),
    authMiddleware.generateTokenPair,
    authController.refresh
);
router.post('/logout',
    authMiddleware.checkToken(DELETE),
    authController.logout
);

module.exports = router;
