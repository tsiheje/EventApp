'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Evenements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      evenement: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      lieu: {
        type: Sequelize.STRING
      },
      capaciteMax: {
        type: Sequelize.INTEGER
      },
      prix: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      organisateurId: {
        type: Sequelize.INTEGER
      },
      serviceId: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
      },
      prestataireId: {
        type: DataTypes.JSON, 
        allowNull: true,
        defaultValue: []
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
    await queryInterface.dropTable('Evenements');
  }
};