import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import participantesService from "../services/participantesService";

function ListadoParticipantes() {
  const [participantes, setParticipantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const querySearch = searchParams.get("search");
    if (querySearch) {
      setBusqueda(querySearch);
      buscarParticipantes(querySearch);
    } else {
      cargarParticipantes();
    }
  }, [searchParams]);

  const cargarParticipantes = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await participantesService.obtenerListado();
      setParticipantes(data);
    } catch (err) {
      setError("Error al cargar los participantes");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const buscarParticipantes = async (query) => {
    if (!query.trim()) {
      cargarParticipantes();
      return;
    }
    try {
      setCargando(true);
      setError(null);
      const data = await participantesService.buscarParticipantes(query);
      setParticipantes(data);
    } catch (err) {
      setError("Error al buscar participantes");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/participantes?search=${busqueda}`);
      buscarParticipantes(busqueda);
    } else {
      navigate("/participantes");
      cargarParticipantes();
    }
  };

  const handleVerGafete = (id) => {
    navigate(`/gafete/${id}`);
  };

  const handleRegistro = () => {
    navigate("/registro");
  };

  return (
    <div
      className="min-h-screen p-4 bg-gradient-to-br from-[#DDF6F2] via-[#F0FBF8] to-[#E6FFFA]"
      style={{
        backgroundImage: "url('/pattern.svg')",
        backgroundSize: "320px",
        backgroundRepeat: "repeat",
      }}
    >
      <header className="rounded-2xl mb-6 p-5 shadow-xl bg-white/70 backdrop-blur-md border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" className="w-12 h-12 drop-shadow-lg" />
          <h1 className="text-3xl font-extrabold text-[#47C5AE] tracking-tight">
            Asistentes Registrados
          </h1>
        </div>

        <button
          className="px-5 py-2 rounded-xl text-white font-semibold shadow-md 
                     transition-all duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #47C5AE, #2FA08C)" }}
          onClick={handleRegistro}
        >
          Nuevo Registro
        </button>
      </header>

      <div className="mb-8">
        <form
          onSubmit={handleBuscar}
          className="flex gap-3 items-center bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-200"
        >
          <input
            type="text"
            placeholder="Buscar participante..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input w-full input-md border-gray-300 focus:ring-2 focus:ring-[#47C5AE]"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-white font-semibold shadow-md 
             transition-all duration-300 hover:scale-105 hover:shadow-[0_0_12px_#47C5AE80]"
            style={{
              background: "linear-gradient(135deg, #47C5AE, #2FA08C)",
            }}
          >
            Buscar
          </button>
        </form>
      </div>

      {cargando && (
        <div className="flex justify-center p-10">
          <span className="loading loading-lg loading-spinner text-[#47C5AE]"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {participantes.map((participante) => (
          <div
            key={participante.id}
            className="card bg-white/70 border border-[#47C5AE22] shadow-xl rounded-2xl backdrop-blur-sm 
                 hover:shadow-[0_0_20px_#47C5AE50] transition-all duration-300 hover:-translate-y-1"
          >
            <figure className="pt-3 -mt-2 flex justify-center">
              <div className="avatar">
                <div
                  className="p-1.5 bg-white rounded-full shadow-md"
                  style={{ boxSizing: "content-box" }}
                >
                  <div className="w-32 h-32 rounded-full ring ring-[#47C5AE] ring-offset-4 ring-offset-white overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        participante.avatar || "https://via.placeholder.com/150"
                      }
                      alt={participante.nombreCompleto}
                      onClick={() => handleVerGafete(participante.id)}
                      className="cursor-pointer w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </figure>

            <div className="card-body items-center text-center px-6 pb-6">
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {participante.nombreCompleto}
              </h2>

              <p className="text-gray-600 mt-1">{participante.ocupacion}</p>

              {participante.usuarioTwitter && (
                <a
                  href={`https://twitter.com/${participante.usuarioTwitter.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-4 py-1 rounded-full text-sm font-semibold bg-[#E8F8F4] text-[#2F8C76]
             hover:bg-[#47C5AE] hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M18.146 2H21.5l-7.367 8.41L22 22h-6.328l-4.948-6.477L4.6 22H1l7.82-8.927L2 2h6.42l4.473 5.932L18.146 2Zm-2.21 18.4h1.553L7.177 3.52H5.51l10.426 16.88Z" />
                  </svg>

                  {participante.usuarioTwitter}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {!cargando && participantes.length === 0 && (
        <div className="text-center text-2xl text-base-content/60 mt-10">
          <p>No se encontraron participantes</p>
        </div>
      )}
    </div>
  );
}

export default ListadoParticipantes;
