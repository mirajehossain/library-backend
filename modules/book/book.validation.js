const Joi = require('joi');
module.exports = {
    bookSchema: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        publication: Joi.string().required(),
        publicationYear: Joi.string().required(),
        category: Joi.string(),
        summary: Joi.string(),
    }),
    updateBookSchema: Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        publication: Joi.string(),
        publicationYear: Joi.string(),
        category: Joi.string(),
        summary: Joi.string(),
    }),
};
