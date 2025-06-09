import api from './index'; // Se importa la instancia configurada de axios (api) para realizar las solicitudes HTTP.

export const getAllCooks = async () => {
    const { data } = await api.get('cooks/'); // Realiza la solicitud GET a la API para obtener los usuarios.
    return data; // Devuelve los datos obtenidos de la API.
}

export const postCook = async (cook) => {
    const response = await api.post('cooks/', cook);
    return response.status;  // devuelve el código HTTP (por ejemplo, 201, 200, 400, etc)
}

export const updateCook = async (id, cook) => {
    const response = await api.put(`cooks/${id}`, cook);
    return response.status;  // devuelve el código HTTP (por ejemplo, 200, 400, etc)
}

export const deleteCook = async (id) => {
    try {
    console.log(`Deleting cook with ID: ${id}`);
    const response = await api.delete(`cooks/${id}`);
    console.log('Delete response status:', response.status);
    return response.status;
  } catch (error) {
    console.error('Error deleting cook:', error);
    throw error;
  }
}