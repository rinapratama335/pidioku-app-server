const jwt = require("jsonwebtoken");
const { User } = require("../../models");

//key from decrypt
const jwtKey = process.env.JWT_KEY;

exports.auth = async (req, res, next) => {
  let header, token;

  //perikasa apakah ada header atau token
  //jika tidak ada tampilkan error
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(400).send({
      error: {
        message: "Access denied",
      },
    });
  }

  //jika ada token
  try {
    const verified = jwt.verify(token, jwtKey);

    req.user = verified;
    console.log("Data user :", req.user);
    next();
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Invalid token",
      },
    });
  }
};

exports.adminAuth = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (user.dataValues.role !== "admin")
      return res.status(400).send({
        message: "Invalid operation, you login as a user",
      });

    next();
  } catch (err) {
    console.log(err);

    res.status(400).send({
      error: {
        message: "Invalid token",
      },
    });
  }
};
