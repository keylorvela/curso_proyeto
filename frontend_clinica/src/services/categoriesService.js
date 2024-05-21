import axios from 'axios';

const API_BASE_URL = "https://backend-proyeto.vercel.app";

//const API_BASE_URL = 'http://localhost:3000';
//

export async function getCategories() {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    }
    catch (error) {
        throw new Error('Failed to send application form: ' + error.message);
    }
}
