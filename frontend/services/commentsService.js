import api from './index'; 

export const postComment = async (comment) => {
  const response = await api.post('comments/', comment);
  console.log("response", response);
  return response.status;  // devuelve el código HTTP (por ejemplo, 201, 200, 400, etc)
}

export const getAllCommentsFromCook = async (id) => {
  console.log("getAllCommentsFromCook")
  const response = await api.get(`comments/cook/${id}`);
  console.log("response", response.data);
  return response;  // devuelve el código HTTP (por ejemplo, 201, 200, 400, etc)
}