
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

  getTreatment: async (id) => {
    const url = BASE_URL+`treatments/`+id;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Request fail');
      }

      return response.json();
    } catch (error) {
      console.error('Function error getTreatment', error);
      throw error;
    }
  },

  updateTreatment: async (treatmentInfo,imageUrl) => {
  
    const url = BASE_URL + 'treatments'; 
    const data = {
      p_treatmentID: treatmentInfo.ID,
      p_name: treatmentInfo.Name,
      p_description: treatmentInfo.Description,
      p_price: treatmentInfo.Price,
      p_includes: treatmentInfo.Includes,
      p_procedureDuration: treatmentInfo.ProcedureDuration,
      p_effectDuration: treatmentInfo.EffectDuration,
      p_information: treatmentInfo.Information,
      p_photos: [{imageID:1,url:imageUrl}],
      p_categoryID: 1,
    };
    console.log(data)
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
