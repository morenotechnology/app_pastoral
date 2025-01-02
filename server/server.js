const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes"); // Importa las rutas del login

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", userRoutes);
app.use("/api", loginRoutes); // Usa las rutas de login

// Sincronizar base de datos
sequelize.sync({ alter: true }).then(() => {
    console.log("Base de datos sincronizada");
}).catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en: http://localhost:${PORT}`));
