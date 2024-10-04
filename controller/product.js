const productModel = require("../model/product");
const mongoose = require("mongoose");

const create = async (req, res) => {
  try {
    const { name, subcategory, price, description } = req.body;
    const product = new productModel({
      name,
      subcategory,
      price,
      description,
    });
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created",
      result: product,
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
    const productId = req.params.id;
    const product = await productModel.findOneAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }
    res.status(200).send({
      success: true,
      message: "Product Updated",
      result: product,
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
    const productId = req.params.id;
    const product = await productModel.findOneAndDelete(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }
    res.status(200).send({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }
    res.status(200).send({
      success: true,
      message: "",
      result: product,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.query;

    let pipeline = [];

    if (categoryId) {
      pipeline.push(
        {
          $lookup: {
            from: "subcategories",
            localField: "subcategory",
            foreignField: "_id",
            as: "subcategory",
          },
        },
        {
          $unwind: "$subcategory",
        },
        {
          $lookup: {
            from: "categories",
            localField: "subcategory.category",
            foreignField: "_id",
            as: "subcategory.category",
          },
        },
        {
          $unwind: "$subcategory.category",
        },
        {
          $match: {
            "subcategory.category._id": new mongoose.Types.ObjectId(categoryId),
          },
        },
        {
          $group: {
            _id: "$subcategory._id",
            subcategoryName: { $first: "$subcategory.name" },
            categoryName: { $first: "$subcategory.category.name" },
            products: {
              $push: {
                _id: "$_id",
                name: "$name",
                price: "$price",
              },
            },
          },
        }
      );
    } else if (subcategoryId) {
      pipeline.push(
        {
          $match: {
            subcategory: new mongoose.Types.ObjectId(subcategoryId),
          },
        },
        {
          $lookup: {
            from: "subcategories",
            localField: "subcategory",
            foreignField: "_id",
            as: "subcategory",
          },
        },
        {
          $unwind: "$subcategory",
        },
        {
          $group: {
            _id: "$subcategory._id",
            subcategoryName: { $first: "$subcategory.name" },
            products: {
              $push: {
                _id: "$_id",
                name: "$name",
                price: "$price",
              },
            },
          },
        }
      );
    }

    const results = await productModel.aggregate(pipeline);

    res.status(200).send({
      success: true,
      message: "",
      result: results,
    });
  } catch (error) {
    console.log(error);
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
  getById,
  get,
};
