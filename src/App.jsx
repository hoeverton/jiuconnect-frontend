import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProfessorDetalhe from "./pages/ProfessorDetalhe";
import SearchTeachers from "./pages/SearchTeachers";
import Login from "./pages/Login";
import MinhaConta from "./pages/MinhaConta";
import Disponibilidades from "./pages/Disponibilidades";
import Agenda from "./pages/Agenda";
import MeusAgendamentos from "./pages/MeusAgendamentos";
import Favoritos from "./pages/Favoritos";

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
            <Dashboard />
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
      <Route
        path="/meus-agendamentos"
        element={
          <ProtectedRoute>
            <MeusAgendamentos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favoritos"
        element={
          <ProtectedRoute>
            <Favoritos />
          </ProtectedRoute>
        }
      />
          </Routes>
    
    
  );
}

export default App;