const {emailActions, statusCodes} = require('../configs');
const {User, O_Auth} = require('../dataBase');
const {userUtil} = require('../util');
const {emailService, passwordService} = require('../service');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find()
                .lean();

            req.users = users.map(user => userUtil.userNormalizer(user));
            res.json(req.users);
        } catch (e) {
            next(e);
        }
    },

    getUserByEmail: (req, res, next) => {
        try {
            const user = req.user;
            req.user = userUtil.userNormalizer(user);

            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {email, name: userName, password} = req.body;
            const hashedPassword = await passwordService.hash(password);

            const createdUser = await User.create({...req.body, password: hashedPassword});

            await emailService.sendMail(email, emailActions.REGISTERED, {userName, userEmail: email});

            req.user = userUtil.userNormalizer(createdUser.toObject());

            res.status(statusCodes.CREATED_201)
                .json(req.user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {email, name: oldName} = req.user;
            const updatedUser = await User.findOneAndUpdate({email}, req.body, {new: true})
                .lean();

            req.user = userUtil.userNormalizer(updatedUser);
            const {name: userName} = req.user;

            await emailService.sendMail(email, emailActions.UPDATED, {userName, oldName});

            res.json(req.user)
                .status(statusCodes.CREATED_201);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {email, name: userName} = req.user;

            await O_Auth.deleteMany({user_id: req.user._id});
            await User.deleteOne(req.user);

            await emailService.sendMail(email, emailActions.REMOVED, {userName, userEmail: email});

            res.sendStatus(statusCodes.NO_CONTENT_204);
        } catch (e) {
            next(e);
        }
    }
};
