require('dotenv').config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        logging: console.log,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión con la base de datos exitosa.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
})();

module.exports = { sequelize };
