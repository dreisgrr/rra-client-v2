import axios from "axios"

const serverMode = false;
const localhost = 'http://localhost:8800/api';
const production = 'https://teamcgs.io/api'

const requestUrl = axios.create({
    baseURL: (serverMode ? production : localhost),
    headers: {
        'Content-Type': 'application/json',
    },
})

export default requestUrl