const db = require("../models");
const Category = db.category;
const SubCategory = db.subCategory;

//Fetch all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error in category controller${error.message}` });
    console.log(error);
  }
};

//fetch all sub categories
const getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.findAll();
    return res.json(subcategories);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error in category controller${error.message}` });
    console.log(error);
  }
};

//fetch all sub categories by one category id
const getSubCategoriesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const subcategories = await SubCategory.findAll({
      where: { categorySlug: categoryId },
    });
    return res.json(subcategories);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error in category controller${error.message}` });
    console.log(error);
  }
};

//fetch all sub categories by one category id
const CategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findOne({
      where: { categorySlug: categoryId },
    });

    return res.json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error in category controller${error.message}` });
    console.log(error);
  }
};

module.exports = {
  getCategories,
  getSubCategories,
  getSubCategoriesByCategory,
  CategoryById,
};
