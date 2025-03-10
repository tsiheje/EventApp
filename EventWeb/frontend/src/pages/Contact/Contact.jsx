import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler un appel API
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Réinitialiser le formulaire après l'envoi
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        orderNumber: ''
      });
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vous avez des questions sur un événement, besoin d'aide pour vos billets ou souhaitez organiser un événement ? Nous sommes là pour vous aider !
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
            {submitted ? (
                <div className="rounded-lg bg-green-50 p-8 shadow text-center">
                <h3 className="text-2xl font-medium text-green-800 mb-2">Merci de nous avoir contactés !</h3>
                <p className="text-green-700 mb-4">Nous avons bien reçu votre message et nous reviendrons vers vous dans les 24 heures.</p>
                <button 
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Envoyer un autre message
                </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                    <div className="mt-1">
                        <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                        />
                    </div>
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet</label>
                    <div className="mt-1">
                        <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                        >
                        <option value="">Sélectionner un sujet</option>
                        <option value="ticket-issue">Problème avec un billet</option>
                        <option value="event-inquiry">Demande d'événement</option>
                        <option value="host-event">Organiser un événement</option>
                        <option value="refund">Demande de remboursement</option>
                        <option value="other">Autre</option>
                        </select>
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">Numéro de commande (si applicable)</label>
                    <div className="mt-1">
                        <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <div className="mt-1">
                        <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                    </div>
                </div>
                </form>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
