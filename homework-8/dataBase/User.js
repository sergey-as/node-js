const {model, Schema} = require('mongoose');

const {modelsName, userRoles} = require('../configs');
const {passwordService} = require('../service');
// const {userUtil} = require('../util');

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
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.methods = {
    isPasswordsMatched(password) {
        const hashPassword = this.password;
        return passwordService.compare(password, hashPassword);
    },
    // normalize() {
    //     return userUtil.userNormalizer(this.toObject());
    // },
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
    },
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
