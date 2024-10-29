import axios from "axios"

export const getCategory = async () => {
    const response = await axios.get(`http://localhost:8080/categories`);
    return response.data
}