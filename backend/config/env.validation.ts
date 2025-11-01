import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
});