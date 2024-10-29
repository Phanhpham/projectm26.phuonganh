import axios from "axios"

export const getAllProduct =async ()=>{
    const allProduct=await axios.get("http://localhost:8080/products");
    return allProduct.data;
}

export const getDetailProduct =async (id) => {
    const response =await axios.get(` http://localhost:8080/products/${id}`);
    return response.data

}

export const searchProduct = async (name)=>{
    const response =await axios.get(`http://localhost:8080/products?name_like=${name}`);
    return response.data
}
export const sortProduct = async (name) => {
    const response = await axios.get(`http://localhost:8080/products?_sort=name&_order=${name}`)
    return response.data
}
export const sortProductPrice = async (price) => {
    const response=await axios.get(`http://localhost:8080/products?_sort=price&_order=${price}`)
    return response.data
}