const express = require("express");
const router = express.Router();
const { create, update, del, getById, get } = require("../controller/product");

router.post("/create", create);
router.post("/update/:id", update);
router.delete("/delete/:id", del);
router.get("/getById/:id", getById);
router.get("/get", get);

module.exports = router;
