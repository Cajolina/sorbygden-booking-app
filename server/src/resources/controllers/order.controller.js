
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const CLIENT_URL = "http://localhost:5173";

const { OrderModel } = require("../models/order.model")


// async function createCheckoutSession(req, res) {
//     try {

//         const currentUrl = req.headers.referer;
//         const { cart } = req.body;
//         const productArray = req.body.map((item) => ({
//             product: item.product._id,
//             quantity: item.quantity
//         }));

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
//                 product: JSON.stringify(productArray)
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


//         const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
//         if (session.payment_status !== "paid") {
//             return res.status(400).json({ verified: false })
//         }


//         const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
//         // console.log("line_items", line_items);
//         // console.log("session", session);


//         const productItem = session.metadata.product
//         console.log(productItem);


//         const order = new OrderModel({
//             created: new Date(session.created * 1000).toISOString().split("T")[0],
//             orderNumber: Math.floor(Math.random() * 1000000),
//             orderItems: JSON.parse(productItem),
//             totalOrderAmount: line_items.data.reduce((total, item) => {
//                 const price = item.price.unit_amount / 100;
//                 const quantity = item.quantity;
//                 return total + price * quantity;
//             }, 0),
//         });
//         console.log(order);
//         await order.save();

//         res.status(201).json({ verified: true });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// async function getOrders(req, res) {
//     try {
//         const orders = await OrderModel.find()
//         res.status(200).json(orders)
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// }

// module.exports = { createCheckoutSession, verifySession, getOrders };
async function createCheckoutSession(req, res) {
    try {
        const currentUrl = req.headers.referer;
        const { cart } = req.body;
        const productArray = req.body.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            productType: item.product.type,
        }));
        // const productTypeArray = req.body.map((item) => ({
        //     productType: item.product.type,
        // }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.map((item) => ({
                price_data: {
                    currency: 'sek',
                    product_data: {
                        name: item.product.title,
                    },
                    unit_amount: item.product.price * 100,
                },
                quantity: item.quantity,
            })),
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: currentUrl,
            metadata: {
                product: JSON.stringify(productArray),
                // productType: JSON.stringify(productTypeArray),
            },
        });

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

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== "paid") {
            return res.status(400).json({ verified: false });
        }

        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

        const productItem = session.metadata.product;
        // const productTypeItem = JSON.parse(session.metadata.productType);

        const order = new OrderModel({
            created: new Date(session.created * 1000).toISOString().split("T")[0],
            orderNumber: Math.floor(Math.random() * 1000000),
            orderItems: JSON.parse(productItem).map((item, index) => ({
                product: item.product,
                quantity: item.quantity,
                productType: item.productType,
            })),
            totalOrderAmount: lineItems.data.reduce((total, item) => {
                const price = item.price.unit_amount / 100;
                const quantity = item.quantity;
                return total + price * quantity;
            }, 0),
        });

        await order.save();

        res.status(201).json({ verified: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getOrders(req, res) {
    try {
        const orders = await OrderModel.find()
        res.status(200).json(orders)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { createCheckoutSession, verifySession, getOrders };