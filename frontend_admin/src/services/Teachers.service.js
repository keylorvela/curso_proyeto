import axios from "./utilities/Axios.service"

const TeachersService = {
    GetTeachersList: async () => {
        try {
            const response = await axios.get(`/teachers`);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    GetTeacherInfo: async (userID) => {
        try {
            const response = await axios.get(`/teachers/${userID}`);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    }
};

export default TeachersService;