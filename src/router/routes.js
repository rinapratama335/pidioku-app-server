const express = require("express");
const { register } = require("../controllers/auth");
const { runValidation } = require("../validators");
const { registerValidator } = require("../validators/auth");
const router = express.Router();

router.get("/", () => console.log("Welcome to Pidioku App"));

// Auth
router.post("/register", registerValidator, runValidation, register);

module.exports = router;
