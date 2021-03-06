const express = require("express");
const { User } = require("../../models");
require("dotenv").config();

//enkripsi menggunakan bcrypt
const bcrypt = require("bcrypt");

//generate token
const jwt = require("jsonwebtoken");

//key untuk dekripsi token
const jwtKey = process.env.JWT_KEY;

console.log(jwtKey);

//method register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //cek apakah email sudah terdaftar
    const checkEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    //jika email sudah ada, tampilkan error
    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email has been already exist",
        },
      });
    }

    const saltStrength = 10;
    const hashedPassword = await bcrypt.hashSync(password, saltStrength);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });

    //buat token setelah berhasil register
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //kirim response dan token
    res.send({
      message: "Register success",
      data: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: firstName + " " + lastName,
          email: user.email,
          password: user.password,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};

//method login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //cek email di database
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //jika tidak ada email di database
    if (!user) {
      return res.status(400).send({
        error: {
          message: "Internal server error",
        },
      });
    }

    //lolos validasi
    //compare password
    const validPassword = await bcrypt.compare(password, user.password);

    //jika tidak valid
    if (!validPassword) {
      res.status(400).send({
        error: {
          message: "Email or password is invalid",
        },
      });
    }

    //jika valid
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //kirim response
    res.send({
      message: "Login successfully",
      data: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.firstName + " " + user.lastName,
          email: user.email,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};

exports.cekAuth = async (req, res) => {
  try {
    const { id } = req.user.id;

    const user = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      data: user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};
