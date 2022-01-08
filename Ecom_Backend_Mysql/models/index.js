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
db.products = require("./tbl_product")(sequelize, DataTypes);
db.photos = require("./tbl_product_photos")(sequelize, DataTypes);
db.videos = require("./tbl_product_videos")(sequelize, DataTypes);

db.products.hasMany(db.photos, { foreignKey: "productID" });
db.products.hasMany(db.videos, { foreignKey: "productID" });

db.photos.belongsTo(db.products, { foreignKey: "productID" });
db.videos.belongsTo(db.products, { foreignKey: "productID" });

//relations defindes
// db.category.hasMany(db.subCategory,{foreignKey: "categorySlug"});
// db.subCategory.belongsTo(db.category,{foreignKey: "categorySlug"})

module.exports = db;
