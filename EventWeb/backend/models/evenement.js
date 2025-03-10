'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evenement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Evenement.belongsTo(models.Organisateur, {
        foreignKey: 'organisateurId',
        as: 'organisateur'
      });
    }
  }
  Evenement.init({
    nom: DataTypes.STRING,
    evenement: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    lieu: DataTypes.STRING,
    capaciteMax: DataTypes.INTEGER,
    prix: DataTypes.FLOAT,
    status: DataTypes.STRING,
    organisateurId: DataTypes.INTEGER,
    serviceId: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    prestataireId: {
      type: DataTypes.JSON, 
      allowNull: true,
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'Evenement',
  });
  return Evenement;
};