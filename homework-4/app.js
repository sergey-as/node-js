const express = require('express');
const mongoose = require('mongoose');

const {MONGO_CONNECT_URL, LISTEN_CONNECTION_PORT} = require('./configs/config');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/authenticate.router');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(LISTEN_CONNECTION_PORT, () => {
    // console.log(`app listen ${PORT}`);
});
