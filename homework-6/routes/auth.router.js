const router = require('express')
    .Router();

const {
    auth,
    constants: {BODY},
    tokenTypes: {REFRESH_TOKEN},
    validatorsName: {AUTH}
} = require('../configs');
const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {authValidator} = require('../validators');

router.post('/',
    userMiddleware.isDataValid(authValidator, AUTH, BODY),
    userMiddleware.isUserPresent(BODY,true),
    authMiddleware.isPasswordsMatched,
    authController.loginRefreshLogout(auth.LOGIN)
);
router.post('/refresh',
    authMiddleware.checkToken(REFRESH_TOKEN),
    authController.loginRefreshLogout(auth.REFRESH)
);
router.post('/logout',
    authMiddleware.checkToken(),
    authController.loginRefreshLogout(auth.LOGOUT)
);

module.exports = router;
