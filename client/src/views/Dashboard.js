import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Navbar global
import Header from "../components/MainHeader"; // Header global
import viewIcon from "../assets/icons/view.svg"; // Ícono de Ver todas
import sendIcon from "../assets/icons/send.svg"; // Ícono de Enviar todas
import printIcon from "../assets/icons/print.svg"; // Ícono de Imprimir
import shareIcon from "../assets/icons/share.svg"; // Ícono de Compartir
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.add("dashboard-body"); // Agregar clase específica al body
    return () => {
      document.body.classList.remove("dashboard-body"); // Eliminar la clase al desmontar
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-main">
        {/* Colocamos el Header como parte del contenido */}
        <div className="dashboard-header">
          <Header user={user} />
        </div>
        <div className="dashboard-content">
          <div className="columns-container">
            {/* Columna izquierda: Encuesta */}
            <div className="survey-container">
              <h2 className="section-title">Mi encuesta:</h2>
              {/* Primera tarjeta (Azul) */}
              <div className="survey-card primary-card">
                <h3>Total de respuestas:</h3>
                <div className="card-info">
                  <span className="responses">150</span>
                  <p>IPUC el diamante</p>
                  <span className="date">30/12/2024</span>
                </div>
              </div>
              {/* Segunda tarjeta (Fondo blanco) */}
              <div className="survey-card secondary-card">
                <span className="committee">Comité: Jóvenes</span>
                <h3>Área Espiritual</h3>
                <span className="score">3.5</span>
                <p>Daniel Moreno</p>
                <a href="#" className="link">
                  Enviar al Líder
                </a>
              </div>
              {/* Botones con íconos */}
              <div className="survey-buttons">
                <button className="btn">
                  <img src={viewIcon} alt="Ver todas" className="button-icon" />
                  Ver todas
                </button>
                <button className="btn primary">
                  <img
                    src={sendIcon}
                    alt="Enviar todas"
                    className="button-icon"
                  />
                  Enviar todas
                </button>
              </div>
            </div>

            {/* Columna derecha: Líderes */}
            <div className="leaders-container">
              <div className="leaders-header">
                <h2 className="section-title">Líderes</h2>
                <div className="actions">
                  <button className="btn">
                    <img src={printIcon} alt="Imprimir" />
                    Imprimir
                  </button>
                  <button className="btn">
                    <img src={shareIcon} alt="Compartir" />
                    Compartir
                  </button>
                </div>
              </div>

              <table className="leaders-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cargo</th>
                    <th>Comité</th>
                    <th>Edad</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(5)
                    .fill()
                    .map((_, index) => (
                      <tr key={index}>
                        <td>Samuel Moreno Mancera</td>
                        <td>Presidente</td>
                        <td>Alabanza</td>
                        <td>18</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <a href="#" className="view-more">
                Ver todos los líderes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
