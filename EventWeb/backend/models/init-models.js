const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const UtilisateurModel = require("./utilisateur");
const OrganisateurModel = require("./organisateur");
const PrestataireModel = require("./prestataire");
const ServiceModel = require("./service");
const EvenementModel = require("./evenement");

const Utilisateur = UtilisateurModel(sequelize, DataTypes);
const Organisateur = OrganisateurModel(sequelize, DataTypes);
const Prestataire = PrestataireModel(sequelize, DataTypes);
const Service = ServiceModel(sequelize, DataTypes);
const Evenement = EvenementModel(sequelize, DataTypes);

const db = {
  Utilisateur,   
  Organisateur, 
  Prestataire,  
  Service,
  Evenement,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;
