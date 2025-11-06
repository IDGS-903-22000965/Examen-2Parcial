import { useState } from "react";
import { useNavigate } from "react-router-dom";
import participantesService from "../services/participantesService";

function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    usuarioTwitter: "",
    ocupacion: "",
    avatar: "",
    aceptaTerminos: false,
  });

  const [imagenPreview, setImagenPreview] = useState(null);
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errores[name]) {
      setErrores({ ...errores, [name]: "" });
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrores({ ...errores, avatar: "El archivo debe ser una imagen" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrores({ ...errores, avatar: "La imagen no debe superar 5MB" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, avatar: base64String });
        setImagenPreview(base64String);
        setErrores({ ...errores, avatar: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.nombre.trim())
      nuevosErrores.nombre = "El nombre es requerido";
    if (!formData.apellidos.trim())
      nuevosErrores.apellidos = "Los apellidos son requeridos";

    if (!formData.email.trim()) {
      nuevosErrores.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = "El email no es válido";
    }

    if (!formData.usuarioTwitter.trim())
      nuevosErrores.usuarioTwitter = "El usuario de Twitter es requerido";

    if (!formData.ocupacion.trim())
      nuevosErrores.ocupacion = "La ocupación es requerida";

    if (!formData.aceptaTerminos)
      nuevosErrores.aceptaTerminos = "Debe aceptar los términos y condiciones";

    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError("");

    const nuevosErrores = validarFormulario();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    try {
      setCargando(true);
      await participantesService.registrarParticipante(formData);
      navigate("/participantes");
    } catch (error) {
      setMensajeError(error.message || "Error al registrar el participante");
    } finally {
      setCargando(false);
    }
  };

  const handleVolver = () => {
    navigate("/participantes");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6
                 bg-gradient-to-br from-[#DDF6F2] via-[#F0FBF8] to-[#E6FFFA]"
    >
      <div className="card w-full max-w-lg bg-white/70 backdrop-blur-md shadow-xl border border-[#47C5AE33] p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <img src="/logo.png" className="w-12 h-12" />
          <h1 className="text-3xl font-extrabold text-[#47C5AE]">
            Registro de Participante
          </h1>
        </div>

        {mensajeError && (
          <div className="alert alert-error shadow-lg mb-4">
            <div>
              <span>{mensajeError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {[
            { label: "Nombre *", name: "nombre" },
            { label: "Apellidos *", name: "apellidos" },
            { label: "Email *", name: "email", type: "email" },
            {
              label: "Usuario en Twitter *",
              name: "usuarioTwitter",
              placeholder: "@usuario",
            },
            { label: "Ocupación *", name: "ocupacion" },
          ].map((field) => (
            <div className="form-control w-full mb-3" key={field.name}>
              <label className="label">
                <span className="label-text">{field.label}</span>
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder || ""}
                value={formData[field.name]}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  errores[field.name] ? "input-error" : ""
                }`}
              />
              {errores[field.name] && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errores[field.name]}
                  </span>
                </label>
              )}
            </div>
          ))}

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Avatar (Foto)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              className={`file-input file-input-bordered w-full ${
                errores.avatar ? "file-input-error" : ""
              }`}
            />
            {errores.avatar && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errores.avatar}
                </span>
              </label>
            )}

            {imagenPreview && (
              <div className="avatar mx-auto mt-4">
                <div className="w-32 h-32 rounded-full ring ring-[#47C5AE] ring-offset-4 ring-offset-white overflow-hidden">
                  <img src={imagenPreview} />
                </div>
              </div>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label cursor-pointer">
              <span className="label-text">Acepto los términos *</span>
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
                className={`checkbox ${
                  errores.aceptaTerminos ? "checkbox-error" : ""
                }`}
              />
            </label>
            {errores.aceptaTerminos && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errores.aceptaTerminos}
                </span>
              </label>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-all"
              onClick={handleVolver}
              disabled={cargando}
            >
              Volver
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-white font-semibold shadow-md 
                         transition-all duration-300 hover:scale-105 hover:shadow-[0_0_12px_#47C5AE80]"
              disabled={cargando}
              style={{
                background: "linear-gradient(135deg, #47C5AE, #2FA08C)",
              }}
            >
              {cargando ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
