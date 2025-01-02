const { Sequelize } = require("sequelize");

// Crear instancia de Sequelize
const sequelize = new Sequelize("bd_app_pastoral", "root", "Admin16.02", {
    host: "localhost", // Cambia esto si estás usando un hosting remoto
    dialect: "mysql",  // Usamos MySQL como base de datos
    logging: console.log,
});

// Probar conexión
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión con la base de datos exitosa.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
})();

module.exports = sequelize;
