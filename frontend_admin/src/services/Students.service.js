import axios from "./utilities/Axios.service"

const BASE_URL = 'https://backend-proyeto.vercel.app/';

const StudentService = {
    GetStudentList: async (groupID) => {
        const url = BASE_URL + `students` + ((groupID === undefined) ? "" : "/group");
        try {
            // GET no puede tener body?
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: (groupID === undefined) ? {} : {"groupID": groupID}
            }
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Request fail');
            }

            return response.json();
        } catch (error) {
            console.error('Function error login', error);
            throw error;
        }
    },

    GetStudentsFromGroup: async (groupID) => {
        try {
            const params = { groupID };
            const response = await axios.get(`students/group`, { params });
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    GetStudentsInformation: async (userID) => {
        try {
            const params = { userID };
            const response = await axios.get(`user`, { params });
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    UpdateStudentInformation: async (personID, name, phoneNumber, email, photo) => {
        try {
            const body = { personID, photo, email, phoneNumber, name };
            const response = await axios.put(`/students`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },
};

export default StudentService;