import api from './index'; 

export const postComment = async (comment) => {
  const response = await api.post('comments/', comment);
  return response.status;  // devuelve el código HTTP (por ejemplo, 201, 200, 400, etc)
}

export const getAllCommentsFromCook = async (id) => {
  const response = await api.get('comments/cook', id);
  console.log("response", response.data);
  return response.status;  // devuelve el código HTTP (por ejemplo, 201, 200, 400, etc)
}