const express = require("express");
const { register, login } = require("../controllers/auth");
const { runValidation } = require("../validators");
const { registerValidator, loginValidator } = require("../validators/auth");
const router = express.Router();

router.get("/", () => console.log("Welcome to Pidioku App"));

// Auth
router.post("/register", registerValidator, runValidation, register);
router.post("/login", loginValidator, runValidation, login);

module.exports = router;
