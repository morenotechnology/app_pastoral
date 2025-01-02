import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Importa el Header desde components
import "./login.css"; // Archivo CSS encapsulado para Login

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // Mensaje de error
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: email, contraseña: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.message || "Credenciales incorrectas.");
                return;
            }

            const data = await response.json();

            // Verifica si `data.user` existe
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user)); // Guarda el usuario en localStorage
                navigate("/dashboard"); // Redirige al Dashboard
            } else {
                setMessage("Error: La respuesta del servidor no contiene datos del usuario.");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setMessage("Ocurrió un error al iniciar sesión. Intenta nuevamente.");
        }
    };

    return (
        <div className="login-page">
            {/* Header General */}
            <Header />
            <div className="login-wrapper">
                <div className="login-container">
                    <h1 className="login-title">Iniciar Sesión</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Usuario o correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="login-button">
                            Iniciar sesión
                        </button>
                    </form>
                    {message && <p className="login-message">{message}</p>}
                    <a href="#" className="login-link">Registrarse</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
