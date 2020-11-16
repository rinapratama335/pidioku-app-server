const express = require("express");
const { register, login, cekAuth } = require("../controllers/auth");
const {
  getAllCategories,
  getDetailCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const {
  getAllCourses,
  getDetailCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");
const {
  getAllListCourses,
  getDetailListCourse,
  addListCourse,
  updateListCourse,
  deleteListCourse,
} = require("../controllers/list-course");
const { auth, adminAuth } = require("../middlewares/authentication");
const { upload } = require("../middlewares/uploadImgCategory");
const { uploadList } = require("../middlewares/uploadListCourse");
const { runValidation } = require("../validators");
const { registerValidator, loginValidator } = require("../validators/auth");
const { addCourseValidator } = require("../validators/course");
const router = express.Router();

router.get("/", () => console.log("Welcome to Pidioku App"));

// Auth
router.post("/register", registerValidator, runValidation, register);
router.post("/login", loginValidator, runValidation, login);
router.get("/auth", cekAuth);

// Categories
router.get("/categories", getAllCategories);
router.get("/category/:id", getDetailCategory);
router.post("/category", auth, adminAuth, upload.single("image"), addCategory);
router.patch("/category/:id", upload.single("image"), updateCategory);
router.delete("/category/:id", deleteCategory);

//Courses
router.get("/courses", getAllCourses);
router.get("/course/:id", getDetailCourse);
router.post("/course", auth, addCourseValidator, runValidation, addCourse);
router.patch("/course/:id", auth, updateCourse);
router.delete("/course/:id", auth, deleteCourse);

//List Courses
router.get("/list-courses", auth, getAllListCourses);
router.get("/list-course/:id", auth, getDetailListCourse);
router.post("/list-course", auth, uploadList.single("video"), addListCourse);
router.patch(
  "/list-course/:id",
  auth,
  uploadList.single("video"),
  updateListCourse
);
router.delete("/list-course/:id", auth, deleteListCourse);

module.exports = router;
