import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"; // Importar el Header
import './RegisterLeader.css'; // Importar el CSS

function RegisterLeader() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        church_id: '',
        committee: ''
    });

    const [churches, setChurches] = useState([]); // Estado para almacenar las iglesias registradas
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChurches = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/churches');
                if (!response.ok) throw new Error('Error al cargar las iglesias');
                const data = await response.json();
                console.log('Iglesias recibidas:', data); // Verificar que llegan los datos
                setChurches(data); // Asignar las iglesias al estado
            } catch (error) {
                console.error('Error al obtener iglesias:', error);
                alert('Error al cargar las iglesias: ' + error.message); // Mostrar error al usuario
            }
        };
        fetchChurches();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos a enviar:', formData); // Verificar el contenido de formData
    
        try {
            const response = await fetch('http://localhost:3000/api/leaders/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) throw new Error('Error al registrar líder');
            const data = await response.json();
            alert('¡Líder registrado exitosamente!');
            navigate('/login');
        } catch (error) {
            console.error('Error durante el registro:', error);
            alert('Error durante el registro: ' + error.message);
        }
    };
    
    
    
    

    return (
        <div>
            <Header />
            <div className="register-leader-container">
                <h1 className="register-title">Registro de Líder</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div>
                        <h2 className="section-title">Información Personal</h2>
                        <input
                            name="name"
                            placeholder="Nombre del Líder"
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
                    </div>

                    <div>
                        <h2 className="section-title">Información de la Iglesia</h2>
                        <select
                            name="church_id"
                            value={formData.church_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione una Iglesia</option>
                            {churches.map((church) => (
                                <option key={church.id} value={church.id}>
                                    {church.name}
                                </option>
                            ))}
                        </select>
                        <input
                            name="committee"
                            placeholder="Comité"
                            value={formData.committee}
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

export default RegisterLeader;
