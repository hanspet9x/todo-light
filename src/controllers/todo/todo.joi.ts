import Joi from 'joi';

export const TodoValidator = {
    add: Joi.object({
        title: Joi.string().required()
    }),

    update: Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required()
    }),

    delete: Joi.object({
        id: Joi.string().required()
    })
}