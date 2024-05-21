import axios from "./utilities/Axios.service"

const CategoriesService = {

    getCategories: async () => {
        try {
            const response = await axios.get(`/categories`);
            return response.data;
        } catch (error) {
            console.error("Error in group service", error);
        }
    },

    createCategory: async (CategoryName) => {
        try {
            const body = { CategoryName };
            const response = await axios.post(`/categories`, body);
            return response.data;
        } catch (error) {
            console.error("Error in group service", error);
        }
    },

    deleteCategory: async (categoryID) => {
        try {
            const response = await axios.delete(`/categories/${categoryID}`);
            return response.data;
        } catch (error) {
            console.error("Error in group service", error);
        }
    },

};

export default CategoriesService;
