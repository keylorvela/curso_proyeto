const BASE_URL = 'https://backend-proyeto.vercel.app/';

const StudentService = {
    GetStudentList: async (groupID) => {
        const url = BASE_URL + `students` + ((groupID === undefined) ? "" : "/group");
        try {
            // GET no puede tener body?
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: (groupID === undefined) ? {} : {"groupID": groupID}
            }
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Request fail');
            }

            return response.json();
        } catch (error) {
            console.error('Function error login', error);
            throw error;
        }
    }
};

export default StudentService;