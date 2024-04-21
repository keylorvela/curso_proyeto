import axios from 'axios';

const API_BASE_URL = 'https://backend-proyeto.vercel.app';


export async function getCourses() {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}


export async function getCourse(id_course) {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/${id_course}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}