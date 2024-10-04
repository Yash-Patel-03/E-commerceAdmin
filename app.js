const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const auth = require("./middleware/auth");

const user = require("./route/user");
const product = require("./route/product");
const subcategory = require("./route/subcategory");
const category = require("./route/category");

const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use("", user);
app.use("/product", auth, product);
app.use("/subcategory", auth, subcategory);
app.use("/category", auth, category);

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
