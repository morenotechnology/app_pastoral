import React, { useState, useEffect } from 'react';
import './LeaderDashboard.css';

function LeaderDashboard() {
    const [leaderName, setLeaderName] = useState('Daniel Moreno'); // Nombre dinámico del líder
    const [committeeName, setCommitteeName] = useState('Comité de Jóvenes'); // Nombre dinámico del comité
    const [linkGenerated, setLinkGenerated] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');

    const handleGenerateLink = () => {
        const link = `https://appPastoral.com/survey/${Date.now()}`;
        setGeneratedLink(link);
        setLinkGenerated(true);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        alert('¡Enlace copiado al portapapeles!');
    };

    const handleDownloadResults = () => {
        alert('Descargando resultados en formato XLS...');
    };

    return (
        <div className="leader-dashboard-page">
            <header className="dashboard-header">
                <h1 className="app-title">Bienvenido, <span className="leader-name">{leaderName}</span></h1>
                <p className="subtitle">Herramienta de administración ministerial</p>
                <div className="header-right">
                    <span className="committee-name">{committeeName}</span>
                </div>
            </header>

            <div className="leader-dashboard-container">
                <h2 className="section-title">Mi Encuesta</h2>

                <div className="generate-link-section">
                    <button className="generate-link-button" onClick={handleGenerateLink}>
                        Generar enlace
                    </button>

                    {linkGenerated && (
                        <div className="link-container">
                            <input
                                type="text"
                                value={generatedLink}
                                readOnly
                                className="generated-link-input"
                            />
                            <button className="copy-link-button" onClick={handleCopyLink}>
                                Copiar
                            </button>
                        </div>
                    )}
                </div>

                <div className="download-section">
                    <h2>Descargar resultados</h2>
                    <p>Formato: .xls</p>
                    <button className="download-button" onClick={handleDownloadResults}>
                        Descargar
                    </button>
                </div>

                <div className="leader-info-section">
                    <p><strong>Nombre del líder:</strong> {leaderName}</p>
                    <div className="action-buttons">
                        <button className="view-all-button">Ver todas</button>
                        <button className="send-all-button">Enviar todas</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeaderDashboard;
