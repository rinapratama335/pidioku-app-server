const { Course, User, Category } = require("../../models");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "password"],
          },
        },
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "image"],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
    });

    res.send({
      message: "Categories has been successfully loaded",
      data: {
        courses: courses,
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

exports.getDetailCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "password"],
          },
        },
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "image"],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
    });

    res.send({
      message: "Category has been successfully loaded",
      data: {
        category: course,
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

exports.addCourse = async (req, res) => {
  try {
    const { title, description, status, categoryId } = req.body;

    const dataCourse = await Course.create({
      title,
      description,
      status,
      userId: req.user.id,
      categoryId,
    });

    if (dataCourse) {
      const returnDataCourse = await Course.findOne({
        where: {
          id: dataCourse.id,
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "role", "password"],
            },
          },
          {
            model: Category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "image"],
            },
          },
        ],
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "userId",
            "categoryId",
            "UserId",
            "CategoryId",
          ],
        },
      });

      res.send({
        message: "Data has been added",
        data: {
          course: returnDataCourse,
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

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, categoryId } = req.body;

    const updatedCourse = await Course.update(
      {
        title,
        description,
        status,
        categoryId,
      },
      {
        where: {
          id,
        },
      }
    );

    if (updatedCourse) {
      const returnedData = await Course.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "role", "password"],
            },
          },
          {
            model: Category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "image"],
            },
          },
        ],
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "userId",
            "categoryId",
            "UserId",
            "CategoryId",
          ],
        },
      });

      res.send({
        message: `Data with id ${id} has been successfully updated`,
        data: returnedData,
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

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  const dataToDelete = await Course.findOne({
    where: {
      id,
    },
  });

  if (dataToDelete) {
    await Course.destroy({
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
};
