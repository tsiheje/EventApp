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
      // dreefine association he
      Prestataire.belongsTo(models.Utilisateur, {
        foreignKey: 'userId',
        targetKey:'id',
        as: 'Utilisateur',
        onDelete: 'CASCADE',
      });
    }
  }
  Prestataire.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Utilisateurs', key: 'id' },
    },
    specialite: DataTypes.STRING,
    tarifhoraire: DataTypes.FLOAT,
    localisation: DataTypes.STRING,
    disponibilite: DataTypes.STRING,
    profil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Prestataire',
  });
  return Prestataire;
};