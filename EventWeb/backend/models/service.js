'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Association many-to-many avec Evenement
      Service.belongsToMany(models.Evenement, {
        through: 'EvenementService',
        foreignKey: 'serviceId',
        otherKey: 'evenementId',
        as: 'evenements'
      });
      
      // Association avec Prestataire
      Service.belongsTo(models.Prestataire, {
        foreignKey: 'prestataireId',
        as: 'prestataire'
      });
    }
  }
  Service.init({
    nom: DataTypes.STRING,
    service: DataTypes.STRING,
    description: DataTypes.STRING,
    tarif: DataTypes.INTEGER,
    prestataireId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};