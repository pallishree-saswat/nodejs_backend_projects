const jwt = require("jsonwebtoken");
require("dotenv").config();
const  db = require("../models")
const Users = db.users;
//this middleware will on continue on if the token is inside the local storage

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const decoded = jwt.verify(token, process.env.jwt_secret);
    //console.log(decoded)
    req.user = await Users.findOne({
      where : { id : decoded._id}
    })
    //console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};