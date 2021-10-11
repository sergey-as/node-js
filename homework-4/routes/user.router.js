const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get(
    '/',
    userMiddleware.getUsersMiddleware,
    userMiddleware.normalizeUsersMiddleware,
    userController.getUsers
);

router.post(
    '/',
    userMiddleware.isCreateUserBodyValid,
    userMiddleware.createUserMiddleware,
    userMiddleware.normalizeUserMiddleware,
    userController.createUser
);

router.get(
    '/:user_email',
    userMiddleware.isUserEmailValid,
    userMiddleware.getUserByEmailMiddleware,
    userMiddleware.normalizeUserMiddleware,
    userController.getUserByEmail
);
router.put(
    '/:user_email',
    userMiddleware.isUserEmailValid,
    userMiddleware.isUpdateUserBodyValid,
    userMiddleware.getUserByEmailMiddleware,
    userMiddleware.updateUserMiddleware,
    userMiddleware.normalizeUserMiddleware,
    userController.updateUser
);
router.delete(
    '/:user_email',
    userMiddleware.isUserEmailValid,
    userMiddleware.getUserByEmailMiddleware,
    userController.deleteUser
);

module.exports = router;
