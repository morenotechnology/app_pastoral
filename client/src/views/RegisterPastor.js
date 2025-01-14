import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"; // Importar el Header
import './RegisterPastor.css'; // Importar el CSS

function RegisterPastor() {
    const [formData, setFormData] = useState({
        pastorName: '',
        email: '',
        password: '',
        phone: '',
        yearsOfMinistry: '',
        district: '',
        churchName: '',
        address: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('register-pastor-body'); // Agregar clase específica al body
        return () => {
            document.body.classList.remove('register-pastor-body'); // Eliminar la clase al desmontar
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/pastors/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Error al registrar');
            const data = await response.json();
            alert('¡Registro exitoso!');
            navigate('/login');
        } catch (error) {
            console.error('Error durante el registro:', error);
            alert('Hubo un error al registrar.');
        }
    };

    return (
        <div>
            <Header />
            <div className="register-container">
                <h1 className="register-title">Registro de Pastor e Iglesia</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div>
                        <h2 className="section-title">Información Personal</h2>
                        <input
                            name="pastorName"
                            placeholder="Nombre del Pastor"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="phone"
                            placeholder="Teléfono"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="yearsOfMinistry"
                            type="number"
                            placeholder="Años de Ministerio"
                            value={formData.yearsOfMinistry}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="district"
                            placeholder="Distrito"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <h2 className="section-title">Información de la Iglesia</h2>
                        <input
                            name="churchName"
                            placeholder="Nombre de la Iglesia"
                            value={formData.churchName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="address"
                            placeholder="Dirección de la Iglesia"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="register-button">Registrar</button>
                </form>
                <button
                    className="login-button"
                    onClick={() => navigate('/login')}
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}

export default RegisterPastor;
