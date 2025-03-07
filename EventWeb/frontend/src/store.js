import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import UserService from './services/api/UserService'
import PrestataireService from './services/api/PrestataireService';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      nom: null,
      type: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      prestataires: [],
      isLoadingPrestataire:null,
      errorPrestataire:null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await UserService.login(credentials);

          if (!response.token) {
            throw new Error("Identifiants incorrects !");
          }

          set({ 
            token: response.token,
            nom: response.nom,
            type: response.type,
            isAuthenticated: true,
            isLoading: false
          });

          return response;
        } catch (error) {
          console.error("Erreur de connexion:", error);
          
          set({ 
            error: error.message || "Erreur lors de la connexion", 
            isLoading: false,
            isAuthenticated: false
          });

          throw error;
        }
      },

      logout: () => {
        set({ 
          token: null, 
          nom: null, 
          type: null, 
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      },

      getPrestataire: async () => {
        set({isLoadingPrestataire: true, errorPrestataire: null})
        try {
          const response = await PrestataireService.getAllPrestataire();
          set({
            prestataires:response,
            isLoadingPrestataire: false,
          })
          return response
        } catch (error) {
          console.error("Erreur de recuperation des prestataire:", error);
          set({
            errorPrestataire: "Imposible de charger les prestataires",
            isLoadingPrestataire: false,
          })
        }
      },

      checkAuth: () => !!get().token
    }),
    {
      name: 'auth-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default useAuthStore;
