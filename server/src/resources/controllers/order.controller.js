// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_API_KEY);
// const CLIENT_URL = "http://localhost:5173";
// const { OrderModel } = require("../models/order.model")

// async function createCheckoutSession(req, res) {
//     try {
//         const currentUrl = req.headers.referer;
//         const { cart } = req.body;
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             line_items: req.body.map((item) => {
//                 console.log('item.price:', item.product.price);
//                 return {
//                     price_data: {
//                         currency: 'sek',
//                         product_data: {
//                             name: item.product.title
//                         },
//                         unit_amount: item.product.price * 100
//                     }
//                     ,
//                     quantity: item.quantity,
//                 };
//             }),
//             success_url: `${CLIENT_URL}/confirmation`,
//             cancel_url: currentUrl,
//             metadata: {
//                 product: req.body.map((item) => ({
//                     productIds: [item.product._id],
//                     productTypes: [item.product.type],
//                 })),
//             },
//         })
//         res.status(200).json({ url: session.url, sessionId: session.id });
//     } catch (error) {
//         console.log(error.message);
//         res.status(400).json("Could not create checkout session.");
//     }
// }

// async function verifySession(req, res) {
//     try {
//         const { sessionId, orderItems } = req.body;
//         console.log('Received sessionId:', sessionId);
//         console.log('Received orderItems:', orderItems);
//         const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
//         if (session.payment_status !== "paid") {
//             return res.status(400).json({ verified: false })
//         }
//         const productMetadata = session.metadata.product;
//         const productIds = productMetadata.map((item) => item.productIds[0]);
//         const productTypes = productMetadata.map((item) => item.productTypes[0]);
//         console.log(productIds)
//         const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
//         console.log(line_items);
//         const order = new OrderModel({
//             created: new Date(session.created * 1000).toISOString().split("T")[0],
//             orderNumber: Math.floor(Math.random() * 1000000),
//             orderItems: line_items.data.map((item, index) => {
//                 const price = item.price.unit_amount / 100;
//                 const quantity = item.quantity;
//                 const totalPrice = price * quantity;
//                 const productId = productIds[index];
//                 const productType = productTypes[index];
//                 return {
//                     products: [
//                         {
//                             product: productId,
//                             productType: productType,
//                         },
//                     ],
//                     quantity: item.quantity,
//                     price: item.price.unit_amount / 100,
//                     totalPrice: (item.price.unit_amount / 100) * item.quantity,
//                 };
//             },

//             ),
//             totalOrderAmount: line_items.data.reduce((total, item) => {
//                 const price = item.price.unit_amount / 100;
//                 const quantity = item.quantity;
//                 return total + price * quantity;
//             }, 0),
//         })

//         await order.save()
//         console.log(order);
//         res.status(201).json({ verified: true })

//     } catch (error) {
//         console.error(error.message)
//     }
// }
// module.exports = { createCheckoutSession, verifySession };
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const CLIENT_URL = "http://localhost:5173";
const { OrderModel } = require("../models/order.model")

async function createCheckoutSession(req, res) {
    try {
        const currentUrl = req.headers.referer;
        const { cart } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.map((item) => {
                console.log('item.price:', item.product.price);
                return {
                    price_data: {
                        currency: 'sek',
                        product_data: {
                            name: item.product.title
                        },
                        unit_amount: item.product.price * 100
                    }
                    ,
                    quantity: item.quantity,
                };
            }),
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: currentUrl,
            metadata: {
                product: req.body._id
            },
        })
        res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Could not create checkout session.");
    }
}

async function verifySession(req, res) {
    try {

        const { sessionId, orderItems } = req.body;
        console.log('Received sessionId:', sessionId);
        console.log('Received orderItems:', orderItems);
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
        if (session.payment_status !== "paid") {
            return res.status(400).json({ verified: false })
        } console.log(session.metadata);
        const productMetadata = session.metadata.product;
        // console.log(productMetadata);
        const productId = productMetadata.product;
        // console.log(productId)

        const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
        // console.log(line_items);

        if (!Array.isArray(productMetadata)) {
            console.error("Product metadata is not an array");
            return res.status(400).json({ verified: false });
        }
        const order = new OrderModel({
            created: new Date(session.created * 1000).toISOString().split("T")[0],
            orderNumber: Math.floor(Math.random() * 1000000),
            orderItems: line_items.data.map((item, index) => {
                const price = item.price.unit_amount / 100;
                const quantity = item.quantity;
                const totalPrice = price * quantity;
                const productId = productMetadata[index].product;

                return {
                    product: productId,
                    quantity: item.quantity,
                    price: item.price.unit_amount / 100,
                    totalPrice: (item.price.unit_amount / 100) * item.quantity,
                };
            },

            ),
            totalOrderAmount: line_items.data.reduce((total, item) => {
                const price = item.price.unit_amount / 100;
                const quantity = item.quantity;
                return total + price * quantity;
            }, 0),
        })

        await order.save()
        console.log(order);
        res.status(201).json({ verified: true })

    } catch (error) {
        console.error(error.message)
    }
}
module.exports = { createCheckoutSession, verifySession };
