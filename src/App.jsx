import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
import MeusAlunos from "./pages/MeusAlunos";
import AlunoDetalhe from "./pages/AlunoDetalhe";
import Trilhas from "./pages/Trilhas";
import TrilhaDetalhe from "./pages/TrilhaDetalhe";
import Cadastro from "./pages/Cadastro";
import CadastroProfessor from "./pages/CadastroProfessor";
import MeuAprendizado from "./pages/MeuAprendizado";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />

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
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/cadastro-professor"
          element={
            <ProtectedRoute>
              <CadastroProfessor />
            </ProtectedRoute>
          }
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
          path="/meus-alunos"
          element={
            <ProtectedRoute>
              <MeusAlunos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meus-alunos/:id"
          element={
            <ProtectedRoute>
              <AlunoDetalhe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trilhas"
          element={
            <ProtectedRoute>
              <Trilhas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trilhas/:id"
          element={
            <ProtectedRoute>
              <TrilhaDetalhe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meu-aprendizado"
          element={
            <ProtectedRoute>
              <MeuAprendizado />
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
    </>
  );
}

export default App;