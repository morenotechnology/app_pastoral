
import "./global.css"; // Importa el CSS global
import React from "react";
import ReactDOM from "react-dom/client"; // Importar createRoot
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Usar createRoot

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
