const { Course, ListCourse } = require("../../models");
const fs = require("fs");
const pathListCourse = "./uploads/course";

exports.getAllListCourses = async (req, res) => {
  try {
    const listCourses = await ListCourse.findAll({
      include: [
        {
          model: Course,
          as: "course",
          attributes: {
            exclude: [
              "description",
              "status",
              "userId",
              "categoryId",
              "createdAt",
              "updatedAt",
              "CategoryId",
              "UserId",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "courseId", "CourseId"],
      },
    });

    res.send({
      message: "Data successfully loaded",
      data: {
        listCourses: listCourses,
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

exports.getDetailListCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const detailList = await ListCourse.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Course,
          as: "course",
          attributes: {
            exclude: [
              "description",
              "status",
              "userId",
              "categoryId",
              "createdAt",
              "updatedAt",
              "CategoryId",
              "UserId",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "courseId", "CourseId"],
      },
    });

    res.send({
      message: "Data has been successfully loaded",
      data: {
        listCourse: detailList,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      err: {
        message: "Internal server error",
      },
    });
  }
};

exports.addListCourse = async (req, res) => {
  try {
    const { title, courseId } = req.body;

    const dataList = await ListCourse.create({
      title,
      courseId,
      video: req.file.filename,
    });

    if (dataList) {
      const returnedData = await ListCourse.findOne({
        where: {
          id: dataList.id,
        },
        include: [
          {
            model: Course,
            as: "course",
            attributes: {
              exclude: [
                "description",
                "status",
                "userId",
                "categoryId",
                "createdAt",
                "updatedAt",
                "CategoryId",
                "UserId",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["courseId", "createdAt", "updatedAt", "CourseId"],
        },
      });

      res.send({
        message: "Data has been added",
        data: {
          listCourse: returnedData,
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

exports.updateListCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const dataToUpdate = await ListCourse.findOne({
      where: {
        id,
      },
    });

    console.log(dataToUpdate);

    if (dataToUpdate) {
      fs.unlink(`${pathListCourse}/${dataToUpdate.dataValues.video}`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });

      const updatedData = await ListCourse.update(
        {
          title: req.body.title,
          courseId: req.body.courseId,
          video: req.file.filename,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updatedData) {
        const returnedData = await ListCourse.findOne({
          where: {
            id,
          },
          include: [
            {
              model: Course,
              as: "course",
              attributes: {
                exclude: [
                  "description",
                  "status",
                  "userId",
                  "categoryId",
                  "createdAt",
                  "updatedAt",
                  "CategoryId",
                  "UserId",
                ],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "courseId", "CourseId"],
          },
        });
        res.send({
          message: `Data with ID ${id} successfully updated`,
          data: { listCourse: returnedData },
        });
      }
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

exports.deleteListCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const dataToDelete = await ListCourse.findOne({
      where: {
        id,
      },
    });

    if (dataToDelete) {
      await fs.unlink(`${pathListCourse}/${dataToDelete.video}`, (err) =>
        console.log(err)
      );

      await ListCourse.destroy({
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
        message: "Internal sever error",
      },
    });
  }
};
