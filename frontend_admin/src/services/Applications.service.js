import axios from "./utilities/Axios.service"

const CourseService = {

    getApplications: async () => {
        try {
            const response = await axios.get(`/applications`);
            return response.data;
            
        } catch (error) {
            console.error("Error in course aplication", error);
        }
    },


    downloadPaymentReceipt: async (idApplication) => {
        try {
            const response = await axios.get(`/applications/file/${idApplication}`, {
                responseType: 'blob', // Indica a Axios que se espera una respuesta de tipo pdf
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `payment_receipt_${idApplication}.pdf`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
    
            return true;
        } catch (error) {
            console.error('Error fetching payment receipt:', error);
            return false;
        }
    },

    respondApplication: async (id, status) => {
        try {
            const response = await axios.put(`/applications`, {applicationID : id, status:status});
            return response.data;
            
        } catch (error) {
            console.error("Error in course aplication", error);
        }
    },

    
};

export default CourseService;