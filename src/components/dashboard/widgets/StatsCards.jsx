import {
  Calendar,
  Users,
  Clock3,
  Star,
} from "lucide-react";

import DashboardCard from "../DashboardCard";

const stats = [
  {
    titulo: "Próximas Aulas",
    valor: "--",
    descricao: "Nenhuma aula agendada",
    icone: <Calendar size={22} />,
  },
  {
    titulo: "Alunos",
    valor: "--",
    descricao: "Sem dados disponíveis",
    icone: <Users size={22} />,
  },
  {
    titulo: "Horas da Semana",
    valor: "--",
    descricao: "Sem dados disponíveis",
    icone: <Clock3 size={22} />,
  },
  {
    titulo: "Avaliação",
    valor: "--",
    descricao: "Sem avaliações",
    icone: <Star size={22} />,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <DashboardCard
          key={item.titulo}
          titulo={item.titulo}
          valor={item.valor}
          descricao={item.descricao}
          icone={item.icone}
        />
      ))}
    </div>
  );
}