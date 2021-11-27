module.exports = (sequelize, DataTypes) => {
  const tbl_subcategory = sequelize.define(
    "tbl_subcategory",
    {
      subcategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      subcategoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subcategorySlug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categorySlug: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,
        type: DataTypes.DATE,
      },

      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      isDeleted: {
        type: DataTypes.ENUM({
          values: ["0", "1"],
        }),
        defaultValue: "0",
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "tbl_subcategory" }
  );

  return tbl_subcategory;
};
