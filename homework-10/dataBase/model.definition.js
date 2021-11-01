const {userRoles} = require('../configs');

module.exports = {
    schemaOptions: {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    },

    nameEmailPassRole: {
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
    }
};
