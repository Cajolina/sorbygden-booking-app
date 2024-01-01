const { model, Schema, models } = require('mongoose');
const Joi = require('joi');


const CategorySchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    { versionKey: false },
);

const CategoryModel = models.category || model('category', CategorySchema);

const CategoryValidationJoiSchema = Joi.object({
    title: Joi.string().strict().required(),
    description: Joi.string().strict().required(),
});



module.exports = {
    CategoryModel,
    CategorySchema,
    CategoryValidationJoiSchema,

};
