import axios from 'axios'

let apiUrl = 'https://api.themoviedb.org/'

const api = axios.create({
    baseURL: apiUrl, // base url
    headers: {
        "Content-Type": "application/json",
    },    
});

export { api }