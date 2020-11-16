//import multer
const multer = require("multer");

// Destination di pakai untuk menginformasikan multer dimana file harus disimpan
// Filename di pakai untuk memanipulasi nama file yang di upload agar tidak bentrok karna ada nama yang sama
exports.uploadList = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "./uploads/course");
    },
    filename(req, file, callback) {
      console.log("File Course Mentah :", file);
      callback(null, `${Date.now()}_${file.originalname.split(" ").join("_")}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (
      // accept image files only
      !file.originalname.match(/\.(mp4)$/i)
    ) {
      return cb(new Error("Only mp4 files are allowed!"), false);
    }
    callback(null, true);
  },
});
