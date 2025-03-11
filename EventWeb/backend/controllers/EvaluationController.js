const db = require("../models/init-models");

const EvaluationController = {
    async create(req, res){
        try {
            const {note, commentaire, dateEvaluation, prestataireId, organisateurId} = req.body;

            const response = await db.Evaluation.create({
                note,
                commentaire,
                dateEvaluation,
                prestataireId,
                organisateurId
            });

            res.status(201).json(response);
        } catch (error) {
            console.error("Erreur lors de l'evaluation du prestataire",error)
            res.status(500).json({
                error: "Erreur lors de l'evaluation du prestataire"
            })
        }
    }
}

module.exports = EvaluationController;