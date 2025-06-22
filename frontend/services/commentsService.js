import api from './index'; 

export const postComment = async (comment) => {
  console.log("postComment", comment)
  const response = await api.post('comments/', comment);
  console.log("response", response);
  return response.status;  // devuelve el código HTTP (por ejemplo, 201, 200, 400, etc)
}

export const getAllCommentsFromCook = async (id, token) => {
  console.log("getAllCommentsFromCook")
  const response = await api.get(`comments/cook/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log("response", response.data);
  return response;  // devuelve el código HTTP (por ejemplo, 201, 200, 400, etc)
}