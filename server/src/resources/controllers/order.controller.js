require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const CLIENT_URL = "http://localhost:5173";


async function createCheckoutSession(req, res) {
    try {
        const currentUrl = req.headers.referer;
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
        })
        res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Could not create checkout session.");
    }
}

async function verifySession(req, res) {
    try {
        console.log(req.body);
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
        if (session.payment_status !== "paid") {
            return res.status(400).json({ verified: false })
        } else {
            return res.status(400).json({ verified: true })
        }
        // const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId)

    } catch (error) {
        console.error(error.message)
    }
}

module.exports = { createCheckoutSession, verifySession };
