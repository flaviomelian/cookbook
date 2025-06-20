import api from './index'; // Se importa la instancia configurada de axios (api) para realizar las solicitudes HTTP.

export const getUser = async (id) => {
    const { data } = await api.get(`users/${id}`); // Realiza la solicitud GET a la API para obtener los usuarios.
    return data; // Devuelve los datos obtenidos de la API.
}

export const login = async (email, password) => {
    const res = await api.post(`users/login`, { email, password });
    console.log("response", res);  
    return res.data; // Devolver el token. 
}

export const signup = async (name, email, password, language, level) => {
    const {data} = await api.post(`users/signup`, { name, email, password, language, level });
    console.log("response", data);
    return data 
}

export const deleteUserAccount = async (id, token) => {
    const { data } = await api.delete(`users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}` // Se envía el token de autenticación en los encabezados.
        }
    });
    return data; // Devuelve la respuesta de la API después de eliminar la cuenta del usuario.
}

export const validatePassword = async (id, password, token) => {
    try {
        const { data } = await api.post(
            `users/${id}/validate-password`,
            { password },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data.valid === true;
    } catch (error) {
        console.error('Error validating password:', error);
        return false;
    }
};