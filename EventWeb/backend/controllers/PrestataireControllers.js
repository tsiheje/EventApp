const db = require("../models/init-models");

const PrestataireController = {
    async getAll(req, res) {
        try{
            const prestataire = await db.Prestataire.findAll({
                include: [
                    {
                        model: db.Utilisateur,
                        as: "Utilisateur",
                        attributes:["nom","email","telephone"]
                    }
                ]
            })
            res.json(prestataire)
        }catch(error){
            console.error("Erreur lors de la recuperation des prestataires:", error);
            res.status(500).json({
                error: "Erreur lors de la recuperation des prestataires"
            });
        }
    }
}

module.exports = PrestataireController;