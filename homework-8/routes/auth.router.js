const router = require('express')
    .Router();

const {
    constants: {BODY},
    tokenTypes: {REFRESH_TOKEN},
    validatorsName: {AUTH}
} = require('../configs');
const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {authValidator} = require('../validators');

router.post('/',
    userMiddleware.isDataValid(authValidator, AUTH, BODY),
    userMiddleware.isUserPresent(BODY, true),
    authController.login
);
router.post('/refresh',
    authMiddleware.checkToken(REFRESH_TOKEN),
    authController.refresh
);
router.post('/logout',
    authMiddleware.checkToken(),
    authController.logout
);

module.exports = router;
