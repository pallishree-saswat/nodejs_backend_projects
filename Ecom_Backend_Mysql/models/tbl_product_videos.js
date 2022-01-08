module.exports = (sequelize, DataTypes) => {
  const tbl_product_videos = sequelize.define(
    "tbl_product_videos",
    {
      productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      videoName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      videoDescription: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "tbl_product_videos" }
  );

  return tbl_product_videos;
};
