import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import participantesService from "../services/participantesService";

const QR_GENERATOR_BASE_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";

function Gafete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [participante, setParticipante] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const cargarParticipante = async () => {
      try {
        setCargando(true);
        setError(null);
        const data = await participantesService.obtenerParticipante(id);
        setParticipante(data);
      } catch (err) {
        setError("Error al cargar el participante");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };
    cargarParticipante();
  }, [id]);

  const handleVolver = () => {
    navigate("/participantes");
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const qrImageUrl = participante
    ? `${QR_GENERATOR_BASE_URL}${encodeURIComponent(
        `${window.location.origin}/gafete/${participante.id}`
      )}`
    : "";

  const franjaStyle = {
    background: "linear-gradient(135deg, #2FA08C, #1E7969)",
    backgroundImage: "url('/pattern.svg')",
    backgroundSize: "320px",
    backgroundRepeat: "repeat",
    backgroundBlendMode: "overlay",
    opacity: 0.9,
  };

  const IconoEmail = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-[#47C5AE] shrink-0"
    >
      <path d="M1.5 4.5h21a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-21a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75zM2.25 6v.31l9.44 6.29a.75.75 0 0 0 .62 0L21.75 6.31V6h-19.5zM21.75 18v-9.69l-9.37 6.25a2.25 2.25 0 0 1-2.76 0L2.25 8.31V18h19.5z" />
    </svg>
  );

  const IconoTwitter = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-[#47C5AE] shrink-0"
    >
      <path d="M18.146 2H21.5l-7.367 8.41L22 22h-6.328l-4.948-6.477L4.6 22H1l7.82-8.927L2 2h6.42l4.473 5.932L18.146 2Zm-2.21 18.4h1.553L7.177 3.52H5.51l10.426 16.88Z" />
    </svg>
  );

  if (cargando) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#DDF6F2] via-[#F0FBF8] to-[#E6FFFA]"
        style={{
          backgroundImage: "url('/pattern.svg')",
          backgroundSize: "320px",
          backgroundRepeat: "repeat",
        }}
      >
        <span className="loading loading-lg loading-spinner text-[#47C5AE]"></span>
      </div>
    );
  }

  if (error || !participante) {
    return (
      <div
        className="min-h-screen p-4 bg-gradient-to-br from-[#DDF6F2] via-[#F0FBF8] to-[#E6FFFA]"
        style={{
          backgroundImage: "url('/pattern.svg')",
          backgroundSize: "320px",
          backgroundRepeat: "repeat",
        }}
      ></div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-br from-[#CFF5EB] via-[#DFFBF4] to-[#C9F8EE]"
      style={{
        backgroundImage: "url('/pattern.svg')",
        backgroundSize: "280px",
        backgroundRepeat: "repeat",
      }}
    >
      <header
        className="w-full rounded-2xl mb-6 p-5 shadow-xl bg-white/70 backdrop-blur-md 
             border border-gray-200 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <img src="/logo.png" className="w-12 h-12 drop-shadow-lg" />

          <h1 className="text-3xl font-extrabold text-[#47C5AE] tracking-tight">
            Gafete de Asistente
          </h1>
        </div>

        <button
          className="px-5 py-2 rounded-xl text-white font-semibold shadow-md 
               transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #47C5AE, #2FA08C)",
          }}
          onClick={handleVolver}
        >
          Volver al listado
        </button>
      </header>

      <div
        className="flip-card-container w-full max-w-lg cursor-pointer"
        style={{ height: "600px", perspective: "1000px" }}
        onClick={handleFlip}
      >
        <div
          className={`flip-card relative w-full h-full transition-transform duration-700 ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="flip-card-front absolute w-full h-full [backface-visibility:hidden]
                     bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-[#47C5AE]/30"
          >
            <div
              className="h-40 relative"
              style={{
                background: "linear-gradient(135deg, #2FA08C, #1D7C6B)",
                backgroundImage: "url('/pattern.svg')",
                backgroundBlendMode: "overlay",
                backgroundSize: "260px",
                backgroundRepeat: "repeat",
              }}
            ></div>

            <div className="flex-grow flex flex-col items-center text-center p-6 bg-white">
              <div className="avatar -mt-28 z-10">
                <div className="w-44 h-44 rounded-full ring-8 ring-white shadow-2xl overflow-hidden flex items-center justify-center border-4 border-[#47C5AE]/40">
                  <img
                    src={
                      participante.avatar || "https://via.placeholder.com/150"
                    }
                    alt={participante.nombreCompleto}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="text-4xl font-extrabold text-[#0A3A32] mt-6">
                {participante.nombreCompleto}
              </h2>

              <p className="text-lg font-bold tracking-widest text-[#2FA08C] uppercase mt-3">
                {participante.ocupacion}
              </p>

              <img
                src="/logo.png"
                alt="Logo"
                className="w-28 mt-6 opacity-90"
              />
            </div>

            <div
              className="py-3 text-center text-white text-sm tracking-wide bg-[#2FA08C]"
              style={{
                backgroundImage: "url('/pattern.svg')",
                backgroundBlendMode: "overlay",
                backgroundSize: "240px",
                backgroundRepeat: "repeat",
              }}
            >
              Congreso de Tecnologías de la Información
            </div>
          </div>

          <div
            className="flip-card-back absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]
             bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col border border-[#47C5AE]/30"
          >
            <div className="p-6 flex items-center gap-4 bg-[#E5F7F3] border-b border-[#47C5AE]/30">
              <img src="/logo.png" alt="Logo" className="w-20 h-auto" />

              <div className="flex flex-col">
                <h2 className="text-xl font-extrabold text-[#0A3A32] leading-tight">
                  {participante.nombreCompleto}
                </h2>
                <p className="text-sm text-[#2FA08C] font-semibold">
                  {participante.ocupacion}
                </p>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="flex-grow p-6 flex items-start gap-6 bg-white">
              <div className="flex flex-col items-center w-[50%]">
                <div className="bg-white p-3 rounded-lg border border-[#47C5AE]/40 shadow-md">
                  <img src={qrImageUrl} alt="Código QR" className="w-32 h-32" />
                </div>

                <div className="text-center text-xs text-gray-600 mt-4 font-semibold">
                  <p className="text-[#198a72]">ID: #{participante.id}</p>
                  <p>
                    Registro:{" "}
                    {new Date(participante.fechaRegistro).toLocaleDateString(
                      "es-MX"
                    )}
                  </p>
                </div>
              </div>

              <div className="w-px h-full bg-gradient-to-b from-[#2FA08C]/0 via-[#2FA08C]/40 to-[#2FA08C]/0"></div>

              <div className="flex flex-col w-[105%]">
                <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                  Contacto
                </p>
                <div className="w-14 h-1 bg-[#2FA08C] mt-1 rounded-full mb-4"></div>

                <div className="flex flex-col gap-5">
                  <a
                    href={`mailto:${participante.email}`}
                    className="flex items-center gap-3 group"
                  >
                    <IconoEmail />
                    <span className="text-[#0A3A32] text-sm break-all group-hover:text-[#2FA08C] font-semibold">
                      {participante.email}
                    </span>
                  </a>

                  {participante.usuarioTwitter && (
                    <a
                      href={`https://twitter.com/${participante.usuarioTwitter.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <IconoTwitter />
                      <span className="text-[#0A3A32] text-sm group-hover:text-[#2FA08C] font-semibold">
                        {participante.usuarioTwitter}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div
              className="h-20 bg-[#2FA08C] mt-auto"
              style={{
                backgroundImage: "url('/pattern.svg')",
                backgroundBlendMode: "overlay",
                backgroundSize: "240px",
                backgroundRepeat: "repeat",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gafete;
