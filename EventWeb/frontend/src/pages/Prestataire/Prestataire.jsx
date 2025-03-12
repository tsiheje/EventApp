import { useEffect, useState } from "react";
import { Search, ListFilter, Star, MapPin, Phone, Mail, Tag, ChevronRight } from "lucide-react";
import useAuthStore from "../../store";

const Prestataire = () => {
    const { prestataires, getPrestataire } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPrestataires, setFilteredPrestataires] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        getPrestataire();
    }, [getPrestataire]);

    useEffect(() => {
        if (prestataires) {
            let filtered = prestataires.filter(prestataire => 
                prestataire.Utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prestataire.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prestataire.localisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prestataire.tarifhoraire.toLocaleString().includes(searchTerm.toLocaleString())
            );
            
            if (selectedSpeciality) {
                filtered = filtered.filter(p => p.specialite === selectedSpeciality);
            }
            
            setFilteredPrestataires(filtered);
        }
    }, [searchTerm, prestataires, selectedSpeciality]);

    const specialities = prestataires ? [...new Set(prestataires.map(p => p.specialite))] : [];

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-extrabold text-indigo-900 sm:text-4xl mb-2">
                        Nos Prestataires Experts
                    </h1>
                    <p className="max-w-2xl mx-auto text-indigo-700">
                        Découvrez nos professionnels qualifiés prêts à vous aider
                    </p>
                </div>
                <div className="sticky top-20 left-0 rounded-2xl mb-4 p-4 bg-white z-10 ">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow">
                            <input 
                                type="search" 
                                placeholder="Rechercher par nom, spécialité ou localisation..." 
                                className="px-4 py-3 w-full border border-gray-200 rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-3.5 text-blue-500 h-5 w-5"/>
                        </div>
                        <button 
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all shadow-sm hover:shadow-md"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <ListFilter className="h-5 w-5" />
                            <span>Filtrer</span>
                        </button>
                    </div>
                    {showFilters && (
                        <div className="mt-6 pt-4 border-t">
                            <h3 className="font-medium text-gray-700 mb-3">Spécialités</h3>
                            <div className="flex flex-wrap gap-2">
                                <button 
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSpeciality === null ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    onClick={() => setSelectedSpeciality(null)}
                                >
                                    Toutes
                                </button>
                                {specialities.map(spec => (
                                    <button 
                                        key={spec}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSpeciality === spec ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        onClick={() => setSelectedSpeciality(spec === selectedSpeciality ? null : spec)}
                                    >
                                        {spec}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>                
                {filteredPrestataires.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPrestataires.map((prestataire) => (
                            <div key={prestataire.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="relative h-52 w-full">
                                    {prestataire.profil ? (
                                        <img 
                                            src={`http://localhost:3004/${prestataire.profil}`} 
                                            alt={`${prestataire.Utilisateur.nom}`} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                                            <span className="text-gray-400 font-medium">Photo non disponible</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-yellow-500 p-1.5 rounded-lg flex items-center shadow-sm">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="ml-1 font-medium">4.8</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 opacity-70"></div>
                                    <div className="absolute bottom-3 left-4 text-white">
                                        <span className="text-xs font-medium bg-blue-600 px-2 py-1 rounded-full inline-block mb-1">
                                            {prestataire.specialite}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">{prestataire.Utilisateur.nom}</h2>
                                    
                                    <div className="flex items-center text-gray-600 mb-3">
                                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                                        <span>{prestataire.localisation}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700 font-medium mb-4">
                                        <Tag className="h-4 w-4 mr-2 text-green-500"/>
                                        <span>{prestataire.tarifhoraire.toLocaleString()} Ar / heure</span>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="text-sm truncate">{prestataire.Utilisateur.telephone}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="text-sm truncate">{prestataire.Utilisateur.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        <button className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm hover:shadow flex items-center justify-center">
                                            Contacter
                                        </button>
                                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                        <div className="mb-4 text-gray-400">
                            <Search className="h-12 w-12 mx-auto mb-2" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Aucun prestataire trouvé</h3>
                        <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prestataire;