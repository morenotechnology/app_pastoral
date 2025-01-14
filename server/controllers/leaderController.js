// controllers/leaderController.js
const Leader = require('../models/leader');

exports.registerLeader = async (req, res) => {
    const { name, email, password, phone, committee, church_id } = req.body;

    try {
        // Verificar si la iglesia existe
        const churchExists = await Leader.sequelize.models.Church.findByPk(church_id);
        if (!churchExists) {
            return res.status(404).json({ message: 'Iglesia no encontrada' });
        }

        // Crear el líder
        const newLeader = await Leader.create({
            name,
            email,
            password,  // La contraseña se guarda tal cual sin encriptar
            phone,
            committee,
            church_id
        });

        res.status(201).json({ message: 'Líder registrado exitosamente', leader: newLeader });
    } catch (error) {
        console.error('Error al registrar líder:', error);
        res.status(500).json({ message: 'Error al registrar líder', error: error.message });
    }
};
