import api from './index'; // Se importa la instancia configurada de axios (api) para realizar las solicitudes HTTP.

export const getAllCategories = async () => {
    const { data } = await api.get('categories/'); // Realiza la solicitud GET a la API para obtener los usuarios.
    return data; // Devuelve los datos obtenidos de la API.
}

export const postCategory = async (category) => {
  const response = await api.post('categories/', category); // axios ya hace el stringify y setea headers
  return response.data; // axios pone la respuesta en data
}

