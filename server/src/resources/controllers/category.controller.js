const { CategoryModel } = require("../models/category.model")

// Retrieve all categories
async function getAllCategories(req, res) {
    try {
        const categories = await CategoryModel.find({});
        if (categories.length === 0) {
            return res.status(404).json({ message: 'No categories found.' });
        }
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

// Retrieve a specific category by its ID
async function getCategory(req, res) {
    try {
        const specificCategory = await CategoryModel.findById({
            _id: req.params.id,
        });

        if (!specificCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json(specificCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Create a new category based on the provided request body
async function createCategory(req, res) {
    try {
        const category = new CategoryModel(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }

}

module.exports = { getAllCategories, getCategory, createCategory }