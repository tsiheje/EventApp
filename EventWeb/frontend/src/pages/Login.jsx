import { useState } from "react";
import { ArrowLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        motDePasse: ''
    });

    const [showPassword, setShowPassword] = useState(false)

    const [errors, setErrors] = useState({});
    
    const { login, isLoading } = useAuthStore();
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis.";
        }
        if (!formData.motDePasse.trim()) {
            newErrors.motDePasse = "Le mot de passe est requis.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; 
        }
        
        try {
            await login(formData);
            toast.success("Connexion réussie");
            
            const from = location.state?.from || "/";
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la connexion");
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex w-full">
                <div className="w-1/2 p-8">
                    <div className="mb-6">
                        <Link to='/' className="inline-flex items-center text-gray-600 hover:text-gray-800">
                            <ArrowLeft className="w-6 h-6 mr-2" />
                            Retour
                        </Link>
                    </div>
                    <div>
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-bold mb-6">Se connecter</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5 px-16">
                            <div>
                                <label htmlFor="email" className="block mb-1">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Entrez votre email"
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="relative w-full">
                                <label htmlFor="motDePasse" className="block mb-1">Mot de passe</label>
                                <div className="relative">
                                    <input
                                        id="motDePasse"
                                        type={showPassword ? "text" : "password"}
                                        name="motDePasse"
                                        value={formData.motDePasse}
                                        className={`w-full p-2 pr-10 border rounded ${errors.motDePasse ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="Entrez votre mot de passe"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label="Afficher/Masquer le mot de passe"
                                    >
                                        {showPassword ? <EyeOffIcon size={25} /> : <EyeIcon size={25} />}
                                    </button>
                                </div>
                                {errors.motDePasse && <p className="text-red-500 text-sm">{errors.motDePasse}</p>}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="remember" className="w-5 h-4"/>
                                    <label htmlFor="remember">Se souvenir de moi</label>
                                </div>
                                <Link to="/MotDePasse" className="text-blue-500">Mot de passe oublié?</Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                                disabled={isLoading}
                            >
                                {isLoading ? "Connexion..." : "Se connecter"}
                            </button>
                            <div>
                                <p>
                                    Si vous n'avez pas encore de compte ?{" "}
                                    <Link to='/register' className="text-blue-500">Créer un compte</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-1/2 bg-blue-50 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Bienvenue!</h2>
                        <p className="text-gray-600">Nous sommes ravis de vous accueillir sur notre plateforme.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;