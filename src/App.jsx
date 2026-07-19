import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProfessorDetalhe from "./pages/ProfessorDetalhe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/professor/:id" element={<ProfessorDetalhe />} />
    </Routes>
  );
}

export default App;