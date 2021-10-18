const {model, Schema} = require('mongoose');

const {modelsName, userRoles} = require('../configs');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamp: true});

module.exports = model(modelsName.USER, userSchema);
