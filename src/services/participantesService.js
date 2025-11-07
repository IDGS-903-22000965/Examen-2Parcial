const API_URL = "https://backendcongreso.onrender.com/api";

const participantesService = {
  obtenerListado: async () => {
    try {
      const response = await fetch(`${API_URL}/listado`);
      if (!response.ok) {
        throw new Error("Error al obtener el listado");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  buscarParticipantes: async (query) => {
    try {
      const response = await fetch(`${API_URL}/listado/${query}`);
      if (!response.ok) {
        throw new Error("Error al buscar participantes");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  obtenerParticipante: async (id) => {
    try {
      const response = await fetch(`${API_URL}/participante/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener el participante");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  registrarParticipante: async (participante) => {
    try {
      const response = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participante),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensaje || "Error al registrar participante");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

export default participantesService;
