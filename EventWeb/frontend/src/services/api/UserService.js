import config from "../config";

const { apiUrl } = config;

const UserService = {
    async login(formData) {
        try{
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            return data;
        }catch(error){
            console.error("erreur de login:", error);
            throw error;
        }
    },

    async register(formData) {
        try{
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            return data;
        }catch(error){
            console.error("erreur de login:", error);
            throw error;
        }
    }
}

export default UserService;