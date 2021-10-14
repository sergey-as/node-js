const router = require('express')
    .Router();

const {dataValidate, userRoles} = require('../configs');
const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

router.get(
    '/',
    userMiddleware.getUsersMiddleware,
    userController.getUsers
);

router.post(
    '/',
    userMiddleware.isDataValid(dataValidate.CREATE_USER_BODY),
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.get(
    '/:user_email',
    userMiddleware.isDataValid(dataValidate.EMAIL_PARAMS),
    userMiddleware.getUserByEmailMiddleware,
    userController.getUserByEmail
);
router.put(
    '/:user_email',
    userMiddleware.isDataValid(dataValidate.EMAIL_PARAMS),
    userMiddleware.isDataValid(dataValidate.UPDATE_USER_BODY),
    userMiddleware.getUserByEmailMiddleware,
    userController.updateUser
);
router.delete(
    '/:user_email',
    userMiddleware.isDataValid(dataValidate.EMAIL_PARAMS),
    userMiddleware.getUserByEmailMiddleware,
    userMiddleware.checkUserRole([
        userRoles.MANAGER,
        userRoles.USER
    ]),
    userController.deleteUser
);

module.exports = router;
