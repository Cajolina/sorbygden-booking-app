const { ProductModel } = require("../models/product.model");
const dotenv = require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);


//GET
async function getAllProducts(req, res) {
    const products = await ProductModel.find({ deleted: false });
    res.status(200).json(products);

}

async function getProduct(req, res) {
    const product = await ProductModel.findOne({
        _id: req.params.id,
        deleted: false,
    });
    res.status(200).json(product);
}

async function getProductsByCategory(req, res, next) {
    try {
        const product = await ProductModel.find({ categories: req.params.id });
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}


async function createProduct(req, res, next) {
    try {

        //Stripe
        const stripeProduct = await stripe.products.create({
            id: req.body.id,
            name: req.body.title,
            description: req.body.description,
            images: req.body.images,
            default_price_data: {
                unit_amount: req.body.price * 10,
                currency: 'sek',
            },
        })
        console.log("Stripe Response:", stripeProduct);
        if (!stripeProduct) {
            return res.status(500).json({ error: 'Failed to create product in Stripe.' });
        }

        //Retrive price not id
        // const retrievedPrice = await stripe.prices.retrieve(stripeProduct.default_price);
        // console.log("Retrieved Price:", retrievedPrice.unit_amount / 10);

        const product = new ProductModel(req.body);
        await product.save();
        res.status(201).json({
            product: product,
            stripeProduct: stripeProduct,
        });
    } catch (err) {
        next(err);
    }
}


async function updateProduct(req, res, next) {
    try {
        // const productId = req.params.id;
        const exists = await ProductModel.findById(req.params.id);
        if (!exists) {
            return res.status(404).json(`${req.params.id} not found`);
        }
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );


        // Uppdatera produkten i Stripe

        // const stripeProduct = await stripe.products.update(productId, {
        //     name: req.body.title,
        //     description: req.body.description,
        //     images: req.body.images,
        //     default_price: {
        //         unit_amount: req.body.price * 10,
        //         currency: 'sek',
        //     },
        // });

        // return res.status(200).json({ product, stripeProduct });
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}


async function deleteProduct(req, res, next) {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: `${req.params.id} not found` });
        }
        return res.status(204).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct }