'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Doctors', [
      {
        name: "Wiyono",
        email: "wiyono.vet@test.com",
        password: "123456789",
        phoneNumber: "08999999912",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Budi",
        email: "budi.vet@test.com",
        password: "123123123",
        phoneNumber: "08999999919",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cantika",
        email: "cantika.vet@test.com",
        password: "987654321",
        phoneNumber: "08888888881",
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Doctors', null, {})
  }
};
