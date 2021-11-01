const {model, Schema} = require('mongoose');

const {modelsName} = require('../configs');
const modelDefinition = require('./model.definition');
// const {passwordService} = require('../service'); //for fixing circular dependence
const passwordService = require('../service/password.service'); //for fixing circular dependence

const userSchema = new Schema({
    ...modelDefinition.nameEmailPassRole
}, modelDefinition.schemaOptions);

userSchema.methods = {
    isPasswordsMatched(password) {
        const hashPassword = this.password;
        return passwordService.compare(password, hashPassword);
    },
    normalize() {
        const userToNormalize = this.toObject();
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);
        return this.create({...userObject, password: hashedPassword});
    }
};

userSchema.virtual('userInfo')
    .get(function() {
        return `Name: ${this.name} email: ${this.email} role: ${this.role}`;
    });

module.exports = model(modelsName.USER, userSchema);
