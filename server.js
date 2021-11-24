const express = require("express");
const app = express();

const env = require("dotenv");
env.config();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const db = require('./models/index')

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


app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
