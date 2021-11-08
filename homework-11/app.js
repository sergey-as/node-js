const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
require('dotenv')
    .config();

const {config, statusCodes} = require('./configs');
const startCron = require('./cron');
const {ErrorHandler} = require('./errors');
const {defaultData} = require('./util');
const {authRouter, userRouter} = require('./routes');
const {swaggerDocument} = require('./docs');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL)
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Mongo connected successfully');
    });

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (config.NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/auth', authRouter);
app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || statusCodes.INTERNAL_SERVER_ERROR_500)
        .json({
            msg: err.message
        });
});

app.listen(config.LISTEN_CONNECTION_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`app listen ${config.LISTEN_CONNECTION_PORT}`);
    defaultData();
    startCron();
});

function _configureCors(origin, callback) {
    if (config.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = config.ALLOWED_ORIGIN.split(';');
    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }

    return callback(null, true);
}

// HW-11:
// S3 Bucket
// Sending messages to users who have not logged in for more than ten days.
