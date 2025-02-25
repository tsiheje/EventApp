import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select from 'react-select';

const OrganisateurForm = () => {
  return (
    <form className="space-y-3">
      <div>
        <label className="block">Nom</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          placeholder="Entrez votre nom"
        />
      </div>
      <div>
        <label className="block">Email</label>
        <input 
          type="email" 
          className="w-full p-2 border rounded" 
          placeholder="Entrez votre email"
        />
      </div>
      <div>
        <label className="block">Téléphone</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          placeholder="Entrez votre téléphone"
        />
      </div>
      <div>
        <label className="block">Mot de passe</label>
        <input 
          type="password" 
          className="w-full p-2 border rounded" 
          placeholder="Créez un mot de passe"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        S'inscrire comme Organisateur
      </button>
    </form>
  );
};

const PrestataireForm = () => {
    const [step, setStep] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const nextStep = (e) => {
      e.preventDefault();
      setStep(step + 1);
    };
  
    const previousStep = (e) => {
      e.preventDefault();
      setStep(step - 1);
    };
  
    const renderStep1 = () => (
      <>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Profil du prestataire</label>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-96 h-32 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-center">
                    <p>Cliquez pour ajouter une photo</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image"
              />
              <label
                htmlFor="profile-image"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Choisir une photo
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-1">Nom du prestataire</label>
            <input 
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Votre nom complet"
            />
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
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Spécialité</label>
            <input 
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Votre domaine d'expertise"
            />
          </div>
          <div>
            <label className="block mb-1">Localisation</label>
            <input 
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Votre localisation"
            />
          </div>
          <div>
            <label className="block mb-1">Tarif</label>
            <input 
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Votre tarif"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={previousStep}
              className="w-1/2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Précédent
            </button>
            <button
              onClick={nextStep}
              className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Suivant
            </button>
          </div>
        </div>
      </>
    );
  
    const renderStep3 = () => (
      <>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Email professionnel</label>
            <input 
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Email professionnel"
            />
          </div>
          <div>
            <label className="block mb-1">Téléphone</label>
            <input 
              type="tel"
              className="w-full p-2 border rounded"
              placeholder="Numéro de téléphone"
            />
          </div>
          <div>
            <label className="block mb-1">Mot de passe</label>
            <input 
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Créez un mot de passe"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={previousStep}
              className="w-1/2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Précédent
            </button>
            <button
              type="submit"
              className="w-1/2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </>
    );
  
    return (
      <form className="space-y-4">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {num}
            </div>
          ))}
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

  const options = [
    { value: 'Organisateur', label: 'Organisateur' },
    { value: 'Prestataire', label: 'Prestataire' },
  ];

  const handleContinue = () => {
    if (selected) {
      setShowForm(true);
    } else {
      alert("Veuillez sélectionner un profil");
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
    <div className="flex min-h-screen">
      <div className="flex w-full">
        <div className="w-1/2 p-8">
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
            <Select 
              options={options} 
              onChange={(option) => {
                setSelected(option);
                setShowForm(false);
              }}
              placeholder="Sélectionnez votre profil"
              className="mb-5"
              value={selected}
            />
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

export default Register;