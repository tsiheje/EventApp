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
          set({ 
            token: response.token,
            nom: response.nom,
            type: response.type,
            isAuthenticated: true,
            isLoading: false
          });
          return response;
        } catch (error) {
          set({ 
            error: error.message || "Erreur lors de la connexion", 
            isLoading: false 
          });
          throw error;
        }
      },
      
      logout: () => {
        set({ 
          token: null, 
          nom: null, 
          type: null, 
          isAuthenticated: false 
        });
      },
      
      checkAuth: () => {
        const { token } = get();
        return !!token;
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;