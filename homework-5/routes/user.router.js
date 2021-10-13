const router = require('express')
    .Router();

const {userRoles} = require('../configs');
const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

router.get(
    '/',
    userMiddleware.getUsersMiddleware,
    userController.getUsers
);

router.post(
    '/',
    userMiddleware.isCreateUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.get(
    '/:user_email',
    userMiddleware.isUserEmailValid,
    userMiddleware.getUserByEmailMiddleware,
    userController.getUserByEmail
);
router.put(
    '/:user_email',
    userMiddleware.isUserEmailValid,
    userMiddleware.isUpdateUserBodyValid,
    userMiddleware.getUserByEmailMiddleware,
    userController.updateUser
);
router.delete(
    '/:user_email',
    userMiddleware.isUserEmailValid,
    userMiddleware.getUserByEmailMiddleware,
    userMiddleware.checkUserRole([
        userRoles.MANAGER,
        userRoles.USER
    ]),
    userController.deleteUser
);

module.exports = router;
