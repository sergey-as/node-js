const router = require('express')
    .Router();

const {
    constants: {BODY},
    validatorsName: {AUTH}
} = require('../configs');
const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');
const {authValidator} = require('../validators');

router.post(
    '/',
    userMiddleware.isDataValid(authValidator, AUTH, BODY),
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordsMatched,
    authController.login
);

router.post('/logout', authController.logout);

module.exports = router;
