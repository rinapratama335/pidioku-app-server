const { check } = require("express-validator");

exports.addCourseValidator = [
  check("title").not().isEmpty().withMessage("Title is required"),
  check("description").not().isEmpty().withMessage("Description is required"),
  check("status").not().isEmpty().withMessage("Status is required"),
  check("categoryId").not().isEmpty().withMessage("Category is required"),
];
