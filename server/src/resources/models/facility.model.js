const { Schema, model, models } = require("mongoose");
const Joi = require("joi");


const FacilitySchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        images: [{ type: String, required: true }],
        availability: { type: Boolean, required: true, default: true },
        categories: {
            type: [Schema.Types.ObjectId],
            ref: "category",
            required: false,
        },
        deleted: { type: Boolean, required: false, default: false },
    },
    { versionKey: false }
);

const FacilityModel = models.facility || model("facility", FacilitySchema);

const FacilityValidationJoiSchema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().strict().required(),
    description: Joi.string().strict().required(),
    price: Joi.number().strict().required(),
    images: Joi.array().min(1).required(),
    availability: Joi.boolean().required(),
    categories: Joi.array().min(1).required(),
})


module.exports = {
    FacilityModel,
    FacilityValidationJoiSchema,

}