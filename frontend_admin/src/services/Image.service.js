import axios from "./utilities/Axios.service"

const ImageService = {

    uploadImage: async (image) => {
        
        const apiUrl = 'https://api.imgbb.com/1/upload';
        const apiKey = 'b7c9e374a9217bb8eb2f3d9a2beeeaff'; 

        try {
            const base64Data = image.replace(/^[^,]+,/, '');
            const formData = new FormData();
            formData.append('image', base64Data);
            
            const response = await axios.post(`${apiUrl}?key=${apiKey}`,formData);

            return response.data;
        } catch (error) {
            console.error("Error uploading image", error);
            throw error;
        }
    },

};

export default ImageService;
