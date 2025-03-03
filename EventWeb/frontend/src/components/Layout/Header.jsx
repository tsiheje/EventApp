import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, User, LogIn, LogOut, ChevronDown, ChevronUp, LayoutDashboard, Calendar, Briefcase, Ticket, Settings, UserPlus, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import useAuthStore from "../../store";
import Swal from 'sweetalert2';

const Header = () => {
    const { nom, type, isAuthenticated, logout } = useAuthStore();
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userInitial, setUserInitial] = useState("");
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (nom && nom.length > 0) {
            const nameParts = nom.split(" ");
            if (nameParts.length > 0 && nameParts[0].length > 0) {
                setUserInitial(nameParts[0][0].toUpperCase());
            }
        } else {
            setUserInitial("");
        }
    }, [nom]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: 'Confirmation',
            text: 'Voulez-vous vraiment vous déconnecter?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, déconnecter',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                toast.success("Déconnexion réussie");
                setShowDropdown(false);
            }
        });
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleDropdownItemClick = () => {
        setShowDropdown(false);
    };

    return (
        <div className="w-full shadow-md">
            <div className="hidden lg:block bg-gray-800 py-4 px-8">
                <div className="flex items-center justify-between">
                    <div className="text-white text-2xl font-bold">
                        <Link to='/' className="hover:text-gray-300 transition-colors">
                            EventApp
                        </Link>
                    </div>
                    <div className="relative mx-4 flex-grow max-w-md">
                        <input 
                            type="search" 
                            placeholder="Chercher un événement ou un prestataire..." 
                            className="px-4 py-2 w-full rounded-full pl-10 focus:outline-none"
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
                    <div className="relative ml-2" ref={dropdownRef}>
                        <button 
                            className="text-white transition-colors flex items-center gap-1 w-16 h-10 border-2 rounded-full px-1"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            {isAuthenticated ? (
                                <>
                                    <div className="w-8 h-7 flex items-center justify-center rounded-full bg-white">
                                        <p className="text-gray-600">{userInitial}</p>
                                    </div>
                                </>
                            ) : (
                                <User className="h-6 w-6 border-2 rounded-full bg-white text-gray-500" />
                            )}
                            {showDropdown ? (
                                <ChevronUp className="h-7 w-7"/>
                            ) : (
                                <ChevronDown className="h-7 w-7"/>
                            )}
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 top-12 w-64 bg-white shadow-lg z-50 rounded">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/profil" className="flex items-center gap-3 p-3 border-b hover:bg-gray-100" onClick={handleDropdownItemClick}>
                                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-500">
                                                <p className="text-white text-2xl">{userInitial}</p>
                                            </div>
                                            <p className="block text-xl text-gray-700">{nom}</p>
                                        </Link>
                                        <div className="flex flex-col p-2 gap-2">
                                            <Link to="/profil" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                <LayoutDashboard className="h-5 w-5"/>
                                                Tableau de bord
                                            </Link>
                                            <Link to="/gerer-evenements" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                <Calendar className="h-5 w-5"/>
                                                Gérer les événements
                                            </Link>
                                            {type === "prestataire" && (
                                                <Link to="/gerer-services" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                    <Briefcase className="h-5 w-5"/>
                                                    Gérer les services
                                                </Link>
                                            )}
                                            <Link to="/gerer-billets" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                <Ticket className="h-5 w-5" />
                                                Gérer les billets
                                            </Link>
                                            <Link to="/parametres" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                <Settings className="h-5 w-5" />
                                                Paramètres du compte
                                            </Link>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
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
                                            state={{from: location.pathname}}
                                            className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded flex items-center gap-2"
                                            onClick={handleDropdownItemClick}
                                        >
                                            <UserPlus className="w-5 h-5" />
                                            Créer un compte
                                        </Link>
                                        <div className="border"></div>
                                        <Link 
                                            to="/login"
                                            state={{from: location.pathname}}
                                            className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded flex items-center gap-2"
                                            onClick={handleDropdownItemClick}
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
            </div>

            <div className="flex items-center justify-between py-2 px-4 bg-gray-800 lg:hidden">
                <div className="flex items-center gap-4">
                    <button 
                        className="text-white"
                        onClick={toggleMobileMenu}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    
                    <div className="text-white text-xl font-bold">
                        <Link to='/' className="transition-colors">
                            EventApp
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-1 text-white">
                        <Search className="h-5 w-5" />
                    </button>
                    
                    <div className="relative" ref={dropdownRef}>
                    <button 
                            className="text-white transition-colors flex items-center gap-1 w-16 h-10 border-2 rounded-full px-1"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            {isAuthenticated ? (
                                <>
                                    <div className="w-8 h-7 flex items-center justify-center rounded-full bg-white">
                                        <p className="text-gray-600">{userInitial}</p>
                                    </div>
                                </>
                            ) : (
                                <User className="h-6 w-6 border-2 rounded-full bg-white text-gray-500" />
                            )}
                            {showDropdown ? (
                                <ChevronUp className="h-7 w-7"/>
                            ) : (
                                <ChevronDown className="h-7 w-7"/>
                            )}
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 top-12 w-64 bg-white shadow-lg z-50 rounded">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/profil" className="flex items-center gap-3 p-3 border-b hover:bg-gray-100" onClick={handleDropdownItemClick}>
                                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-500">
                                                <p className="text-white text-2xl">{userInitial}</p>
                                            </div>
                                            <p className="block text-xl text-gray-700">{nom}</p>
                                        </Link>
                                        <div className="flex flex-col p-2 gap-2">
                                            <Link to="/profil" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                <LayoutDashboard className="h-5 w-5"/>
                                                Tableau de bord
                                            </Link>
                                            <Link to="/gerer-evenements" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                <Calendar className="h-5 w-5"/>
                                                Gérer les événements
                                            </Link>
                                            {type === "prestataire" && (
                                                <Link to="/gerer-services" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                    <Briefcase className="h-5 w-5"/>
                                                    Gérer les services
                                                </Link>
                                            )}
                                            <Link to="/gerer-billets" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                <Ticket className="h-5 w-5" />
                                                Gérer les billets
                                            </Link>
                                            <Link to="/parametres" className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={handleDropdownItemClick}>
                                                <Settings className="h-5 w-5" />
                                                Paramètres du compte
                                            </Link>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
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
                                            state={{from: location.pathname}}
                                            className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded flex items-center gap-2"
                                            onClick={handleDropdownItemClick}
                                        >
                                            <UserPlus className="w-5 h-5" />
                                            Créer un compte
                                        </Link>
                                        <div className="border"></div>
                                        <Link 
                                            to="/login"
                                            state={{from: location.pathname}}
                                            className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded flex items-center gap-2"
                                            onClick={handleDropdownItemClick}
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
            </div>
            
            {/* Menu mobile déroulant */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-50 flex lg:hidden"
                    ref={mobileMenuRef}
                >
                    <div className="w-64 bg-white h-full shadow-lg">
                        <div className="flex justify-between items-center p-4 border-b">
                            <div className="text-xl font-bold text-gray-800">EventApp</div>
                            <button onClick={toggleMobileMenu}>
                                <X className="h-6 w-6 text-gray-700" />
                            </button>
                        </div>
                        
                        <div className="flex flex-col py-4">
                            <NavLink to='/'
                                className={({ isActive }) => 
                                    isActive 
                                        ? "px-4 py-2 bg-gray-100 text-gray-800 border-l-4 border-gray-800" 
                                        : "px-4 py-2 text-gray-700 hover:bg-gray-50"
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Accueil
                            </NavLink>
                            <NavLink to='/Evenement'
                                className={({ isActive }) => 
                                    isActive 
                                        ? "px-4 py-2 bg-gray-100 text-gray-800 border-l-4 border-gray-800" 
                                        : "px-4 py-2 text-gray-700 hover:bg-gray-50"
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Événements
                            </NavLink>
                            <NavLink to='/Prestataire'
                                className={({ isActive }) => 
                                    isActive 
                                        ? "px-4 py-2 bg-gray-100 text-gray-800 border-l-4 border-gray-800" 
                                        : "px-4 py-2 text-gray-700 hover:bg-gray-50"
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Prestataires
                            </NavLink>
                            <NavLink to='/Service'
                                className={({ isActive }) => 
                                    isActive 
                                        ? "px-4 py-2 bg-gray-100 text-gray-800 border-l-4 border-gray-800" 
                                        : "px-4 py-2 text-gray-700 hover:bg-gray-50"
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Services
                            </NavLink>
                            <NavLink to='/Billets'
                                className={({ isActive }) => 
                                    isActive 
                                        ? "px-4 py-2 bg-gray-100 text-gray-800 border-l-4 border-gray-800" 
                                        : "px-4 py-2 text-gray-700 hover:bg-gray-50"
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Billets
                            </NavLink>
                            <NavLink to='/Contacts'
                                className={({ isActive }) => 
                                    isActive 
                                        ? "px-4 py-2 bg-gray-100 text-gray-800 border-l-4 border-gray-800" 
                                        : "px-4 py-2 text-gray-700 hover:bg-gray-50"
                                }
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contacts
                            </NavLink>
                        </div>
                    </div>
                    <div 
                        className="flex-1 bg-black bg-opacity-50"
                        onClick={toggleMobileMenu}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Header;