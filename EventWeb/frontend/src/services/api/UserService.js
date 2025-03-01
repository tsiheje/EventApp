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

    async register(userData) {
        try {
            const formData = new FormData();
            Object.keys(userData).forEach(key => {
                if (key !== 'profil' || userData[key] === null) {
                    formData.append(key, userData[key]);
                }
            });
            
            if (userData.profil) {
                formData.append('profil', userData.profil);
            }
            
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                body: formData,
            });
            
            const data = await response.json();
            return data;
        } catch(error) {
            console.error("erreur d'inscription:", error);
            throw error;
        }
    }
}

export default UserService;