import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <h2>Página Privada</h2>
            <p>¡Bienvenido! Esta es una página privada.</p>
            <p>Si no has iniciado sesión, puedes hacerlo <Link to="/login">aquí</Link>.</p> 
        </div>
    );
};

export default Private;





