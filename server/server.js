// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pastorRoutes = require('./routes/pastorRoutes');
const loginRoutes = require('./routes/loginRoutes'); 
const churchRoutes = require('./routes/churchRoutes');
const leaderRoutes = require('./routes/leaderRoutes');
const surveyRoutes = require('./routes/surveyRoutes'); // Importar surveyRoutes
const app = express();

// Configuración de CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Usa la URL del frontend desde .env
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());

// Registrar rutas
app.use('/api/pastors', pastorRoutes);
app.use('/api', loginRoutes);
app.use('/api/churches', churchRoutes);
app.use('/api/leaders', leaderRoutes);
app.use('/api/surveys', surveyRoutes); // Registrar surveyRoutes correctamente

const PORT = process.env.PORT || 3000; // Usa el puerto desde .env, o 3000 si no está definido
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
