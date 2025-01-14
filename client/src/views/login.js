import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"; // Importar el Header
import './login.css'; // Importar el CSS

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('login-body');
        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }

            const data = await response.json();

            if (data.role === 'pastor') {
                navigate('/pastorDashboard');
            } else if (data.role === 'leader') {
                navigate('/leaderDashboard');
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            setErrorMessage('Correo o contraseña incorrectos');
        }
    };

    return (
        <div>
            <Header />
            <div className="login-container">
                <h2 className="login-title">Iniciar Sesión</h2>
                <div className="login-box">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Usuario o correo"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" className="login-button">Iniciar sesión</button>
                    </form>
                    <button
                        className="register-link"
                        onClick={() => navigate('/register')}
                    >
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
