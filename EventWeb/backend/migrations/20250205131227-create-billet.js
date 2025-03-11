'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Billets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroBillet: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      dateAchat: {
        type: Sequelize.DATE
      },
      NbBillets: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      totalprix: {
        type: Sequelize.FLOAT
      },
      participantId: {
        type: Sequelize.INTEGER
      },
      organisateurId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Billets');
  }
};