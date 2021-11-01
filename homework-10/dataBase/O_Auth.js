const {Schema, model} = require('mongoose');

const {modelsName} = require('../configs');
const modelDefinition = require('./model.definition');

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
    }
}, modelDefinition.schemaOptions);

oAuthSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(modelsName.O_AUTH, oAuthSchema);
