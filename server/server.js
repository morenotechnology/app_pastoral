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
    origin: 'http://145.223.92.106:3001', // Puerto donde corre tu frontend
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
