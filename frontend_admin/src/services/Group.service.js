import axios from "./utilities/Axios.service"

const GroupService = {
    GetGroupList: async (courseID) => {
        try {
            const response = await axios.get(`/group/${courseID}`);
            return response.data;
        } catch (error) {
            console.error("Error in group service", error);
        }
    },

    GetGroupInformation: async (groupID) => {
        try {
            const response = await axios.get(`/group/information/${groupID}`);
            return response.data;
        } catch (error) {
            console.error("Error in group service", error);
        }
    },

    GetEnrolledGroups: async (userID) => {
        try {
            const response = await axios.get(`/group/enrolled/${userID}`);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    DropOutGroup: async (userID, groupID) => {
        try {
            const body = { userID, groupID };
            const response = await axios.post(`/group/drop-out`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    GetGroupsInACourse: async (courseID) => {
        try {
            const response = await axios.get(`/group/${courseID}`);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    CreateGroup: async (StartingDate, ScheduleDate, ScheduleHour, Capacity, CourseID, TeacherID) => {
        try {
            const body = { StartingDate, ScheduleDate, ScheduleHour, Capacity, CourseID, TeacherID }
            const response = await axios.post(`/group`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },
};

export default GroupService;