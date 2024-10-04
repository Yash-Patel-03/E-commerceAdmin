const categoryModel = require("../model/category");

const create = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new categoryModel({
      name,
      description,
    });
    await category.save();
    res.status(201).send({
      success: true,
      message: "Category Created",
      result: category,
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
    const categoryId = req.params.id;
    const category = await categoryModel.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      {
        new: true,
      }
    );
    if (!category) {
      return res.status(404).send({ message: "category not found." });
    }
    res.status(200).send({
      success: true,
      message: "category Updated",
      result: category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const del = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryModel.findOneAndDelete(categoryId);
    if (!category) {
      return res.status(404).send({ message: "category not found." });
    }
    res.status(200).send({
      success: true,
      message: "category deleted",
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
