import { useState } from "react";
import { ArrowLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Select from 'react-select';
import UserService from "../../services/api/UserService";
import { toast } from "react-toastify";
import useAuthStore from "../../store";

const OrganisateurForm = () => {
  const [formData, setFormData] = useState({
    type: 'Organisateur',
    nom: '',
    email: '',
    telephone: '',
    motDePasse: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide.";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le numéro de téléphone est requis.";
    }
    if (!formData.motDePasse.trim()) {
      newErrors.motDePasse = "Le mot de passe est requis.";
    } else if (formData.motDePasse.length < 6) {
      newErrors.motDePasse = "Le mot de passe doit contenir au moins 6 caractères.";
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
      await UserService.register(formData);
      await login({
        email: formData.email,
        motDePasse: formData.motDePasse
      });
      toast.success("Inscription réussie");
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erreur lors de l'inscription");
      }
    }
  };

  return (
    <form className="space-y-5 px-4 md:px-16" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1">Nom</label>
        <input 
          type="text"
          name="nom"
          value={formData.nom}
          className={`w-full p-2 border rounded ${errors.nom ? "border-red-500" : "border-gray-300"}`}
          placeholder="Entrez votre nom"
          onChange={handleChange}
        />
        {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
      </div>  
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
      <div>
        <label className="block mb-1">Téléphone</label>
        <input 
          type="text" 
          name="telephone"
          value={formData.telephone}
          className={`w-full p-2 border rounded ${errors.telephone ? "border-red-500" : "border-gray-300"}`}
          placeholder="Entrez votre téléphone"
          onChange={handleChange}
        />
        {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
      </div>
      <div className="relative">
        <label className="block mb-1">Mot de passe</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"}
            name="motDePasse"
            value={formData.motDePasse}
            className={`w-full p-2 pr-10 border rounded ${errors.motDePasse ? "border-red-500" : "border-gray-300"}`}
            placeholder="Créez un mot de passe"
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Afficher/Masquer le mot de passe"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>
        {errors.motDePasse && <p className="text-red-500 text-sm">{errors.motDePasse}</p>}
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? "Inscription en cours..." : "S'inscrire comme Organisateur"}
      </button>
    </form>
  );
};

const PrestataireForm = () => {
  const [formData, setFormData] = useState({
    type: "Prestataire",
    nom: "",
    email: "",
    telephone: "",
    motDePasse: "",
    profil: null,
    tarifhoraire: "",
    localisation: "",
    specialite: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profil: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.specialite.trim()) {
      newErrors.specialite = "La spécialité est requise.";
    }
    if (!formData.localisation.trim()) {
      newErrors.localisation = "La localisation est requise.";
    }
    if (!formData.tarifhoraire.trim()) {
      newErrors.tarifhoraire = "Le tarif est requis.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide.";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le numéro de téléphone est requis.";
    }
    if (!formData.motDePasse.trim()) {
      newErrors.motDePasse = "Le mot de passe est requis.";
    } else if (formData.motDePasse.length < 6) {
      newErrors.motDePasse = "Le mot de passe doit contenir au moins 6 caractères.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    } else if (step === 2 && validateStep2()) {
      setStep(step + 1);
    }
  };

  const previousStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) {
      return;
    }
    
    try {
      await UserService.register(formData);
      await login({
        email: formData.email,
        motDePasse: formData.motDePasse
      });
      toast.success("Inscription réussie");
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erreur lors de l'inscription");
      }
    }
  };

  const specialiteOptions = [
    { value: 'Traiteur', label: 'Traiteur' },
    { value: 'Photographe', label: 'Photographe' },
    { value: 'Dj', label: 'DJ et Animateur' },
    { value: 'Espace', label: 'Espace événementiel' },
  ];

  const renderStep1 = () => (
    <>
      <div className="space-y-5 px-4 md:px-16">
        <div>
          <label className="block mb-1">Profil du prestataire</label>
          <div className="flex flex-col items-center space-y-4">
            <label
              htmlFor="profile-image"
              className="w-full h-32 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 text-center">
                  <p>Cliquez ici pour ajouter une photo</p>
                  <p className="text-sm mt-1">ou glissez une image</p>
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profile-image"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Nom du prestataire</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.nom ? "border-red-500" : "border-gray-300"}`}
            placeholder="Votre nom complet"
          />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
        </div>
        <button 
          onClick={nextStep} 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Suivant
        </button>
      </div>
    </>
  );

  const renderStep2 = () => (

    <>
      <div className="space-y-5 px-4 md:px-16">
        <div>
          <label className="block mb-1">Spécialité</label>
          <Select
            name="specialite"
            value={specialiteOptions.find(option => option.value === formData.specialite)}
            onChange={(selectedOption) => setFormData({ ...formData, specialite: selectedOption.value })}
            options={specialiteOptions}
            classNamePrefix="react-select"
            className={`w-full ${errors.specialite ? "border-red-500" : ""}`}
          />
          {errors.specialite && <p className="text-red-500 text-sm">{errors.specialite}</p>}
        </div>
        <div>
          <label className="block mb-1">Localisation</label>
          <input
            type="text"
            name="localisation"
            value={formData.localisation}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.localisation ? "border-red-500" : "border-gray-300"}`}
            placeholder="Votre localisation"
          />
          {errors.localisation && <p className="text-red-500 text-sm">{errors.localisation}</p>}
        </div>
        <div className="relative">
          <label className="block mb-1">Tarif</label>
          <input
            type="text"
            name="tarifhoraire"
            value={formData.tarifhoraire}
            onChange={handleChange}
            className={`w-full p-2 pr-10 border rounded ${errors.tarifhoraire ? "border-red-500" : "border-gray-300"}`}
            placeholder="Votre tarif"
          />
          <span className="absolute right-3 top-9 text-gray-500">Ar</span>
          {errors.tarifhoraire && <p className="text-red-500 text-sm">{errors.tarifhoraire}</p>}
        </div>
        <div className="flex space-x-4">
          <button onClick={previousStep} className="w-1/2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
            Précédent
          </button>
          <button onClick={nextStep} className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Suivant
          </button>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="space-y-5 px-4 md:px-16">
        <div>
          <label className="block mb-1">Email professionnel</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="Email professionnel"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1">Téléphone</label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            maxLength={10}
            className={`w-full p-2 border rounded ${errors.telephone ? "border-red-500" : "border-gray-300"}`}
            placeholder="Numéro de téléphone"
          />
          {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
        </div>
        <div className="relative">
          <label className="block mb-1">Mot de passe</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              className={`w-full p-2 pr-10 border rounded ${errors.motDePasse ? "border-red-500" : "border-gray-300"}`}
              placeholder="Créez un mot de passe"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Afficher/Masquer le mot de passe"
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          {errors.motDePasse && <p className="text-red-500 text-sm">{errors.motDePasse}</p>}
        </div>
        <div className="flex space-x-4">
          <button onClick={previousStep} className="w-1/2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
            Précédent
          </button>
          <button 
            onClick={handleSubmit} 
            className="w-1/2 bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <form className="space-y-4">
      <div className="flex items-center justify-between mb-4 relative">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
              step >= num ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {num}
          </div>
        ))}
        <div className="absolute h-1 bg-gray-200 w-full top-4 -z-0"></div>
        <div
          className="absolute h-1 bg-blue-500 top-4 -z-0 transition-all duration-300"
          style={{
            width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
            left: 0,
          }}
        ></div>
      </div>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </form>
  );
};

const Register = () => {
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const options = [
    { value: 'Organisateur', label: 'Organisateur' },
    { value: 'Prestataire', label: 'Prestataire' },
  ];

  const handleContinue = () => {
    if (selected) {
      setShowForm(true);
      setError("");
    } else {
      setError("Veuillez sélectionner un profil");
    }
  };

  const renderForm = () => {
    if (!showForm) return null;
    
    return selected.value === 'Organisateur' ? (
      <OrganisateurForm />
    ) : (
      <PrestataireForm />
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex w-full">
        <div className="w-full lg:w-1/2 p-8">
          <div className="mb-6">
            <Link to='/' className="inline-flex items-center text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6 mr-2"/>
              Retour
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-6">Créer un compte</h1>
          </div>

          <div className="space-y-3 px-16">
            <div className="relative">
              <Select
                options={options}
                onChange={(option) => {
                  setSelected(option);
                  setShowForm(false);
                }}
                placeholder="Sélectionnez votre profil"
                className={`mb-2   z-20 ${error ? 'border-red-500' : ''}`}
                value={selected}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            {!showForm && (
              <button
                onClick={handleContinue}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                type="button"
              >
                Continuer
              </button>
            )}
            {renderForm()}
            <div className="text-center mt-6">
              <Link to='/Login' className="text-blue-500 hover:text-blue-600">
                Déjà inscrit? Se connecter
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 bg-blue-50 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Bienvenue!</h2>
                    <p className="text-gray-600">
                        Créez, gérez et profitez de vos événements en toute simplicité ! Notre plateforme facilite l'organisation, la vente de billets et l'expérience des participants.
                    </p>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Register;