"use strict";

const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashPassword = bcrypt.hashSync(process.env.PASSWORD, 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Irwanto",
          lastName: "Wibowo",
          email: "irwantoadmin@yahoo.com",
          password: hashPassword,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
