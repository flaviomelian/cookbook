import api from './index'; // Se importa la instancia configurada de axios (api) para realizar las solicitudes HTTP.

export const getUser = async (id) => {
    const { data } = await api.get(`users/${id}`); // Realiza la solicitud GET a la API para obtener los usuarios.
    return data; // Devuelve los datos obtenidos de la API.
}

export const login = async (email, password) => {
    console.log("login", email, password);
    const res = await api.post(`users/login`, { email, password });
    console.log("response", res);  
    return res 
}

export const signup = async (username, email, password) => {
    const {data} = await api.post(`users/signup`, { username, email, password });
    console.log("response", data);
    return data 
}