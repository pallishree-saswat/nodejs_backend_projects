const db = require("../models");
const Category = db.category;
const SubCategory = db.subCategory;
const Products = db.products;
const Photos = db.photos;
const Video = db.videos;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Fetch all Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      // where: {
      //   status: { [Op.eq]: "Active" },
      //   isDeleted: { [Op.eq]: "0" },
      // },
      // include: [{ model: Photos }],
      // order: [["createdAt", "DESC"]],
    });

    if (products)
      return res.status(200).json({
        msg: "Ok",
        products,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error in Product controller${error.message}` });
  }
};

//Fetch a single Product
const getSingleProduct = async (req, res, next) => {
  const productID = req.params.productID;
  try {
    const product = await Products.findOne({
      where: { prodID: productID },
      include: [{ model: Photos }, { model: Video }],
    });

    return res.status(200).json({
      msg: "Ok",
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(`error in Product Ctrl ${err}`);
  }
};
//Fetch All Products By Category

const productByCategory = async (req, res) => {
  const categoryID = req.params.categoryID;

  try {
    const { page } = req.body;
    const currentPage = page || 1;
    const perPage = 12;
    const startIndex = (currentPage - 1) * perPage;
    const lastIndex = currentPage * perPage;

    let category = await Category.findOne({
      where: { categoryID },
      include: [{ model: Products }],
    });
    const products = await Products.findAll({
      where: {
        catID: category.categoryID,
        status: { [Op.eq]: "Active" },
        isDeleted: { [Op.eq]: "0" },
      },
      include: [{ model: Photos }],
      order: [["id", "DESC"]],
      limit: perPage,
      offset: startIndex,
    });
    const totalProducts = await Products.count({
      where: {
        catID: category.categoryID,
        status: { [Op.eq]: "Active" },
        isDeleted: { [Op.eq]: "0" },
      },
    });
    return res.status(200).json({ products, category, totalProducts });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//Fetch All Products  sub category
const getProductsForSubCategory = async (req, res) => {
  const { subCatId } = req.params;
  try {
    const products = await Products.findAll({
      where: {
        subcatID: subCatId,
        status: { [Op.eq]: "Active" },
        isDeleted: { [Op.eq]: "0" },
      },
      include: [{ model: Photos }],
    });
    return res.status(200).json({ msg: "Ok", products });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//Related Products
const relatedProducts = async (req, res) => {
  const productID = req.params.productID;
  try {
    const product = await Products.findOne({
      where: { prodID: productID },
      include: [{ model: Photos }],
    });
    const relatedProducts = await Products.findAll({
      where: {
        catID: product.catID,
        prodID: { [Op.ne]: product.prodID },
        status: { [Op.eq]: "Active" },
        isDeleted: { [Op.eq]: "0" },
      },
      include: [{ model: Photos }],
      limit: 6,
    });
    return res.status(200).json(relatedProducts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//search Products
const searchProduct = async (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Products.findAll({
    where: {
      name: { [Op.like]: "%" + term + "%" },
      status: { [Op.eq]: "Active" },
      isDeleted: { [Op.eq]: "0" },
    },
    include: [{ model: Photos }],
  })
    .then((products) => res.status(200).json({ products }))
    .catch((err) => res.status(500).json(err));
};

//Total Products counts
const totalProducts = async (req, res) => {
  try {
    const totalProducts = await Products.count({
      where: {
        status: { [Op.eq]: "Active" },
        isDeleted: { [Op.eq]: "0" },
      },
    });
    return res.status(200).json(totalProducts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  productByCategory,
  getProductsForSubCategory,
  relatedProducts,
  searchProduct,
  totalProducts,
};
