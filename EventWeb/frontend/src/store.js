import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import UserService from './services/api/UserService'

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      nom: null,
      type: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

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

      checkAuth: () => !!get().token
    }),
    {
      name: 'auth-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default useAuthStore;
