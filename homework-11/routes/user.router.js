const router = require('express')
    .Router();

const {
    dataIn: {BODY, PARAMS, QUERY},
    tokenTypes,
    userRoles,
    validatorsName,
} = require('../configs');
const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');
const {userValidator} = require('../validators');

router.get(
    '/',
    userMiddleware.isDataValid(userValidator, validatorsName.GET_USERS, QUERY),
    authMiddleware.checkToken(tokenTypes.ACCESS_TOKEN),
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isDataValid(userValidator, validatorsName.CREATE_USER, BODY),
    userMiddleware.isUserNotPresent,
    userController.createUser
);
router.get(
    '/:email',
    userMiddleware.isDataValid(userValidator, validatorsName.EMAIL_USER, PARAMS),
    authMiddleware.checkToken(tokenTypes.ACCESS_TOKEN),
    userMiddleware.isUserPresent(),
    userController.getUserByEmail
);
router.put(
    '/:email',
    userMiddleware.isDataValid(userValidator, validatorsName.EMAIL_USER, PARAMS),
    userMiddleware.isDataValid(userValidator, validatorsName.UPDATE_USER, BODY),
    authMiddleware.checkToken(tokenTypes.ACCESS_TOKEN),
    authMiddleware.checkAccessByEmail,
    userController.updateUser
);
router.delete(
    '/:email',
    userMiddleware.isDataValid(userValidator, validatorsName.EMAIL_USER, PARAMS),
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
