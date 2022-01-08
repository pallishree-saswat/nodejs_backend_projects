const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const app = express();

const env = require("dotenv");
env.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs/access.log"),
  { flags: "a" }
);

// setup the logger
app.use(morgan("dev", { stream: accessLogStream }));

//set static folder
// app.use(express.static(path.join(__dirname, "public")));

//body parser
app.use(express.json());

//enable CORS
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

//routes
app.use("/api/user", require("./routes/auth"));
app.use("/api/product", require("./routes/product"));
app.use("/api/category", require("./routes/category"));

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

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
