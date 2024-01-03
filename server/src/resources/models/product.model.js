const { Schema, model, models } = require("mongoose");
const Joi = require("joi");


const ProductSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        images: [{ type: String, required: true }],
        inStock: { type: Number, required: true, default: 0 },
        categories: {
            type: [Schema.Types.ObjectId],
            ref: "category",
            required: false,
        },
        deleted: { type: Boolean, required: false, default: false },
    },
    { versionKey: false }
);

const ProductModel = models.product || model("product", ProductSchema);

const ProductValidationJoiSchema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().strict().required(),
    description: Joi.string().strict().required(),
    price: Joi.number().strict().required(),
    images: Joi.array().min(1).required(),
    inStock: Joi.number().strict().required(),
    categories: Joi.array().min(1).required(),
})


module.exports = {
    ProductModel,
    ProductValidationJoiSchema,

}