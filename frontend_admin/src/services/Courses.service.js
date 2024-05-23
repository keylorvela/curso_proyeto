import axios from "./utilities/Axios.service"

const CourseService = {
    GetCourseList: async () => {
        try {
            const response = await axios.get(`/courses`, { params: { limit: 1000, offset: 0 } });
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

    CreateCourse: async (Name, Description, Topics, Includes, Duration, Price, CourseImage, UserTarget,PayLink) => {
        try {
            const body = { Name, Description, Topics, Includes, Duration, Price, CourseImage, UserTarget,PayLink };
            const response = await axios.post(`/courses`, body);
            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    UpdateCourse: async (courseID, Name, Description, Topics, Includes, Duration, Price, CourseImage, UserTarget,PayLink) => {
        try {
            const body = { Name, Description, Topics, Includes, Duration, Price, CourseImage, UserTarget,PayLink };
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