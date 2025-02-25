import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserService from "../services/api/UserService";
import { toast } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        motDePasse: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigation = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};
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

        setLoading(true);
        try {
            const response = await UserService.login(formData);
            localStorage.setItem("token", response.token);
            localStorage.setItem("nom", response.nom);
            localStorage.setItem("type", response.type);
            toast.success("Connexion réussie");

            const from = location.state?.from || "/";
            navigation(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la connexion");
        } finally {
            setLoading(false);
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
                        <div className="space-y-5 px-16">
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Entrez votre email"
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="">
                                <label className="block mb-1">Mot de passe</label>
                                <input
                                    type="password"
                                    name="motDePasse"
                                    value={formData.motDePasse}
                                    className={`w-full p-2 border rounded ${errors.motDePasse ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Entrez votre mot de passe"
                                    onChange={handleChange}
                                />
                                {errors.motDePasse && <p className="text-red-500 text-sm">{errors.motDePasse}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Connexion..." : "Se connecter"}
                            </button>
                            <div>
                                <p>
                                    Si vous n'avez pas encore de compte ?{" "}
                                    <Link to='/register' className="text-blue-500">Créer un compte</Link>
                                </p>
                            </div>
                        </div>
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
