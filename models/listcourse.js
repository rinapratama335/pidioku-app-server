"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ListCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListCourse.belongsTo(models.Course, {
        as: "course",
        foreignKey: {
          name: "courseId",
        },
      });
    }
  }
  ListCourse.init(
    {
      title: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
      video: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ListCourse",
    }
  );
  return ListCourse;
};
