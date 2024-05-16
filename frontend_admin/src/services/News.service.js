import axios from "./utilities/Axios.service"

const NewsService = {
    GetNewsList: async (groupID) => {
        try {
            const params = { groupID }
            const response = await axios.get(`/news`, { params });

            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    PostNews: async (groupID, title, content) => {
        try {
            const body = { groupID, title, content }
            const response = await axios.post(`/news`, body);

            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },

    RemoveNews: async (newsID) => {
        try {
            const response = await axios.delete(`/news/${newsID}`);

            return response.data;
        } catch (error) {
            console.error("Error in course service", error);
        }
    },
};

export default NewsService;