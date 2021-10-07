const {Schema, model} = require('mongoose');

const userRoles = require('../configs/user-roles.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: false,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamp: true});

module.exports = model(userRoles.USER, userSchema);