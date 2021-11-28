module.exports = (sequelize, DataTypes) => {
  const tbl_order = sequelize.define(
    "tbl_order",
    {
      orderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      //array of product id
      orderItems: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("orderItems"));
        },
        set: function (value) {
          return this.setDataValue("orderItems", JSON.stringify(value));
        },
      },
      shippingAddress: {
        type: DataTypes.STRING,
      },
      //payment result details
      paymentIntent: {
        type: DataTypes.INTEGER,
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

      taxPrice: {
        type: DataTypes.INTEGER,
      },
      paymentMethod: {
        type: DataTypes.STRING,
      },
      shippingPrice: {
        type: DataTypes.INTEGER,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
      },
      isPaid: {
        type: DataTypes.ENUM({
          values: ["0", "1"],
        }),
        defaultValue: "0",
        allowNull: false,
      },
      paidAt: {
        type: DataTypes.DATE,
      },
      isDelivered: {
        type: DataTypes.ENUM({
          values: ["0", "1"],
        }),
        defaultValue: "0",
        allowNull: false,
      },
      deliveredAt: {
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
    { timestamps: false, tableName: "tbl_order" }
  );

  return tbl_order;
};
