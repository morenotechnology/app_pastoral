const { Sequelize } = require("sequelize");

// Crear instancia de Sequelize
const sequelize = new Sequelize("bd_p_app", "root", "Admin16.02", {
    host: "localhost",
    dialect: "mysql",
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

module.exports = { sequelize }; // Exportar correctamente
