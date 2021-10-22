const { Schema, model } = require('mongoose');

const {modelsName} = require('../configs');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelsName.USER
    },

}, { timestamps: true });

module.exports = model(modelsName.O_AUTH, oAuthSchema);
