import axios from 'axios';

const API_BASE_URL = 'https://backend-proyeto.vercel.app';


export async function getTreatments() {
  try {
    const response = await axios.get(`${API_BASE_URL}/treatments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


export async function getTreatment(id_treatment) {
  try {
    const response = await axios.get(`${API_BASE_URL}/treatments/${id_treatment}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
