const db = require("../models/init-models");
const { getAll } = require("./PrestataireControllers");

const EvenementController = {
    async create(req, res){
        try {
            const {nom, description, date, lieux, capaciteMax, prix, organisateurId} = req.body;
            const evenement = req.file ? req.file.path : null;
            
        } catch (error) {
            console.error("Erreur lors de la creation des evenements:", error);
            res.status(500).json({
                error: "Erreur lors de la creation des evenements"
            })
        }
    },

    async getAll(req, res){
        try {
            const response = await db.Evenement.findAll();
            res.json(response)
        } catch (error) {
            console.error("Erreur lors de la recuperation des evenements:", error);
            res.status(500).json({
                error: "Erreur lors de la recuperation des evenements"
            })
        }
    }
}

module.exports= EvenementController;