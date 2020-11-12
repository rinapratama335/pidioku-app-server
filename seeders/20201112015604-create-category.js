"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          category: "Python Dev",
          image: "python.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Ruby Dev",
          image: "ruby.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Java Dev",
          image: "java.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Frontend Dev",
          image: "frontend.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
