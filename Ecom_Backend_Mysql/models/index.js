const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    pool: { max: 5, min: 0, idle: 10000 },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync().then(() => {
  console.log("all re sync");
});

db.users = require("./users")(sequelize, DataTypes);
db.category = require("./tbl_category")(sequelize, DataTypes);
db.subCategory = require("./tbl_subcategory")(sequelize, DataTypes);

//relations defindes
// db.category.hasMany(db.subCategory,{foreignKey: "categorySlug"});
// db.subCategory.belongsTo(db.category,{foreignKey: "categorySlug"})



//relations of buyer with all forms
// db.users.hasMany(db.feedbacks,);

//relations of product with all forms
// db.products.hasMany(db.feedbacks,{foreignKey: "product"});

//category ---> product
// db.category.hasMany(db.products,{foreignKey: "category"})

//product---> category
// db.products.belongsTo(db.category,{foreignKey: "category"})

module.exports = db;
