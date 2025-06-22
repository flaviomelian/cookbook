import api from './index'; // Se importa la instancia configurada de axios (api) para realizar las solicitudes HTTP.

export const getAllCooks = async (token) => {
  console.log("getAllCooks");
  const { data } = await api.get('cooks', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }); // Realiza la solicitud GET a la API para obtener los usuarios.
  console.log("response-getAllCooks", data);

  return data; // Devuelve los datos obtenidos de la API.
}

export const getCooksSortByRate = async (down) => {
  const { data } = await api.get(`cooks/sort/${down}`); // Realiza la solicitud GET a la API para obtener los usuarios.
  return data; // Devuelve los datos obtenidos de la API.
}

export const postCook = async (cook, token) => {
  const response = await api.post('cooks/', cook, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status;  // devuelve el código HTTP (por ejemplo, 201, 200, 400, etc)
}

export const updateCook = async (id, cook, token) => {
  const response = await api.put(`cooks/${id}`, cook, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status;  // devuelve el código HTTP (por ejemplo, 200, 400, etc)
}

export const deleteCook = async (id) => {
  try {
    const response = await api.delete(`cooks/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error('Error deleting cook:', error);
    throw error;
  }
}

export const getCooksFromUser = async (id, token) => {
  try {
    const res = await api.get(`cooks/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response-getCooksFromUser", res);
    return res.data;
  } catch (error) {
    console.error('Error deleting cook:', error);
    throw error;
  }
}

export const getRatedCooksFromUser = async (id, down) => {
  try {
    const { data } = await api.get(`cooks/user/${id}/${down}`);
    return data;
  } catch (error) {
    console.error('Error deleting cook:', error);
    throw error;
  }
}
