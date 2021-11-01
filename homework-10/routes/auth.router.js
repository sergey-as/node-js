const router = require('express')
    .Router();

const {
    actionTokenTypes,
    dataIn: {BODY},
    tokenTypes,
    validatorsName: {AUTH, EMAIL_USER}
} = require('../configs');
const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {authValidator, userValidator} = require('../validators');
const {PASSWORD_USER} = require('../configs/validators.name.enum');

router.post('/',
    userMiddleware.isDataValid(authValidator, AUTH, BODY),
    userMiddleware.isUserPresent(BODY, true),
    authController.login
);
router.put('/password/change',
    userMiddleware.isDataValid(userValidator, PASSWORD_USER, BODY),
    authMiddleware.checkToken(tokenTypes.ACCESS_TOKEN),
    authController.setNewPassword
);
router.post('/password/forgot',
    userMiddleware.isDataValid(userValidator, EMAIL_USER, BODY),
    userMiddleware.isUserPresent(BODY, false),
    authController.sendMailForgotPassword
);
router.put('/password/forgot',
    userMiddleware.isDataValid(userValidator, PASSWORD_USER, BODY),
    authMiddleware.checkActionToken(actionTokenTypes.FORGOT_PASSWORD),
    authController.setNewPasswordAfterForgot
);
router.post('/refresh',
    authMiddleware.checkToken(tokenTypes.REFRESH_TOKEN),
    authController.refresh
);
router.post('/logout',
    authMiddleware.checkToken(tokenTypes.ACCESS_TOKEN),
    authController.logout
);

module.exports = router;
