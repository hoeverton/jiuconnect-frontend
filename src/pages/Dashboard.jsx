import { useAuth } from "../context/AuthContext";

import DashboardProfessor from "./DashboardProfessor";
import DashboardAluno from "./DashboardAluno";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (
    user.tipo_usuario === "aluno"
  ) {
    return <DashboardAluno />;
  }

  return <DashboardProfessor />;
}