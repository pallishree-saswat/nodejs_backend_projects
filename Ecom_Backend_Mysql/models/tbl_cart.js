module.exports = (sequelize, DataTypes) => {
  const tbl_cart = sequelize.define(
    "tbl_cart",
    {
      cartID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cartTotal: {
        type: DataTypes.INTEGER,
      },
      totalAfterDiscount: {
        type: DataTypes.INTEGER,
      },
      //array of products ids ///products inside cart
      cartItems: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue(" cartItems"));
        },
        set: function (value) {
          return this.setDataValue("cartItems", JSON.stringify(value));
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
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
    { timestamps: false, tableName: "tbl_cart" }
  );

  return tbl_cart;
};
