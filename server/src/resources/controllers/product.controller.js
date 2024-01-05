const { ProductModel } = require("../models/product.model");



//GET
async function getAllProducts(req, res) {
    try {
        const products = await ProductModel.find({ deleted: false });
        if (products.length === 0) {
            return res.status(200).json({ message: 'No products found.' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }


}

async function getProduct(req, res) {
    try {
        const product = await ProductModel.findOne({
            _id: req.params.id,
            deleted: false,
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function getProductsByCategory(req, res) {
    try {
        const product = await ProductModel.find({ categories: req.params.id });
        if (product.length === 0) {
            return res.status(404).json({ message: 'No products found for the specified category.' });
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function createProduct(req, res) {
    try {
        const product = new ProductModel(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



async function updateProduct(req, res) {
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
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function deleteProduct(req, res) {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: `${req.params.id} not found` });
        }
        return res.status(204).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getAllProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct }