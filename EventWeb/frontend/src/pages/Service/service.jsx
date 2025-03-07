import { Search, Filter } from "lucide-react";
import useAuthStore from "../../store";

const Service = () => {
    const {type} = useAuthStore()
    return (
        <div className="px-8 py-5 flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="relative mx-4 flex-grow max-w-md">
                        <input 
                            type="search" 
                            placeholder="chercher un événement..." 
                            className="px-4 py-2 w-full border rounded-full pl-10 focus:outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                    </div>
                    <div>
                        <Filter/>
                    </div>
                </div>
                <div>
                    {type === "Prestataire" &&(
                            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Proposer un service</button>
                        )
                    }
                </div>
            </div>
            <div className="flex items-center justify-center">
                Liste des services
            </div>
        </div>
    );
}

export default Service;