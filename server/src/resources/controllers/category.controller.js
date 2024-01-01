const { CategoryModel } = require("../models/category.model")

async function getAllCategories(req, res) {
    const categories = await CategoryModel.find({});
    res.status(200).json(categories);
}

async function getCategory(req, res, next) {
    try {
        const specificCategory = await CategoryModel.findById({
            _id: req.params.id,
        });
        res.status(200).json(specificCategory);
    } catch (error) {
        next(error);
    }
}

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