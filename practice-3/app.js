const express = require('express');
const mongoose = require('mongoose');

const {MONGO_CONNECT_URL, LISTEN_CONNECTION_PORT} = require('./configs/config');
const retroCarRouter = require('./routes/retroCar.router');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/retroCars', retroCarRouter);

app.listen(LISTEN_CONNECTION_PORT, () => {
    // console.log(`app listen ${PORT}`);
});
//
// создать схему retroCar c такими полями
// - brand
// - model
// - year
// - price
//
// произвести валидации:
//     год должен быть в диапазоне 1885-1980
// цена не меньше 0
// brand уникальный
//
// + CRUD
