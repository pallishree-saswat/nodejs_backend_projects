module.exports = (sequelize, DataTypes) => {
  const tbl_product = sequelize.define(
    "tbl_product",
    {
      productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      prodID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      catID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subcatID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brandID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productHeadings: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mrpPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      sellingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      packSize: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      productDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      units: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      variants: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveryTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM({
          values: ["Active", "Inactive"],
        }),
        defaultValue: "Inactive",
        allowNull: false,
      },
      ratings: {
        type: DataTypes.STRING,
      },
      reviews: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },

      updatedBy: {
        type: DataTypes.INTEGER,
      },

      isDeleted: {
        type: DataTypes.ENUM({
          values: ["0", "1"],
        }),
        defaultValue: "0",
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "tbl_product" }
  );

  return tbl_product;
};
