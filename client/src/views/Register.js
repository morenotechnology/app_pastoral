import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"; // Importar el Header
import './Register.css'; // Importar estilos

function Register() {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="register-container">
                <h1 className="register-title">¡Registrate!</h1>
                <div className="button-container">
                    <button
                        className="register-button pastor-button"
                        onClick={() => navigate('/registerPastor')}
                    >
                        Soy Pastor
                    </button>
                    <button
                        className="register-button leader-button"
                        onClick={() => navigate('/registerLeader')}
                    >
                        Soy Líder
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
