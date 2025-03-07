const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/init-models");
const configureMulter = require("../middlewares/multerconfig");

const profileUpload = configureMulter('uploads/profiles', {
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxSize: 5 * 1024 * 1024
});

const UserController = {
    uploadProfileImage: profileUpload.single('profil'),
    
    register: async function (req, res) {
        try {
            const {nom, email, telephone, motDePasse, type, specialite, localisation, tarifhoraire, disponipibilite} = req.body;
            const profil = req.file ? req.file.path : null;
            console.log(profil)
            if (!nom || !email || !telephone || !motDePasse || !type) {
                return res.status(400).json({
                    error: "Tous les champs sont obligatoires"
                });
            }

            if (!['Prestataire', 'Organisateur'].includes(type)) {
                return res.status(400).json({
                    error: "Type d'utilisateur invalide"
                });
            }

            const existingUser = await db.Utilisateur.findOne({
                where: { email }
            });

            if (existingUser) {
                return res.status(400).json({
                    error: "Cet email est déjà utilisé"
                });
            }

            const hashedPassword = await bcrypt.hash(motDePasse, 10);

            const user = await db.Utilisateur.create({
                nom,
                email,
                telephone,
                motDePasse: hashedPassword,
                type
            });

            
            switch (type) {
                case 'Prestataire':
                    if (!specialite || !tarifhoraire || !localisation) {
                        await user.destroy();
                        return res.status(400).json({
                            error: "Les informations du prestataire sont incomplètes"
                        });
                    }

                    await db.Prestataire.create({
                        userId: user.id,
                        specialite,
                        tarifhoraire,
                        localisation,
                        disponipibilite,
                        profil: profil 
                    });
                    break;

                case 'Organisateur':
                    await db.Organisateur.create({
                        userId: user.id,
                    });
                    break;
            }

            const token = jwt.sign(
                { 
                    userId: user.id, 
                    type: user.type 
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const userResponse = {
                id: user.id,
                nom: user.nom,
                email: user.email,
                telephone: user.telephone,
                type: user.type,
                token
            };

            if (type === 'Prestataire') {
                const prestataire = await db.Prestataire.findOne({
                    where: { userId: user.id }
                });
                userResponse.prestataire = prestataire;
            } else if (type === 'Organisateur') {
                const organisateur = await db.Organisateur.findOne({
                    where: { userId: user.id }
                });
                userResponse.organisateur = organisateur;
            }

            res.status(201).json(userResponse);

        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            res.status(500).json({
                error: "Une erreur est survenue lors de l'inscription"
            });
        }
    },

    login: async function (req, res) {
        try {
            const { email, motDePasse } = req.body;
            console.log(email);
            if (!email || !motDePasse) {
                return res.status(400).json({
                    error: "Tous les champs sont obligatoires"
                });
            }

            const user = await db.Utilisateur.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(400).json({
                    error: "Email ou mot de passe incorrect"
                });
            }

            const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);

            if (!isPasswordValid) {
                return res.status(400).json({
                    error: "Email ou mot de passe incorrect"
                });
            }

            const token = jwt.sign(
                { 
                    userId: user.id, 
                    type: user.type 
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const userResponse = {
                id: user.id,
                nom: user.nom,
                email: user.email,
                telephone: user.telephone,
                type: user.type,
                token
            };

            if (user.type === 'Prestataire') {
                const prestataire = await db.Prestataire.findOne({
                    where: { userId: user.id }
                });
                userResponse.prestataire = prestataire;
            } else if (user.type === 'Organisateur') {
                const organisateur = await db.Organisateur.findOne({
                    where: { userId: user.id }
                });
                userResponse.organisateur = organisateur;
            }

            res.json(userResponse);

        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            res.status(500).json({
                error: "Une erreur est survenue lors de la connexion"
            });
        }
    },
    
    updateProfileImage: async function (req, res) {
        try {
            const userId = req.params.userId;
            
            if (!req.file) {
                return res.status(400).json({
                    error: "Aucune image de profil fournie"
                });
            }

            const user = await db.Utilisateur.findByPk(userId);
            
            if (!user) {
                return res.status(404).json({
                    error: "Utilisateur non trouvé"
                });
            }

            const profilePath = req.file.path;
            
            if (user.type === 'Prestataire') {
                const prestataire = await db.Prestataire.findOne({
                    where: { userId }
                });
                
                if (prestataire) {
                    await prestataire.update({ profil: profilePath });
                }
            } else if (user.type === 'Organisateur') {
                const organisateur = await db.Organisateur.findOne({
                    where: { userId }
                });
                
                if (organisateur) {
                    await organisateur.update({ profil: profilePath });
                }
            }

            res.json({
                success: true,
                message: "Image de profil mise à jour avec succès",
                profilePath
            });
            
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'image de profil:", error);
            res.status(500).json({
                error: "Une erreur est survenue lors de la mise à jour de l'image de profil"
            });
        }
    }
};

module.exports = UserController;