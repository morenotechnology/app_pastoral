import React, { useState } from "react";
import Navbar from "../components/Navbar"; // Navbar global
import Header from "../components/MainHeader"; // Header global
import "./Encuesta.css";

const Encuesta = () => {
  const [link, setLink] = useState("https://apppastoral...");

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Enlace copiado al portapapeles.");
  };

  return (
    <div className="encuesta-layout">
      <Navbar />
      <div className="encuesta-main">
        <Header user={{ name: "Samuel Moreno", role: "Admin" }} />
        <div className="encuesta-content">
          <div className="section-title">Mi encuesta</div>

          {/* Generar enlace */}
          <div className="card generate-link-card">
            <div className="card-title">Generar enlace</div>
            <div className="link-container">
              <input
                type="text"
                value={link}
                readOnly
                className="link-input"
              />
              <button onClick={handleCopy} className="copy-button">
                Copiar
              </button>
            </div>
          </div>

          {/* Descargar resultados */}
          <div className="card download-results-card">
            <div className="card-title">Descargar resultados</div>
            <p>Formato: xls</p>
            <p>Excel</p>
            <button className="download-button">Descargar</button>
          </div>

          {/* Enviar al Líder */}
          <div className="send-leader">
            <a href="#" className="send-leader-link">
              Enviar al Líder
            </a>
            <p>Daniel Moreno</p>
          </div>

          {/* Botones de acción */}
          <div className="action-buttons">
            <button className="btn view-all">
              <img src="/icons/view.svg" alt="Ver todas" /> Ver todas
            </button>
            <button className="btn send-all">
              <img src="/icons/send.svg" alt="Enviar todas" /> Enviar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encuesta;
