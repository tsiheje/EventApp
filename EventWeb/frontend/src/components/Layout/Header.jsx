import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, User, LogIn, LogOut, ChevronDown, ChevronUp, LayoutDashboard, Calendar, Briefcase, Ticket, Settings, UserPlus} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { toast } from "react-toastify";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [token, setToken] = useState(null);
    const [userType, setUserType] = useState(null);
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        const checkToken = () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    if (decoded) {
                        setToken(storedToken);
                        setIsLoggedIn(true);
                        setUserType(localStorage.getItem("type"));
                    }
                } catch (error) {
                    console.error("Token invalide ou expiré", error);
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    setUserType(null);
                }
            }
        };

        checkToken();
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        toast.success("Déconnexion réussie");
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        setIsLoggedIn(false);
        setToken(null);
        setUserType(null);
        setShowDropdown(false);
    };

    const getNom = localStorage.getItem("nom");
    const nom = getNom.split(" ")[0];
    console.log(nom[0].toUpperCase());
    const setNom = nom[0].toUpperCase();

    return (
        <div className="flex items-center justify-between bg-gray-800 py-4 px-8 shadow-lg">
            <div className="text-white text-2xl font-bold">
                <Link to='/' className="hover:text-gray-300 transition-colors">
                    EventApp
                </Link>
            </div>
            <div className="relative">
                <input 
                    type="search" 
                    placeholder="chercher un événement ou un prestataire..." 
                    className="px-4 py-2 w-[360px] rounded-full pl-10 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
            <div className="flex items-center gap-6 text-white">
                <NavLink to='/'
                    className={({ isActive }) => 
                        isActive ? "hover:text-gray-300 transition-colors border-b-2 border-white" : "hover:text-gray-300 transition-colors"
                       }
                >
                    Accueil
                </NavLink>
                <NavLink to='/Evenement'
                  className={({ isActive }) => 
                    isActive ? "hover:text-gray-300 transition-colors border-b-2 border-white" : "hover:text-gray-300 transition-colors"
                   }
                >
                    Événements
                </NavLink>
                <NavLink to='/Prestataire'
                    className={({ isActive }) => 
                        isActive ? "hover:text-gray-300 transition-colors border-b-2 border-white" : "hover:text-gray-300 transition-colors"
                       }
                >
                    Prestataires
                </NavLink>
                <NavLink to='/Service' 
                    className={({ isActive }) => 
                    isActive ? "hover:text-gray-300 transition-colors border-b-2 border-white" : "hover:text-gray-300 transition-colors"
                   }
                >
                    Services
                </NavLink>
                <NavLink to='/Billets'
                    className={({ isActive }) => 
                        isActive ? "hover:text-gray-300 transition-colors border-b-2 border-white" : "hover:text-gray-300 transition-colors"
                   }
                >
                    Billets
                </NavLink>
                <NavLink to='/Contacts' 
                    className={({ isActive }) => 
                        isActive ? "hover:text-gray-300 transition-colors border-b-2 border-white" : "hover:text-gray-300 transition-colors"
                       }
                >
                    Contacts
                </NavLink>
            </div>
            <div className="relative" ref={dropdownRef}>
                <button 
                    className="text-white transition-colors flex items-center gap-1 w-20 h-12 border-2 rounded-full px-2"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    {isLoggedIn ? (
                        <>
                            <div className="w-8 h-7 flex flex-center items-center justify-center rounded-full bg-white">
                                <p className="text-gray-600">{setNom}</p>
                            </div>
                        </>
                    ) : (
                        <User className="h-8 w-8" />
                    )}
                    {showDropdown ? (
                        <ChevronUp className="h-8 w-8"/>
                    ) : (
                        <ChevronDown className="h-8 w-8"/>
                    )}
                </button>
                {showDropdown && (
                    <div className="absolute right-0 top-16 w-64 bg-white shadow-lg z-50 rounded">
                        {isLoggedIn ? (
                            <>
                                <Link to="/profil "className="flex items-center gap-3 p-3 border-b hover:bg-gray-100">
                                    <div className="w-12 h-12 flex flex-center items-center justify-center rounded-full bg-gray-500">
                                        <p className="text-white text-2xl">{setNom}</p>
                                    </div>
                                    <p className="block text-xl text-gray-700">{getNom}</p>
                                </Link>
                                <div className="flex flex-col p-2 gap-2">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                    <LayoutDashboard className="h-5 w-5"/>
                                        Tableau de bord
                                    </Link>
                                    <Link to="/manage-events" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                        <Calendar className="h-5 w-5"/>
                                        Gérer les événements
                                    </Link>
                                    {userType === "prestataire" && (
                                        <Link to="/manage-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                            <Briefcase className="h-5 w-5"/>
                                            Gérer les services
                                        </Link>
                                    )}
                                    <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                        <Ticket className="h-5 w-5" />
                                        Gérer les billets
                                    </Link>
                                    <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                        <Settings className="h-5 w-5" />
                                        Paramétres du compte
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        Se déconnecter
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col p-2 gap-2">
                                <Link 
                                    to="/register"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded flex items-center gap-2"
                                >
                                    <UserPlus className="w-5 h-5" />
                                    Créer un compte
                                </Link>
                                <div className="border"></div>
                                <Link 
                                    to="/login"
                                    state={{from: location.pathname}}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded flex items-center gap-2"
                                >
                                    <LogIn className="w-5 h-5" />
                                    Se connecter
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
