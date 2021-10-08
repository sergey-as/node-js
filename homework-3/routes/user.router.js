const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_email', userMiddleware.getUserByEmailMiddleware, userController.getUserByEmail);
router.put('/:user_email', userMiddleware.getUserByEmailMiddleware, userController.updateUser);
router.delete('/:user_email', userMiddleware.getUserByEmailMiddleware, userController.deleteUser);

module.exports = router;
