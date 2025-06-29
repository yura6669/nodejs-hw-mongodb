import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
    email: Joi.string().email().allow(null, '').optional(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid('work', 'home', 'personal').default('personal').required(),
    userId: Joi.string().custom((value, helper) => {
        if (value && !isValidObjectId(value)) {
            return helper.message('user id should be a valid mongo id');
        }
        return true;
    }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid('work', 'home', 'personal').optional(),
    userId: Joi.string().custom((value, helper) => { 
        if (value && !isValidObjectId(value)) {
            return helper.message('user id should be a valid mongo id');
        }
        return true;
    }),
});