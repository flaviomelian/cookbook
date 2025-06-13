import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.129:8080/api/', // Dirección base de la API en el servidor local.
    headers: { 'Content-Type': 'application/json' }
});

// Se exporta la instancia configurada de axios para que pueda ser utilizada en otros archivos.
export default api;