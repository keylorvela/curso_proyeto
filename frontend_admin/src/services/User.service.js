
const BASE_URL = 'https://backend-proyeto.vercel.app/';

const UserService = {

  login: async (email,pass) => {
    const url = BASE_URL+`treatments`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Request fail');
      }

      return response.json();
    } catch (error) {
      console.error('Function error login', error);
      throw error;
    }
  },
};

export default UserService;
