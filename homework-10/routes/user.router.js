const router = require('express')
    .Router();

const {
    constants: {BODY, PARAMS},
    tokenTypes,
    userRoles,
    validatorsName: {CREATE_USER, EMAIL_USER, UPDATE_USER},
} = require('../configs');
const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {userValidator} = require('../validators');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isDataValid(userValidator, CREATE_USER, BODY),
    userMiddleware.isUserNotPresent,
    userController.createUser
);
router.get(
    '/:email',
    userMiddleware.isDataValid(userValidator, EMAIL_USER, PARAMS),
    userMiddleware.isUserPresent(),
    userController.getUserByEmail
);
router.put(
    '/:email',
    userMiddleware.isDataValid(userValidator, EMAIL_USER, PARAMS),
    userMiddleware.isDataValid(userValidator, UPDATE_USER, BODY),
    authMiddleware.checkToken(tokenTypes.ACCESS_TOKEN),
    authMiddleware.checkAccessByEmail,
    userController.updateUser
);
router.delete(
    '/:email',
    userMiddleware.isDataValid(userValidator, EMAIL_USER, PARAMS),
    authMiddleware.checkToken(tokenTypes.ACCESS_TOKEN),
    authMiddleware.checkAccessByEmail,
    userMiddleware.checkUserRole([
        userRoles.ADMIN,
        userRoles.MANAGER,
        userRoles.USER
    ]),
    userController.deleteUser
);

module.exports = router;
