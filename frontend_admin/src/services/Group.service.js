import axios from "./utilities/Axios.service"

const GroupService = {
    GetGroupList: async (courseID) => {
        try {
            const response = await axios.get(`/group/${courseID}`);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },
};

export default GroupService;