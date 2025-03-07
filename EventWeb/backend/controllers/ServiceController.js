const db = require("../models/init-models");
const configureMulter = require("../middlewares/multerconfig");

const serviceUpload = configureMulter('uploads/service', {
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxSize: 5 * 1024 * 1024
  });
const ServiceController = {
    async create(req, res){
        try {
            const {nom, description, tarif, prestataireId} = req.body;
            const service = req.file ? req.file.path : null;

            if(!nom || !description || !tarif || !prestataireId){
                return res.status(400).json({
                    error: "Tous les champs sont obligatoires"
                });
            }

            const response = await db.Service.create({
                nom,
                description,
                service: service,
                tarif,
                prestataireId
            });

            res.status(201).json(response)
        } catch (error) {
            console.error("Erreur lors de la creation des services:", error);
            res.status(500).json({
                error: "Erreur lors de la creation des services"
            });
        }
    },

    async getAll(req, res) {
        try {
            const service = await db.Service.findAll();
            res.json(service)
        } catch (error) {
            console.error("Erreur lors de la recuperation des services:", error);
            res.status(500).json({
                error: "Erreur lors de la recuperation des services"
            })
        }
    }
}

module.exports = ServiceController;