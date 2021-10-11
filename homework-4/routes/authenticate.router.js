const router = require('express').Router();

const authController = require('../controllers/authenticate.controller');
const authMiddleware = require('../middlewares/authenticate.middleware');

router.post(
    '/',
    authMiddleware.isAuthBodyValid,
    authMiddleware.authenticateMiddleware,
    authController.authenticateController
);

module.exports = router;
