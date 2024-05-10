import axios from "axios"

const instance = axios.create({
    baseURL: "https://backend-proyeto.vercel.app/"
});

export default instance;