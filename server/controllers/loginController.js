const Pastor = require('../models/pastor');
const Leader = require('../models/leader');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario en la tabla de pastores
        let user = await Pastor.findOne({ where: { email } });
        let role = 'pastor';

        // Si no es un pastor, buscarlo en la tabla de líderes
        if (!user) {
            user = await Leader.findOne({ where: { email } });
            role = 'leader';
        }

        // Si no se encuentra el usuario en ninguna tabla
        if (!user) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Verificar la contraseña
        if (user.password !== password) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Responder con un mensaje de éxito y el rol del usuario
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            role
        });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Datos recibidos:', email, password);

  try {
      let user = await Pastor.findOne({ where: { email } });
      let role = 'pastor';

      if (!user) {
          user = await Leader.findOne({ where: { email } });
          role = 'leader';
      }

      if (!user) {
          console.log('Usuario no encontrado');
          return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }

      if (user.password !== password) {
          console.log('Contraseña incorrecta');
          return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }

      console.log('Inicio de sesión exitoso:', role);
      res.status(200).json({
          message: 'Inicio de sesión exitoso',
          role
      });
  } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};
