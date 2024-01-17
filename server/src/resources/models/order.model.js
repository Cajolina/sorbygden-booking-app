const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

const ProductType = new Schema({
    productType: { type: String, enum: ['event', 'facility'] }
})

const OrderItemSchema = new Schema({
    // products: [{
    //     product: { type: Schema.Types.ObjectId, required: true, refPath: 'productType' },
    //     productType: { type: String, enum: ['Event', 'Facility'], required: true },

    // }],
    // product: { type: Schema.Types.ObjectId, required: true, refPath: 'productType' },
    // productType: { type: String, enum: ['event', 'facility'], required: true },
    product: { type: Schema.Types.ObjectId, required: true, ref: 'event' },
    quantity: { type: Number, required: true },
    // price: { type: Number, default: 0 },
});

const OrderSchema = new Schema({
    created: {
        type: String,
        default: new Date().toISOString().split("T")[0],
    },
    orderNumber: {
        type: Number,
        required: true,
        default: Math.floor(Math.random() * 1000000),
    },
    // orderItems: { type: [OrderItemSchema], required: true },
    orderItems: [{
        product: { type: Schema.Types.ObjectId, required: true, ref: 'event' },
        quantity: { type: Number, required: true }
    }],
    totalOrderAmount: { type: Number, required: true }

}
);

const OrderModel = models.order || model("order", OrderSchema);

const OrderValidationJoiSchema = Joi.object({
    created: Joi.string().isoDate(),
    sessionId: Joi.string().required(),
    orderItems: Joi.array().items(Joi.object({
        // products: Joi.array().items(Joi.object({
        //     product: Joi.string().required(),
        //     productType: Joi.string().valid('Event', 'Facility').required(),

        // })),
        product: Joi.string().required(),
        quantity: Joi.number().required(),
        // price: Joi.number().default(0),
    })).required(),
});

module.exports = { OrderModel, OrderValidationJoiSchema };
