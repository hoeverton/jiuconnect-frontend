import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Clock3,
  Star,
} from "lucide-react";

import DashboardCard from "../DashboardCard";
import api from "../../../services/api";

export default function StatsCards() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarAgendamentos() {
      try {
        const response = await api.get(
          "/professor/agendamentos/"
        );

        // A API pode retornar:
        // 1. uma lista diretamente
        // 2. { results: [...] } por causa da paginação

        const dados = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.results)
            ? response.data.results
            : [];

        setAgendamentos(dados);

        console.log(
          "Agendamentos carregados no Dashboard:",
          dados
        );

      } catch (error) {
        console.error(
          "Erro ao carregar agendamentos:",
          error
        );

        setAgendamentos([]);
      } finally {
        setLoading(false);
      }
    }

    carregarAgendamentos();
  }, []);

  /*
   * Próximas aulas
   *
   * Consideramos pendentes e confirmadas.
   */

  const proximasAulas = agendamentos.filter(
    (item) =>
      item.status === "pendente" ||
      item.status === "confirmado"
  );

  /*
   * Alunos únicos
   */

  const alunosUnicos = new Set(
    agendamentos
      .map((item) => item.aluno_nome)
      .filter(Boolean)
  );

  /*
   * Calcula as horas das próximas aulas
   */

  function calcularHoras() {
    let minutos = 0;

    proximasAulas.forEach((aula) => {
      if (
        !aula.hora_inicio ||
        !aula.hora_fim
      ) {
        return;
      }

      const [horaInicio, minutoInicio] =
        aula.hora_inicio
          .substring(0, 5)
          .split(":")
          .map(Number);

      const [horaFim, minutoFim] =
        aula.hora_fim
          .substring(0, 5)
          .split(":")
          .map(Number);

      const inicio =
        horaInicio * 60 + minutoInicio;

      const fim =
        horaFim * 60 + minutoFim;

      minutos += fim - inicio;
    });

    const horas = Math.floor(minutos / 60);

    const minutosRestantes =
      minutos % 60;

    if (minutosRestantes === 0) {
      return `${horas}h`;
    }

    return `${horas}h ${minutosRestantes}min`;
  }

  const stats = [
    {
      titulo: "Próximas Aulas",
      valor: loading
        ? "--"
        : proximasAulas.length,
      descricao:
        proximasAulas.length === 1
          ? "1 aula agendada"
          : "Aulas pendentes ou confirmadas",
      icone: <Calendar size={22} />,
    },

    {
      titulo: "Alunos",
      valor: loading
        ? "--"
        : alunosUnicos.size,
      descricao:
        alunosUnicos.size === 1
          ? "1 aluno com agendamento"
          : "Alunos com agendamentos",
      icone: <Users size={22} />,
    },

    {
      titulo: "Horas da Semana",
      valor: loading
        ? "--"
        : calcularHoras(),
      descricao: "Horas de aulas agendadas",
      icone: <Clock3 size={22} />,
    },

    {
      titulo: "Avaliação",
      valor: "--",
      descricao: "Sem avaliações",
      icone: <Star size={22} />,
    },
  ];

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