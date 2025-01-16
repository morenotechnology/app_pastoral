const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Pastor = require("../models/Pastor");
const Leader = require("../models/Leader");

// Clave secreta para JWT
const JWT_SECRET = "tu_clave_secreta_super_segura"; // Cambia esto a un valor más seguro en producción

// Autenticar usuario (Pastor o Líder)
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    // Verificar el rol y buscar el usuario correspondiente
    if (role === "pastor") {
      user = await Pastor.findOne({ where: { email } });
    } else if (role === "leader") {
      user = await Leader.findOne({ where: { email } });
    } else {
      return res.status(400).json({ message: "Rol inválido" });
    }

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, role },
      JWT_SECRET,
      { expiresIn: "1d" } // Token válido por 1 día
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.error("Error al autenticar:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Verificar token JWT
exports.verifyToken = (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Token válido", decoded });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Registro de usuario (Pastor o Líder)
exports.register = async (req, res) => {
  const { name, email, password, role, ...rest } = req.body;

  try {
    // Validar rol
    if (role !== "pastor" && role !== "leader") {
      return res.status(400).json({ message: "Rol inválido" });
    }

    // Verificar si el correo ya está registrado
    const existingUser =
      role === "pastor"
        ? await Pastor.findOne({ where: { email } })
        : await Leader.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser =
      role === "pastor"
        ? await Pastor.create({ name, email, password: hashedPassword, ...rest })
        : await Leader.create({
            name,
            email,
            password: hashedPassword,
            ...rest,
          });

    res.status(201).json({ message: "Usuario registrado con éxito", newUser });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error del servidor", error });
  }
};
