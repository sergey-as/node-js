const router = require('express').Router();

const {dataValidate} = require('../configs');
const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');

router.post(
    '/',
    userMiddleware.isDataValid(dataValidate.AUTH_BODY),
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordsMatched,
    authController.login
);

router.post('/logout', authController.logout);

module.exports = router;
