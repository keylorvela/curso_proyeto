import axios from "./utilities/Axios.service"

const CourseService = {
    GetCourseList: async () => {
        try {
            const response = await axios.get(`/courses`);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    GetCourseInfo: async (courseID) => {
        try {
            const response = await axios.get(`/courses/${courseID}`);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    CreateCourse: async (Name, Description, Topics, Includes, Duration, Price, Photos, UserTarget) => {
        try {
            const body = { Name, Description, Topics, Includes, Duration, Price, Photos, UserTarget };
            const response = await axios.post(`/courses`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    UpdateCourse: async (courseID, Name, Description, Topics, Includes, Duration, Price, Photos, UserTarget) => {
        try {
            const body = { Name, Description, Topics, Includes, Duration, Price, Photos, UserTarget };
            const response = await axios.put(`/courses/${courseID}`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    DeleteCourse: async (courseID) => {
        try {
            const response = await axios.delete(`/courses/${courseID}`);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },
};

export default CourseService;