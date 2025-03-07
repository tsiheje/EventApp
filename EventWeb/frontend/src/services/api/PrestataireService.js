import config from "../config";

const { apiUrl } = config;

const PrestataireService = {
    async getAllPrestataire(){
        try {
            const response = await fetch(`${apiUrl}/getAllPrestataire`)
            if (!response) {
                    throw new Error("Network response was not ok");
                }
            console.log(response)
            return response.json();
        } catch (error) {
            console.error("erreur lors de la recuperation des prestataires:", error);
            throw error;
        }
    }
}

export default PrestataireService;