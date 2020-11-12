const express = require("express");
const { register, login } = require("../controllers/auth");
const {
  getAllCategories,
  getDetailCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { upload } = require("../middlewares/uploadImgCategory");
const { runValidation } = require("../validators");
const { registerValidator, loginValidator } = require("../validators/auth");
const router = express.Router();

router.get("/", () => console.log("Welcome to Pidioku App"));

// Auth
router.post("/register", registerValidator, runValidation, register);
router.post("/login", loginValidator, runValidation, login);

// Categories
router.get("/categories", getAllCategories);
router.get("/category/:id", getDetailCategory);
router.post("/category", upload.single("image"), addCategory);
router.patch("/category/:id", upload.single("image"), updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
