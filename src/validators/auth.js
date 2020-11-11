const { check } = require("express-validator");

exports.registerValidator = [
  check("firstName").not().isEmpty().withMessage("First name is required"),
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("First name is three characters minimum"),
  check("firstName")
    .isLength({ max: 15 })
    .withMessage("First name is 15 characters maximum"),

  check("lastName").not().isEmpty().withMessage("Last name is required"),
  check("lastName")
    .isLength({ min: 3 })
    .withMessage("Last name is three characters minimum"),
  check("lastName")
    .isLength({ max: 15 })
    .withMessage("Last name is 40 characters maximum"),

  check("email").not().isEmpty().withMessage("Email is required"),
  check("email").isEmail().withMessage("Invalid email format"),

  check("password").not().isEmpty().withMessage("Password is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password length must 8 characters minimum"),
  check("password")
    .isLength({ max: 30 })
    .withMessage("Password length must 20 characters maximum"),
];
