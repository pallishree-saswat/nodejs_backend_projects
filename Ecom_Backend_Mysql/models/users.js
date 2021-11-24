module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a name" },
        notEmpty: { msg: "Name must not be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a email" },
        notEmpty: { msg: "email must not be empty" },
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isEmailVerified: {
      type: DataTypes.ENUM({
        values: ['Yes','No'],
      }),
      defaultValue: "No", //No
    },
    cart: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
    wishlist: {
      type: DataTypes.INTEGER,
    },
  });

  return Users;
};
