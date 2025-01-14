const Pastor = require('../models/pastor');
const Church = require('../models/church');

exports.registerPastorAndChurch = async (req, res) => {
    const { pastorName, email, password, phone, yearsOfMinistry, district, churchName, address } = req.body;

    try {
        // Crear el pastor primero
        const newPastor = await Pastor.create({
            name: pastorName,
            email,
            password,
            phone,
            years_of_ministry: yearsOfMinistry,
            district
        });

        // Crear la iglesia con el id del pastor recién creado
        const newChurch = await Church.create({
            name: churchName,
            address,
            pastor_id: newPastor.id // Usamos el id del pastor creado
        });

        res.status(201).json({
            message: 'Pastor and Church registered successfully',
            pastor: newPastor,
            church: newChurch
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
        console.log(req.body); // Verificar los datos recibidos

    }
};
