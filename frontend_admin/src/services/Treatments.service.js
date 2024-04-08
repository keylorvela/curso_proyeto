
const BASE_URL = 'https://backend-proyeto.vercel.app/';

const UserService = {

  getTreatments: async () => {
    const url = BASE_URL+`treatments`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Request fail');
      }

      return response.json();
    } catch (error) {
      console.error('Function error getTreatments', error);
      throw error;
    }
  },

  updateTreatment: async (treatmentInfo) => {
  
    const url = BASE_URL + 'treatments'; 
    const data = {
      p_treatmentID: treatmentInfo.ID,
      p_name: treatmentInfo.Name,
      p_description: treatmentInfo.Description,
      p_price: treatmentInfo.Price,
      p_categoryID: 1,
    };
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if(response)
        return response;
  
    } catch (error) {
      console.error('Function error updateTreatment:', error);
      throw error;
    }
  },



};

export default UserService;
