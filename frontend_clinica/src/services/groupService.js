import axios from 'axios';

const API_BASE_URL = 'https://backend-proyeto.vercel.app';

export async function getGroupsInCourse(courseID) {
    try {
        const response = await axios.get(`${API_BASE_URL}/group/${courseID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
