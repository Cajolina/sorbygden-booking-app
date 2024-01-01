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


async function updateProduct(req, res, next) {
    try {
        const exists = await ProductModel.findById(req.params.id);
        if (!exists) {
            return res.status(404).json(`${req.params.id} not found`);
        }
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
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