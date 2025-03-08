import { useEffect, useState } from "react";
import { Search, ListFilter, Star, MapPin, Phone, Mail, Briefcase, Tag } from "lucide-react";
import useAuthStore from "../../store";

const Prestataire = () => {
    const { prestataires, getPrestataire } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPrestataires, setFilteredPrestataires] = useState([]);

    useEffect(() => {
        getPrestataire();
    }, [getPrestataire]);

    useEffect(() => {
        if (prestataires) {
            setFilteredPrestataires(
                prestataires.filter(prestataire => 
                    prestataire.Utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    prestataire.specialite.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, prestataires]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="rounded-full mb-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow">
                            <input 
                                type="search" 
                                placeholder="Rechercher par nom ou spécialité ou localisation..." 
                                className="px-4 py-3 w-full border border-gray-200 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-3.5 text-gray-400 h-5 w-5"/>
                        </div>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors">
                            <ListFilter className="h-5 w-5" />
                            <span>Spécialité</span>
                        </button>
                    </div>
                </div>
                {filteredPrestataires.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPrestataires.map((prestataire) => (
                            <div key={prestataire.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative h-48 w-full">
                                    {prestataire.profil ? (
                                        <img 
                                            src={`http://localhost:3004/${prestataire.profil}`} 
                                            alt={`Photo de ${prestataire.Utilisateur.nom}`} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <span className="text-gray-400">Aucune image</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-yellow-400 text-white p-1 rounded-md flex items-center">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="ml-1 font-medium">4.8</span>
                                    </div>
                                </div>
                                
                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">{prestataire.Utilisateur.nom}</h2>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                                        <span className="font-medium">{prestataire.specialite}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                                        <span>{prestataire.localisation}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <Tag className="h-4 w-4 mr-2 text-green-500"/>
                                        <span className="font-medium">{prestataire.tarifhoraire} Ar</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-4 mt-2">
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                            <span>{prestataire.Utilisateur.telephone}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                            <span className="truncate">{prestataire.Utilisateur.email}</span>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                                            Contacter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">Aucun prestataire trouvé</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prestataire;