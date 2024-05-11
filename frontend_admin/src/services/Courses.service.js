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
};

export default CourseService;