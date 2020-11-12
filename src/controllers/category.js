const { Category } = require("../../models");
const fs = require("fs");

const path = "./uploads/images/categories/";

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Categories successfully loaded",
      data: {
        categories: categories,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};

exports.getDetailCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!category) {
      res.status(404).send({
        error: {
          message: "Category not found",
        },
      });
    }

    res.send({
      message: "Category successfully loaded",
      data: {
        category: category,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};

exports.addCategory = async (req, res) => {
  console.log("Mantabb file :", req.file);
  try {
    const image = req.file;
    console.log(image);
    const { category } = req.body;
    console.log("File request :", req.file);

    const saveCategory = await Category.create({
      category,
      image: req.file.filename,
    });

    res.send({
      message: "Data has been success saved into database",
      data: {
        category: saveCategory,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const dataToUpdate = await Category.findOne({
      where: {
        id,
      },
    });

    console.log("File data to update :", dataToUpdate.image);

    fs.unlink(`${path}/${dataToUpdate.image}`, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });

    const updatedData = await Category.update(
      {
        category: req.body.category,
        image: req.file.filename,
      },
      {
        where: {
          id,
        },
      }
    );

    if (updatedData) {
      const returnData = await Category.findOne({
        where: {
          id,
        },
      });

      res.send({
        message: "Data has been successfully updated",
        data: {
          category: returnData,
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const dataToDelete = await Category.findOne({
      where: {
        id,
      },
    });

    if (dataToDelete) {
      await fs.unlink(`${path}/${dataToDelete.image}`, (err) =>
        console.log(err)
      );

      await Category.destroy({
        where: {
          id,
        },
      });

      res.send({
        message: `Data with ID ${id} has been successfully delete`,
        data: {
          deletedData: dataToDelete,
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};
