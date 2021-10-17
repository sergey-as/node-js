const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {config, statusCodes} = require('./configs');
const {authRouter, userRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || statusCodes.INTERNAL_SERVER_ERROR)
        .json({
            msg: err.message
        });
});

app.listen(config.LISTEN_CONNECTION_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`app listen ${config.LISTEN_CONNECTION_PORT}`);
});

// HW-5:
// index.js
// custom err
// .env
// pm2
// check user role