import axios from "axios";
import { api_key } from "./keys";

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        'api_key': api_key
    },
    headers:{
        'accept': 'application/json',
        'Content-Type' : 'application/json'
    }
})

export default tmdbApi