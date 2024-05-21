import axios from 'axios';

const API_BASE_URL = "https://backend-proyeto.vercel.app";

const ReviewsService = {
    ListReviewsOfTreatment: async (treatment_id) => {
        try {
            const params = { treatment_id }
            const response = await axios.get(`${API_BASE_URL}/reviews`, { params });

            return response.data;
        } catch (error) {
            console.error("Error in reviews service", error);
        }
    },

    AddReview: async (p_name, p_reviewContent, p_stars, p_treatmentID) => {
        try {
            const body = { p_name,
                p_reviewContent,
                p_stars,
                p_treatmentID }
            const response = await axios.post(`${API_BASE_URL}/reviews`, body);

            return response.data;
        } catch (error) {
            console.error("Error in reviews service", error);
        }
    },
};

export default ReviewsService;