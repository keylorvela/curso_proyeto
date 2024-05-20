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

    GetTeacherInformation: async (userID) => {
        try {
            const response = await axios.get(`/teachers/${userID}`);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    UpdateTeacherInformation: async (personID, name, phoneNumber, email, photo) => {
        try {
            const body = { personID, photo, email, phoneNumber, name };
            const response = await axios.put(`/teachers`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    DeleteTeacher: async (userID) => {
        try {
            const response = await axios.delete(`/teachers`, { data: { userID } });
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },
};

export default TeachersService;