const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

router.post(
    '/',
    authMiddleware.isAuthBodyValid,
    authMiddleware.isUserPresent,
    authMiddleware.isPasswordsMatched,
    authController.login
);

router.post('/logout', authController.logout);

module.exports = router;
