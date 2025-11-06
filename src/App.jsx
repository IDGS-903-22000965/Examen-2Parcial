import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import ListadoParticipantes from "./pages/ListadoParticipantes";
import Registro from "./pages/Registro";
import Gafete from "./pages/Gafete";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/participantes" element={<ListadoParticipantes />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/gafete/:id" element={<Gafete />} />
      </Routes>
    </Router>
  );
}

export default App;
