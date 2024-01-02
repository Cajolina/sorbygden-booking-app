const { Schema, model, models } = require("mongoose");
const Joi = require("joi");


const AdminSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
});

const AdminModel = models.admin || model("admin", AdminSchema);

const AdminValidationJoiSchema = Joi.object({
    firstName: Joi.string().strict().required(),
    lastName: Joi.string().strict().required(),
    email: Joi.string().email().strict().required(),
    password: Joi.string().strict().required(),
    isAdmin: Joi.boolean().strict(),
});

module.exports = { AdminModel, AdminValidationJoiSchema };
