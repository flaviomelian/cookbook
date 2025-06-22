import api from './index'; // Se importa la instancia configurada de axios (api) para realizar las solicitudes HTTP.

export const getUser = async (id, token) => {
    const { data } = await api.get(`users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }); // Realiza la solicitud GET a la API para obtener los usuarios.
    return data; // Devuelve los datos obtenidos de la API.
}

export const login = async (email, password) => {
    const res = await api.post(`users/login`, { email, password });
    console.log("response", res);
    return res.data; // Devolver el token. 
}

export const signup = async (name, email, password, language, level) => {
    const { data } = await api.post(`users/signup`, { name, email, password, language, level });
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

export const logout = async (token) => {
    try {
        const { data } = await api.post(
            `users/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data; // Devuelve la respuesta de la API después de cerrar sesión.
    } catch (error) {
        console.error('Error during logout:', error);
        throw error; // Propaga el error para manejarlo en el lugar donde se llama a esta función.
    }
}

export const updateUser = async (id, name, email, password, language, level, token) => {
    const { data } = await api.put(
        `users/${id}`,
        { name, email, password, language, level },
        {
            headers: {
                Authorization: `Bearer ${token}` // Se envía el token de autenticación en los encabezados.
            }
        }
    );
    return data; // Devuelve los datos actualizados del usuario.
}

export const addToFavourite = async (userId, cookId, token) => {
    console.log("addToFavourite", userId, cookId, token);
    const res = api.post(`users/${userId}/add-favourite/${cookId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("response", res.status);
    return res.status; // Devuelve el código de estado HTTP (por ejemplo, 201, 200, 400, etc).
}

export const getFavourites = async (userId, token) => {
    console.log("getFavourites", 'userid', userId, token);
    const res = await api.get(`users/${userId}/favourites`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("response", res.data);
    return res.data; // Devuelve los datos de los favoritos del usuario.
}