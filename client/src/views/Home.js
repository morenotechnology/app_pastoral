import React, { useState } from 'react';
import './Home.css'; // Importar los estilos
import Header from '../components/Header'; // Importar el header

function Home() {
    const [link, setLink] = useState('https://apppastoral.com/encuesta/');
    const [copied, setCopied] = useState(false);

    const generateLink = () => {
        const uniqueLink = `${link}${Math.random().toString(36).substring(2, 8)}`;
        setLink(uniqueLink);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
    };

    const downloadExcel = () => {
        alert('Descargando archivo Excel...');
    };

    return (
        <div className="home-page">
            <Header />
            <div className="home-container">
                <h1 className="home-title">Mi encuesta</h1>

                <div className="link-generator">
                    <button onClick={generateLink} className="generate-button">
                        Generar enlace
                    </button>
                    <div className="link-box">
                        <input type="text" value={link} readOnly />
                        <button onClick={copyToClipboard} className="copy-button">
                            {copied ? 'Copiado' : 'Copiar'}
                        </button>
                    </div>
                </div>

                <div className="download-section">
                    <h2>Descargar resultados</h2>
                    <p>Formato: .xls</p>
                    <button onClick={downloadExcel} className="download-button">
                        Descargar
                    </button>
                </div>

                <div className="actions-section">
                    <button className="view-button">Ver todas</button>
                    <button className="send-button">Enviar todas</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
