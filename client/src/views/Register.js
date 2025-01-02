import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Importar el Header
import "./Register.css";

const Register = () => {
  const [role, setRole] = useState(""); // Para determinar si es pastor o líder
  const [formData, setFormData] = useState({
    nombre_completo: "",
    celular: "",
    correo: "",
    documento_identidad: "",
    contraseña: "",
    confirmar_contraseña: "",
    congregacion_actual: "", // Será un `id` cuando sea líder
    distrito: "",
    años_de_ministerio: "",
    comite: "", // Solo para líderes
  });
  const [congregaciones, setCongregaciones] = useState([]); // Lista de congregaciones
  const [message, setMessage] = useState(""); // Mensaje de éxito o error
  const [errors, setErrors] = useState({}); // Errores de validación
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseñas

  const navigate = useNavigate(); // Inicializar useNavigate para redirección

  // Obtener congregaciones del backend
  useEffect(() => {
    if (role === "lider") {
      const fetchCongregaciones = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/congregaciones");
          const data = await response.json();
          if (response.ok) {
            setCongregaciones(data);
          } else {
            console.error("Error al obtener las congregaciones:", data.message);
          }
        } catch (error) {
          console.error("Error al realizar la solicitud:", error);
        }
      };
      fetchCongregaciones();
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = "El nombre completo es obligatorio.";
    }
    if (!formData.celular.trim()) {
      newErrors.celular = "El celular es obligatorio.";
    } else if (!/^\d{10}$/.test(formData.celular)) {
      newErrors.celular = "El celular debe tener 10 dígitos.";
    }
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El formato del correo no es válido.";
    }
    if (!formData.documento_identidad.trim()) {
      newErrors.documento_identidad = "El documento de identidad es obligatorio.";
    }
    if (!formData.contraseña.trim()) {
      newErrors.contraseña = "La contraseña es obligatoria.";
    } else if (formData.contraseña.length < 8) {
      newErrors.contraseña = "La contraseña debe tener al menos 8 caracteres.";
    }
    if (formData.contraseña !== formData.confirmar_contraseña) {
      newErrors.confirmar_contraseña = "Las contraseñas no coinciden.";
    }
    if (role === "lider" && !formData.congregacion_actual.trim()) {
      newErrors.congregacion_actual = "Debe seleccionar una congregación.";
    }
    if (role === "lider" && !formData.comite.trim()) {
      newErrors.comite = "El comité es obligatorio.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setMessage("Por favor corrige los errores.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("¡Usuario registrado con éxito!");
        setFormData({
          nombre_completo: "",
          celular: "",
          correo: "",
          documento_identidad: "",
          contraseña: "",
          confirmar_contraseña: "",
          congregacion_actual: "",
          distrito: "",
          años_de_ministerio: "",
          comite: "",
        });
        setErrors({});
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al registrar el usuario. Intenta nuevamente.");
    }
  };

  return (
    <div>
      <Header type="auth" />
      <div className="register-container">
        <h1 className="register-title">Registro</h1>
        {!role ? (
          <div className="role-selection">
            <button onClick={() => setRole("pastor")} className="role-button">
              Soy Pastor
            </button>
            <button onClick={() => setRole("lider")} className="role-button">
              Soy Líder
            </button>
          </div>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-section">
              <h2 className="register-subtitle">Información personal</h2>
              <input
                type="text"
                name="nombre_completo"
                placeholder="Nombre Completo"
                value={formData.nombre_completo}
                onChange={handleChange}
              />
              {errors.nombre_completo && <p className="error-message">{errors.nombre_completo}</p>}
              <input
                type="text"
                name="celular"
                placeholder="Celular"
                value={formData.celular}
                onChange={handleChange}
              />
              {errors.celular && <p className="error-message">{errors.celular}</p>}
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
              />
              {errors.correo && <p className="error-message">{errors.correo}</p>}
              <input
                type="text"
                name="documento_identidad"
                placeholder="Documento de identidad"
                value={formData.documento_identidad}
                onChange={handleChange}
              />
              {errors.documento_identidad && <p className="error-message">{errors.documento_identidad}</p>}
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="contraseña"
                  placeholder="Contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                />
              </div>
              {errors.contraseña && <p className="error-message">{errors.contraseña}</p>}
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmar_contraseña"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmar_contraseña}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmar_contraseña && <p className="error-message">{errors.confirmar_contraseña}</p>}
            </div>
            {role === "lider" && (
              <div className="register-section">
                <h2 className="register-subtitle">Seleccione su congregación</h2>
                <select
                  name="congregacion_actual"
                  value={formData.congregacion_actual}
                  onChange={handleChange}
                >
                  <option value="">Seleccione una congregación</option>
                  {congregaciones.map((congregacion) => (
                    <option key={congregacion.id} value={congregacion.id}>
                      {congregacion.name}
                    </option>
                  ))}
                </select>
                {errors.congregacion_actual && <p className="error-message">{errors.congregacion_actual}</p>}
                <input
                  type="text"
                  name="comite"
                  placeholder="Comité"
                  value={formData.comite}
                  onChange={handleChange}
                />
                {errors.comite && <p className="error-message">{errors.comite}</p>}
              </div>
            )}
            <div className="register-actions">
              <button type="submit" className="register-button">
                Registrarse
              </button>
            </div>
            <button className="back-button" onClick={() => setRole("")}>
              Volver
            </button>
          </form>
        )}
        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
