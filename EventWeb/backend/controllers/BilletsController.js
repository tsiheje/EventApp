const db = require("../models/init-models");

const BilletController = {
    async create(req, res){
        try {
            const {type, NbBillets, totalprix, evenementId, participantNom, participantEmail, participantNumero} = req.body;
            
            if (!type || !totalprix || !evenementId || !participantNom || !participantEmail || !NbBillets) {
                return res.status(400).json({
                    error: "Données manquantes pour la création du billet"
                });
            }
            
            const evenement = await db.Evenement.findByPk(evenementId);
            if (!evenement) {
                return res.status(404).json({
                    error: "Événement non trouvé"
                });
            }
            
            const billetsVendus = await db.Billet.sum('NbBillets', {
                where: { evenementId: evenementId }
            }) || 0;
            
            const nbBilletsInt = parseInt(NbBillets);
            const capaciteRestante = evenement.capaciteMax - billetsVendus;
            
            if (billetsVendus + nbBilletsInt > evenement.capaciteMax) {
                return res.status(400).json({
                    error: "Capacité maximale de l'événement dépassée",
                    capaciteRestante: capaciteRestante
                });
            }
            
            const numeroBillet = generateBilletNumber(evenement.nom);
            
            const nouveauBillet = await db.Billet.create({
                type,
                NbBillets: nbBilletsInt,
                numeroBillet, 
                dateAchat: new Date(), 
                totalprix,
                evenementId,
                participantNom,
                participantEmail,
                participantNumero: participantNumero || null
            });
            
            await evenement.update({
                capaciteMax: capaciteRestante - nbBilletsInt
            });
            
            res.status(201).json({
                message: "Billet créé avec succès",
                billet: nouveauBillet,
                capaciteRestante: capaciteRestante - nbBilletsInt
            });
            
        } catch (error) {
            console.error("Erreur lors de l'achat du billet:", error);
            res.status(500).json({
                error: "Erreur lors de l'achat du billet"
            });
        }
    }
};

function generateBilletNumber(nomEvenement) {
    const eventPrefix = nomEvenement
        .replace(/[^\w]/g, '')  
        .substring(0, 15)      
        .toUpperCase();      
    
    return `${eventPrefix}-${Math.floor(Math.random() * 1000)}`;
}

module.exports = BilletController;