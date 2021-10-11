const router = require('express').Router();

const authController = require('../controllers/authenticate.controller');
const authMiddleware = require('../middlewares/authenticate.middleware');
const userMiddleware = require("../middlewares/user.middleware");

router.post(
    '/',
    authMiddleware.isAuthBodyValid,
    authMiddleware.authenticateMiddleware,
    userMiddleware.normalizeUserMiddleware,
    authController.authenticateController
);

module.exports = router;
