const db = require("../models/init-models");

const ServiceController = {
    async create(req, res){
        try {
            
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