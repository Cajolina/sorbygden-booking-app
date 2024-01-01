const { ProductModel } = require("../models/product.model");


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
        const product = new ProductModel(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
}


module.exports = { getAllProducts, getProduct, getProductsByCategory, createProduct }