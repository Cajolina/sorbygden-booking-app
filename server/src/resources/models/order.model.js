
const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

const OrderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, required: true, ref: 'productType' },
    quantity: { type: Number, required: true },
    productType: { type: String, enum: ['event', 'facility'], required: true },
});

const OrderSchema = new Schema({
    created: {
        type: String,
        default: new Date().toISOString().split("T")[0],
    },
    customer: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    orderNumber: {
        type: Number,
        required: true,
        default: Math.floor(Math.random() * 1000000), //calculate ordernumber
    },
    orderItems: [OrderItemSchema],
    totalOrderAmount: { type: Number, required: true },
});

const OrderModel = models.order || model("order", OrderSchema);

const OrderValidationJoiSchema = Joi.object({
    created: Joi.string().isoDate(),
    sessionId: Joi.string().required(),
    orderItems: Joi.array().items(Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().required(),
        productType: Joi.string().valid('event', 'facility').required(),
    })).required(),
});

module.exports = { OrderModel, OrderValidationJoiSchema };