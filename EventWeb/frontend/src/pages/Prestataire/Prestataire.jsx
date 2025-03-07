import { useEffect } from "react";
import { Search, Filter } from "lucide-react";
import useAuthStore from "../../store";

const Prestataire = () => {
    const {prestataires, getPrestataire} = useAuthStore();

    useEffect(()=>{
        getPrestataire()
    },[getPrestataire]);

    console.log(prestataires)
    return (
        <div className="px-8 py-5 flex flex-col gap-5">
            <div className="flex items-center">
                <div className="relative mx-4 flex-grow max-w-md">
                    <input 
                        type="search" 
                        placeholder="chercher un événement..." 
                        className="px-4 py-2 w-full border rounded-full pl-10 focus:outline-none"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5"/>
                </div>
                <div>
                    <Filter/>
                </div>
            </div>
            <div className="flex items-center justify-center">

                    {prestataires.map((prestataire) => (
                        <div key={prestataire.id}>
                            {prestataire.profil ? (
                                <img 
                                    src={`http://localhost:3004/${prestataire.profil}`} 
                                    alt="Profil du prestataire" 
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            ) : (
                                <p>Aucune image</p>
                            )}
                        </div>
                    ))}
                
            </div>
        </div>
    );
}

export default Prestataire;