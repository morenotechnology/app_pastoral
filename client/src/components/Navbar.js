import React from "react";
import "./Navbar.css"; // Archivo CSS para estilos
import dashboardIcon from "../assets/icons/1.svg";
import surveyIcon from "../assets/icons/2.svg";
import leadersIcon from "../assets/icons/3.svg";
import workPlanIcon from "../assets/icons/4.svg";
import calendarIcon from "../assets/icons/5.svg";
import accountIcon from "../assets/icons/6.svg";
import cardIcon from "../assets/icons/7.svg";
import settingsIcon from "../assets/icons/8.svg";
import callCenterIcon from "../assets/icons/9.svg";
import helpIcon from "../assets/icons/10.svg";
import logoutIcon from "../assets/icons/11.svg";

const Navbar = () => {
  return (
    <aside className="navbar">
      {/* Logo de la aplicación */}
      <div className="navbar-logo">
        <span className="logo-app">App</span>
        <span className="logo-pastoral">Pastoral</span>
      </div>

      {/* Menú */}
      <ul className="navbar-menu">
        <li className="navbar-item active">
          <img src={dashboardIcon} alt="Dashboard Icon" className="navbar-icon" />
          <span className="navbar-text">Dashboard</span>
        </li>
        <li className="navbar-item">
          <img src={surveyIcon} alt="Survey Icon" className="navbar-icon" />
          <span className="navbar-text">Encuesta</span>
        </li>
        <li className="navbar-item">
          <img src={leadersIcon} alt="Leaders Icon" className="navbar-icon" />
          <span className="navbar-text">Líderes</span>
        </li>
        <li className="navbar-item">
          <img src={workPlanIcon} alt="Work Plan Icon" className="navbar-icon" />
          <span className="navbar-text">Plan de trabajo</span>
        </li>
        <li className="navbar-item">
          <img src={calendarIcon} alt="Calendar Icon" className="navbar-icon" />
          <span className="navbar-text">Calendario</span>
        </li>
        <hr className="navbar-divider" />
        <li className="navbar-item">
          <img src={accountIcon} alt="Account Icon" className="navbar-icon" />
          <span className="navbar-text">Account</span>
        </li>
        <li className="navbar-item">
          <img src={cardIcon} alt="Card Icon" className="navbar-icon" />
          <span className="navbar-text">My Card</span>
        </li>
        <li className="navbar-item">
          <img src={settingsIcon} alt="Settings Icon" className="navbar-icon" />
          <span className="navbar-text">Settings</span>
        </li>
        <hr className="navbar-divider" />
        <li className="navbar-item">
          <img src={callCenterIcon} alt="Call Center Icon" className="navbar-icon" />
          <span className="navbar-text">Call Center</span>
        </li>
        <li className="navbar-item">
          <img src={helpIcon} alt="Help Icon" className="navbar-icon" />
          <span className="navbar-text">Help</span>
        </li>
        <li className="navbar-item">
          <img src={logoutIcon} alt="Logout Icon" className="navbar-icon" />
          <span className="navbar-text">Log Out</span>
        </li>
      </ul>
    </aside>
  );
};

export default Navbar;
