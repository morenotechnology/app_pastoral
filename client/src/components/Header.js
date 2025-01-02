import React from "react";
import "./Header.css"; // Importar los estilos actualizados

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <h1 className="header-title">
                    <span className="header-app">App</span>
                    <span className="header-pastoral">Pastoral</span>
                </h1>
            </div>
        </header>
    );
};

export default Header;
