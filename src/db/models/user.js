import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

userSchema.methods.toJSON = function () { 
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

export const UsersCollection = model('users', userSchema);