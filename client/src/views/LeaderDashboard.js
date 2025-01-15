import React, { useState, useEffect } from 'react';
import './LeaderDashboard.css';

function LeaderDashboard() {
    const [leaderName, setLeaderName] = useState(''); // Inicializado vacío
    const [committeeName, setCommitteeName] = useState(''); // Inicializado vacío
    const [leaderId, setLeaderId] = useState(null); // Guardar el ID del líder
    const [linkGenerated, setLinkGenerated] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Para mostrar mensajes de error

    useEffect(() => {
        const fetchLeaderData = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del localStorage
                const response = await fetch('http://localhost:3000/api/leaders/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos del líder');
                }

                const data = await response.json();
                setLeaderName(data.name);
                setLeaderId(data.id);
                setCommitteeName(data.committee);
            } catch (error) {
                console.error('Error al obtener datos del líder:', error);
                setErrorMessage('No se pudo cargar la información del líder.');
            }
        };

        fetchLeaderData();
    }, []);

    const handleGenerateLink = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/leaders/generate-link', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Error al generar el enlace');
            }
    
            const data = await response.json();
            setGeneratedLink(data.link);
            setLinkGenerated(true);
        } catch (error) {
            console.error('Error al generar el enlace:', error);
            alert('No se pudo generar el enlace');
        }
    };
    
    const handleCopyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        alert('¡Enlace copiado al portapapeles!');
    };

    return (
        <div className="leader-dashboard">
            <header className="leader-dashboard-header">
                <div className="header-left">
                    <h1>Bienvenido, <span>{leaderName}</span></h1>
                    <p>Herramienta de administración ministerial</p>
                </div>
                <div className="header-right">
                    <span>{committeeName}</span>
                </div>
            </header>

            <div className="dashboard-content">
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <h2>Mi encuesta</h2>
                <div className="generate-link-section">
                    <button onClick={handleGenerateLink}>Generar enlace</button>
                    {linkGenerated && (
                        <div className="link-display">
                            <input type="text" value={generatedLink} readOnly />
                            <button onClick={handleCopyLink}>Copiar</button>
                        </div>
                    )}
                </div>

                <div className="download-section">
                    <h3>Descargar resultados</h3>
                    <p>Formato: .xls</p>
                    <button>Descargar</button>
                </div>
            </div>
        </div>
    );
}

export default LeaderDashboard;
