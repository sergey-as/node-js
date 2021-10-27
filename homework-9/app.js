const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv')
    .config();

const {config, statusCodes} = require('./configs');
const startCron = require('./cron');
const {ErrorHandler} = require('./errors');
const {defaultData} = require('./util');
const {authRouter, userRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

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

// HW-9:
//
