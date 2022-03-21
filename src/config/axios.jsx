import axios from 'axios';

const clienteAxios = axios.create({
    //import.meta.env.VITE_BACKEND_URL la forma de leer variables de entorno en VITE
    //axios crea una url de base para no estar repitiendo codigo
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export default clienteAxios;