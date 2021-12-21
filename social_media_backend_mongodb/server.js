const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");

//MIDDILWARES
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// Passport Middleware
app.use(passport.initialize());

// Passport Config.
require("./config/passport")(passport);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Vichayan" });
});

//ROUTES
app.use("/dev/api/v1/user", require("./routes/user"));
app.use("/dev/api/v1/experience", require("./routes/experience"));
app.use("/dev/api/v1/education", require("./routes/education"));
app.use("/dev/api/v1/post", require("./routes/post"));
app.use("/dev/api/v1/article", require("./routes/article"));
app.use("/dev/api/v1/connection", require("./routes/connection"));

//Catching 404 Error
app.use((req, res, next) => {
  const error = new Error("INVALID ROUTE");
  error.status = 404;
  next(error);
});

//Error handler function
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect("mongodb://127.0.0.1:27017/vichayan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("server Started");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("Error in connecting to DataBase", err.message);
  });

//

// mongodb://127.0.0.1:27017/servimate

// "start": "pm2-runtime start ecosystem.config.js --env production"
