const Church = require('../models/church');
const Pastor = require('../models/pastor');

// Crear una nueva iglesia
exports.createChurch = async (req, res) => {
  try {
    const { name, address, pastor_id } = req.body;

    // Verificar si el pastor existe
    const pastor = await Pastor.findOne({ where: { id: pastor_id } });
    if (!pastor) {
      return res.status(404).json({ message: 'Pastor no encontrado' });
    }

    // Crear la iglesia
    const church = await Church.create({ name, address, pastor_id });
    res.status(201).json({ message: 'Iglesia creada exitosamente', church });
  } catch (error) {
    console.error('Error al crear la iglesia:', error);
    res.status(500).json({ message: 'Error al crear la iglesia', error: error.message });
  }
};

// Obtener todas las iglesias
exports.getAllChurches = async (req, res) => {
  try {
    const churches = await Church.findAll();
    console.log('Iglesias obtenidas:', churches); // Verificar que se obtienen las iglesias
    res.status(200).json(churches); // Enviar las iglesias como JSON
  } catch (error) {
    console.error('Error al obtener iglesias:', error);
    res.status(500).json({ message: 'Error al obtener iglesias', error: error.message });
  }
};

