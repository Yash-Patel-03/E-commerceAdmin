const express = require("express");
const router = express.Router();
const { create, update, del } = require("../controller/category");

router.post("/create", create);
router.post("/update/:id", update);
router.delete("/delete/:id", del);

module.exports = router;
