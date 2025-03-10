const db = require("../models/init-models");

const EvenementController = {
    async create(req, res) {
        try {
            const { nom, description, date, lieu, capaciteMax, prix, organisateurId, serviceId, prestataireId } = req.body;
            const evenementImage = req.file ? req.file.path : null;

            const newEvenement = await db.Evenement.create({
                nom,
                evenement: evenementImage,
                description,
                date,
                lieu,
                capaciteMax,
                prix,
                organisateurId,
                serviceId: Array.isArray(serviceId) ? serviceId : [],
                prestataireId: Array.isArray(prestataireId) ? prestataireId : [] 
            });

            res.status(201).json(newEvenement);
        } catch (error) {
            console.error("Erreur lors de la création des événements:", error);
            res.status(500).json({
                error: "Erreur lors de la création des événements"
            });
        }
    },

    async getAll(req, res) {
        try {
            const response = await db.Evenement.findAll({
                include: [
                    { model: db.Service, as: 'services' },
                    { model: db.Prestataire, as: 'prestataires' }
                ]
            });
            res.json(response);
        } catch (error) {
            console.error("Erreur lors de la récupération des événements:", error);
            res.status(500).json({
                error: "Erreur lors de la récupération des événements"
            });
        }
    },
};

module.exports = EvenementController;
