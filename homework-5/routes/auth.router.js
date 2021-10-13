const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');

router.post(
    '/',
    authMiddleware.isAuthBodyValid,
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordsMatched,
    authController.login
);

router.post('/logout', authController.logout);

module.exports = router;
