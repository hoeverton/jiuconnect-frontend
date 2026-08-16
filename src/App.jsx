import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardProfessor from "./pages/DashboardProfessor";
import Home from "./pages/Home";
import ProfessorDetalhe from "./pages/ProfessorDetalhe";
import SearchTeachers from "./pages/SearchTeachers";
import Login from "./pages/Login";
import MinhaConta from "./pages/MinhaConta";
import Disponibilidades from "./pages/Disponibilidades";
import Agenda from "./pages/Agenda";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/professores"
        element={<SearchTeachers />}
      />

      <Route
        path="/professor/:id"
        element={<ProfessorDetalhe />}
      />

      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardProfessor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/minha-conta"
        element={
          <ProtectedRoute>
            <MinhaConta />
          </ProtectedRoute>
        }
      />
      <Route
        path="/disponibilidades"
        element={<Disponibilidades />}
      />
      <Route
        path="/agenda"
        element={
          <ProtectedRoute>
            <Agenda />
          </ProtectedRoute>
        }
      />
    </Routes>
    
    
  );
}

export default App;