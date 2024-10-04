const subcategoryModel = require("../model/subcategory");

const create = async (req, res) => {
  try {
    const { name, category, description } = req.body;
    const subcategory = new subcategoryModel({
      name,
      category,
      description,
    });
    await subcategory.save();
    res.status(201).send({
      success: true,
      message: "SubCategory Created",
      result: subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const subcategory = await subcategoryModel.findOneAndUpdate(
      { _id: subcategoryId },
      req.body,
      {
        new: true,
      }
    );
    if (!subcategory) {
      return res.status(404).send({ message: "subcategory not found." });
    }
    res.status(200).send({
      success: true,
      message: "subcategory Updated",
      result: subcategory,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const del = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const subcategory = await subcategoryModel.findOneAndDelete(subcategoryId);
    if (!subcategory) {
      return res.status(404).send({ message: "subcategory not found." });
    }
    res.status(200).send({
      success: true,
      message: "subcategory deleted",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  update,
  del,
};
