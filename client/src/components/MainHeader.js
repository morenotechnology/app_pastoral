import React from "react";
import "./MainHeader.css";
import searchIcon from "../assets/icons/12.svg";

const MainHeader = ({ user }) => {
    return (
        <header className="MainHeader">
            <div className="welcome-message">
                <h1>Bienvenido, {user?.nombre_completo || "Invitado"}</h1>

                <p>Herramienta de administración ministerial</p>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Buscar líder" />
                <img src={searchIcon} alt="Search Icon" className="search-icon" />
            </div>
            <div className="profile-info">
                <span>{user.nombre_completo}</span>
                <span className="role">{user.role || "Usuario"}</span>
                <img
                    className="avatar"
                    src="https://via.placeholder.com/40"
                    alt="Avatar"
                />
            </div>
        </header>
    );
};

export default MainHeader;
