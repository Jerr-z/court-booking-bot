import Joi from 'joi';

export const BookUBCTaskRequestBodySchema = Joi.object({
    url: Joi.string()
        .uri()
        .pattern(/^https:\/\/ubc\.perfectmind\.com\/24063\//)
        .required()
        .messages({
            'string.pattern.base': 'URL must start with "https://ubc.perfectmind.com/24063/".',
        }),

    numOfPlayers: Joi.number()
        .integer()
        .min(1)
        .max(4)
        .required()
        .messages({
            'number.min': 'numOfPlayers must be at least 1.',
            'number.max': 'numOfPlayers cannot be greater than 4.',
        }),

    numOfHours: Joi.number()
        .integer()
        .min(1)
        .max(2)
        .required()
        .messages({
            'number.min': 'numOfHours must be at least 1.',
            'number.max': 'numOfHours cannot be greater than 2.',
        }),

    startTime: Joi.string()
        .isoDate()
        .required()
        .messages({
            'string.isoDate': 'startTime must be a valid ISO timestamp.',
        }),
});
