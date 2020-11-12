//import multer
const multer = require("multer");

// Destination di pakai untuk menginformasikan multer dimana file harus disimpan
// Filename di pakai untuk memanipulasi nama file yang di upload agar tidak bentrok karna ada nama yang sama
exports.upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "./uploads/images/categories");
    },
    filename(req, file, callback) {
      console.log("File mentah :", file);
      callback(null, `${Date.now()}_${file.originalname.split(" ").join("_")}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (
      // accept image files only
      !file.originalname.match(/\.(jpg|jpeg|png|PNG)$/i)
    ) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    callback(null, true);
  },
});
