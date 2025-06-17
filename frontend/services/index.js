import axios from 'axios';
import {BASE_URL} from '@env'

const api = axios.create({
    baseURL: BASE_URL, // Dirección base de la API en el servidor.
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

// Se exporta la instancia configurada de axios para que pueda ser utilizada en otros archivos.
export default api;