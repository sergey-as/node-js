const router = require('express')
    .Router();

const {
    constants: {BODY, EMAIL, PARAMS},
    userRoles: {MANAGER, USER},
    validatorsName: {CREATE_USER, EMAIL_USER, UPDATE_USER}
} = require('../configs');
const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');
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
    `/:${EMAIL}`,
    userMiddleware.isDataValid(userValidator, EMAIL_USER, PARAMS),
    userMiddleware.getUserByEmailMiddleware,
    userController.getUserByEmail
);
router.put(
    `/:${EMAIL}`,
    userMiddleware.isDataValid(userValidator, EMAIL_USER, PARAMS),
    userMiddleware.isDataValid(userValidator, UPDATE_USER, BODY),
    userMiddleware.getUserByEmailMiddleware,
    userController.updateUser
);
router.delete(
    `/:${EMAIL}`,
    userMiddleware.isDataValid(userValidator, EMAIL_USER, PARAMS),
    userMiddleware.getUserByEmailMiddleware,
    userMiddleware.checkUserRole([
        MANAGER,
        USER
    ]),
    userController.deleteUser
);

module.exports = router;
