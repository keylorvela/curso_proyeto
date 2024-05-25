import axios from "./utilities/Axios.service"


const UserService = {
    login: async (email, pass) => {
        try {
            const body = {
                p_username: email,
                p_password: pass
            };
            const response = await axios.post(`/login`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
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
    },

    RegisterUser: async (p_name, p_email, p_phone_number, p_photo, p_username, p_password, p_type) => {
        try {
            const body = { p_name, p_email, p_phone_number, p_photo, p_username, p_password, p_type };
            const response = await axios.post(`/register`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    }
};

export default UserService;
