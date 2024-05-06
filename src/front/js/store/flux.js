import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Acción para registrar un nuevo usuario
            registerUser: async (email, password) => {
                try {
                    const response = await axios.post(`${process.env.BACKEND_URL}/signup`, { email, password });
                    // Manejar la respuesta del backend según sea necesario
                    return response.data; // Puedes retornar cualquier dato útil que necesites en otros componentes
                } catch (error) {
                    console.error('Error registering user:', error);
                    throw error; // Propagar el error para manejarlo en el componente que llama a esta acción
                }
            },

            // Acción para iniciar sesión
            loginUser: async (email, password) => {
                try {
                    const response = await axios.post(`${process.env.BACKEND_URL}/login`, { email, password });
                    // Manejar la respuesta del backend según sea necesario
                    return response.data; // Puedes retornar cualquier dato útil que necesites en otros componentes
                } catch (error) {
                    console.error('Error logging in:', error);
                    throw error; // Propagar el error para manejarlo en el componente que llama a esta acción
                }
            },

            // Acción para cerrar sesión
            logoutUser: () => {
                // Eliminar el token de sessionStorage
                sessionStorage.removeItem('token');
                // Actualizar el estado de la aplicación según sea necesario
                setStore({ user: null }); // Por ejemplo, podrías eliminar cualquier dato de usuario almacenado en el estado
            }
        }
    };
};

export default getState;