module.exports = (sequelize, DataTypes) => {
  const tbl_product_photos = sequelize.define(
    "tbl_product_photos",
    {
      productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageDescription: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "tbl_product_photos" }
  );

  return tbl_product_photos;
};
