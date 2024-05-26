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
    },

    OTP_RequestCode: async (requested_email) => {
        try {
            const body = { requested_email };
            const response = await axios.post(`/login/requestEmail`, body);
            return response.data;
        } catch (error) {
            console.error("Error in OTP request service", error);
        }
    },

    OTP_VerifyOTP: async (OTP) => {
        try {
            const body = { OTP };
            const response = await axios.post(`/login/verifyOTP`, body);
            return response.data;
        } catch (error) {
            console.error("Error in OTP verification service", error);
        }
    },

    OTP_UpdatePassword: async (UserID, OTP, Password) => {
        try {
            const body = { UserID, OTP, Password };
            const response = await axios.post(`/login/updatePasswordWithOTP`, body);
            return response.data;
        } catch (error) {
            console.error("Error in OTP verification service", error);
        }
    },
};

export default UserService;
