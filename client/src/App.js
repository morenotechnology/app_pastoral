import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/login";
import Dashboard from "./views/Dashboard"; // Importa el Dashboard
import Encuesta  from "./views/Encuesta";   
import RegisterPastor from "./views/RegisterPastor";
import RegisterLeader from "./views/RegisterLeader";
import LeaderDashboard from "./views/LeaderDashboard";



const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta para el login */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />

                {/* Ruta para el registro */}
                <Route path="/register" element={<Register />} />

                {/* Ruta para el Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/encuesta" element={<Encuesta />} />
                <Route path="/registerPastor" element={<RegisterPastor />} />
                <Route path="/registerLeader" element={<RegisterLeader />} />
                <Route path="/leaderDashboard" element={<LeaderDashboard />} />

            </Routes>
        </Router>
    );
};

export default App;
