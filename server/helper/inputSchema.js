import Joi from 'joi';

const signUpSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    profilePicture: Joi.string().optional(),

    isEmailVerified: Joi.boolean().optional(),

    name: Joi.string().optional(),

})


const loginSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

export { signUpSchema, loginSchema }