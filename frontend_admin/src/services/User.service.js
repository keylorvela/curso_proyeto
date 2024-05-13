import axios from "./utilities/Axios.service"

const BASE_URL = 'https://backend-proyeto.vercel.app/';

const UserService = {
    login: async (email, pass) => {
        const url = BASE_URL + `treatments`;
        try {
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

    ChangePassword: async (userID, oldPassword, newPassword) => {
        try {
            const body = {
                p_userID: userID,
                p_oldPassword: oldPassword,
                p_newPassword: newPassword
            };
            const response = await axios.post(`/login/changePassword`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    }
};

export default UserService;
