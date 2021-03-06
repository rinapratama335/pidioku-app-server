"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });

      Course.belongsTo(models.Category, {
        as: "category",
        foreignKey: {
          name: "categoryId",
        },
      });

      Course.hasMany(models.ListCourse);
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.ENUM("free", "premium"),
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
