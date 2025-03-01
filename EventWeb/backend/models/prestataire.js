'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestataire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prestataire.init({
    userId: DataTypes.INTEGER,
    specialite: DataTypes.STRING,
    tarifhoraire: DataTypes.FLOAT,
    localisation: DataTypes.STRING,
    disponipibilite: DataTypes.STRING,
    profil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Prestataire',
  });
  return Prestataire;
};