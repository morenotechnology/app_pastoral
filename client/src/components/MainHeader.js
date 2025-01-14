import React from "react";
import "./MainHeader.css";
import searchIcon from "../assets/icons/12.svg";

const MainHeader = ({ user }) => {
    return (
        <header className="MainHeader">
            <div className="welcome-message">
                <h1>Bienvenido, {user?.pastorName || "Invitado"}</h1>
                <p>{user?.churchName || "Sin iglesia asignada"}</p>
            </div>
            <div className="profile-info">
                <span>{user.pastorName}</span>
                <span className="role">Pastor</span>
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
