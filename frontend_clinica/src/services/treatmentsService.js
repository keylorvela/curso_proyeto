import axios from 'axios';

const API_BASE_URL = 'https://backend-proyeto.vercel.app';

/**
 * Obtiene todos los tratamientos desde la API.
 * @returns {Promise} Una promesa que resuelve con los datos de los tratamientos o null si hay un error.
 */
export async function getTreatments() {
  try {
    const response = await axios.get(`${API_BASE_URL}/treatments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

/**
 * Obtiene un tratamiento específico desde la API.
 * @param {number} id_treatment - El ID del tratamiento que se desea obtener.
 * @returns {Promise} Una promesa que resuelve con los datos del tratamiento o null si hay un error.
 */
export async function getTreatment(id_treatment) {
  try {
    const response = await axios.get(`${API_BASE_URL}/treatments/${id_treatment}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
