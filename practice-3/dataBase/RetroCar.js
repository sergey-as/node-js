const {Schema, model} = require('mongoose');

const retroCarSchema = new Schema({
    brand: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamp: true});

module.exports = model('retroCar', retroCarSchema);
