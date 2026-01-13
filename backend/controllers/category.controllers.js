const Category = require("../models/Category");

const newCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

const categoryList = async (req, res) => {
  const categories = await Category.find({ isActive: true });
  res.json(categories);
};
const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, {
    isActive: false,
  });
  res.json(category);
};

module.exports = {
  newCategory,
  categoryList,
  deleteCategory,
};
