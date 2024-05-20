import axios from "./utilities/Axios.service"

const ReviewsService = {
    ListReviewsOfTreatment: async (treatment_id) => {
        try {
            const params = { treatment_id }
            const response = await axios.get(`/reviews`, { params });

            return response.data;
        } catch (error) {
            console.error("Error in reviews service", error);
        }
    },

    AddReviewRespond: async (review_id, respond) => {
        try {
            const body = { review_id, respond}
            const response = await axios.put(`/reviews`, body);

            return response.data;
        } catch (error) {
            console.error("Error in reviews service", error);
        }
    },

    RemoveReview: async (id) => {
        try {
            const params = { id }
            console.log(params)
            const response = await axios.delete(`/reviews`,{ data: { id } });

            return response.data;
        } catch (error) {
            console.error("Error in reviews service", error);
        }
    },
};

export default ReviewsService;