const router = require('express')
    .Router();

const {
    constants: {BODY, PARAMS},
    userRoles,
    validatorsName: {CREATE_USER, EMAIL_USER, UPDATE_USER}
} = require('../configs');
const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {userValidator} = require('../validators');

router.get(
    '/',
    userMiddleware.getUsersMiddleware,
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isDataValid(userValidator, CREATE_USER, BODY),
    userMiddleware.createUserMiddleware,
    userController.createUser
);
router.get(
    '/:email',
    authMiddleware.checkToken(),
    userMiddleware.isDataValid(userValidator, EMAIL_USER, PARAMS),
    authMiddleware.checkAccessByEmail,
    userMiddleware.getUserByEmailMiddleware,
    userController.getUserByEmail
);
router.put(
    '/:email',
    authMiddleware.checkToken(),
    userMiddleware.isDataValid(userValidator, EMAIL_USER, PARAMS),
    authMiddleware.checkAccessByEmail,
    userMiddleware.isDataValid(userValidator, UPDATE_USER, BODY),
    userMiddleware.getUserByEmailMiddleware,
    userController.updateUser
);
router.delete(
    '/:email',
    authMiddleware.checkToken(),
    userMiddleware.isDataValid(userValidator, EMAIL_USER, PARAMS),
    authMiddleware.checkAccessByEmail,
    userMiddleware.getUserByEmailMiddleware,
    userMiddleware.checkUserRole([
        userRoles.ADMIN,
        userRoles.MANAGER,
        userRoles.USER
    ]),
    userController.deleteUser
);

module.exports = router;
