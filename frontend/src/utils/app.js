import axios from "axios";

const API = axios.create({
    baseURL: "https://brain-bank-backend.onrender.com/api"
})

export const fetchThoughts = (query) => API.get(`thoughts`, { params: query })
export const fetchThughtsById = (id) => API.get(`thoughts/${id}`)
export const fetchThughtStatistics = () => API.get(`thoughts/statistics`)
export const fetchThughtStat = () => API.get(`thoughts/stat`)
export const fetchFavoritesThught = () => API.get(`thoughts/favoritethought`)
export const createThoughts = (thoughtData) => API.post(`thoughts/`, thoughtData)
export const deleteThughts = (id) => API.delete(`thoughts/${id}`)
export const updateThughts = (id, thoughtData) => API.put(`thoughts/${id}`, thoughtData)

export const favoriteTagole = (id) => API.patch(`thoughts/${id}`)
