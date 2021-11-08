const {
    constants: {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE},
    messages,
    statusCodes
} = require('../configs');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                return next({
                    message: messages.FILE_NOT_FOUND,
                    status: statusCodes.BAD_REQUEST_400
                });
            }

            const {name, size, mimetype} = req.files.avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                return next({
                    message: messages.NOT_SUPPORTED_FILE_FORMAT,
                    status: statusCodes.BAD_REQUEST_400
                });
            }

            if (size > PHOTO_MAX_SIZE) {
                return next({
                    message: messages.FILE_SIZE_TOO_BIG + ` ${name}`,
                    status: statusCodes.BAD_REQUEST_400
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
