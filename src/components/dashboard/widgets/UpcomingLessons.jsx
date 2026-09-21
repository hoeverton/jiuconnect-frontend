import { useEffect, useState } from "react";
import {
  CalendarClock,
  Clock3,
  Check,
  X,
  CheckCircle2,
} from "lucide-react";

import Card from "../../ui/Card";
import api from "../../../services/api";

import {
  confirmarAgendamento,
  cancelarAgendamento,
  concluirAgendamento,
} from "../../../services/agendamentoService";

export default function UpcomingLessons() {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  async function carregarAulas() {
    try {
      const response = await api.get(
        "/professor/agendamentos/"
      );

      const dados = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.results)
          ? response.data.results
          : [];

      const proximas = dados
        .filter(
          (aula) =>
            aula.status === "pendente" ||
            aula.status === "confirmado"
        )
        .sort((a, b) => {
          const dataA = `${a.data} ${a.hora_inicio}`;
          const dataB = `${b.data} ${b.hora_inicio}`;

          return (
            new Date(dataA) -
            new Date(dataB)
          );
        });

      setAulas(proximas);

    } catch (error) {
      console.error(
        "Erro ao carregar próximas aulas:",
        error
      );

      setAulas([]);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAulas();
  }, []);

  function formatarData(data) {
    if (!data) {
      return "";
    }

    const [ano, mes, dia] =
      data.split("-").map(Number);

    const dataObj = new Date(
      ano,
      mes - 1,
      dia
    );

    return dataObj.toLocaleDateString(
      "pt-BR",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  }

  function formatarHora(hora) {
    if (!hora) {
      return "";
    }

    return hora.substring(0, 5);
  }

  function getStatusClass(status) {
    if (status === "confirmado") {
      return `
        bg-green-500/10
        text-green-400
        border
        border-green-500/20
      `;
    }

    return `
      bg-yellow-500/10
      text-yellow-400
      border
      border-yellow-500/20
    `;
  }

  function getStatusText(status) {
    if (status === "confirmado") {
      return "Confirmado";
    }

    if (status === "pendente") {
      return "Pendente";
    }

    if (status === "concluido") {
      return "Concluído";
    }

    if (status === "cancelado") {
      return "Cancelado";
    }

    return status;
  }

  // =====================================================
  // CONFIRMAR
  // =====================================================

  async function handleConfirmar(id) {
    setProcessingId(id);

    try {
      await confirmarAgendamento(id);

      await carregarAulas();

    } catch (error) {
      console.error(
        "Erro ao confirmar agendamento:",
        error
      );

      alert(
        "Não foi possível confirmar esta aula."
      );

    } finally {
      setProcessingId(null);
    }
  }

  // =====================================================
  // CANCELAR
  // =====================================================

  async function handleCancelar(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar esta aula?"
    );

    if (!confirmar) {
      return;
    }

    setProcessingId(id);

    try {
      await cancelarAgendamento(id);

      await carregarAulas();

    } catch (error) {
      console.error(
        "Erro ao cancelar agendamento:",
        error
      );

      alert(
        "Não foi possível cancelar esta aula."
      );

    } finally {
      setProcessingId(null);
    }
  }

  // =====================================================
  // CONCLUIR
  // =====================================================

  async function handleConcluir(id) {
    const confirmar = window.confirm(
      "Deseja marcar esta aula como concluída?"
    );

    if (!confirmar) {
      return;
    }

    setProcessingId(id);

    try {
      await concluirAgendamento(id);

      await carregarAulas();

    } catch (error) {
      console.error(
        "Erro ao concluir agendamento:",
        error
      );

      alert(
        "Não foi possível concluir esta aula."
      );

    } finally {
      setProcessingId(null);
    }
  }

  return (
    <Card className="p-6 h-full">

      {/* CABEÇALHO */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold text-white">
            Próximas Aulas
          </h2>

          <p className="text-zinc-500 text-sm">
            Seus próximos agendamentos.
          </p>

        </div>

        <CalendarClock
          className="text-violet-400"
          size={26}
        />

      </div>

      {/* CARREGANDO */}

      {loading && (

        <div className="py-12 flex flex-col items-center text-center">

          <CalendarClock
            size={42}
            className="text-zinc-600 mb-4 animate-pulse"
          />

          <p className="text-zinc-300 font-medium">
            Carregando aulas...
          </p>

        </div>

      )}

      {/* SEM AULAS */}

      {!loading && aulas.length === 0 && (

        <div className="py-12 flex flex-col items-center text-center">

          <CalendarClock
            size={42}
            className="text-zinc-600 mb-4"
          />

          <p className="text-zinc-300 font-medium">
            Nenhuma aula agendada
          </p>

          <span className="text-zinc-500 text-sm mt-2">
            Quando houver agendamentos eles aparecerão aqui.
          </span>

        </div>

      )}

      {/* AULAS */}

      {!loading && aulas.length > 0 && (

        <div className="space-y-4">

          {aulas.slice(0, 5).map((aula) => {

            const processando =
              processingId === aula.id;

            return (

              <div
                key={aula.id}
                className="
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-zinc-900/50
                  p-4
                  hover:border-violet-500/30
                  transition
                "
              >

                {/* INFORMAÇÕES */}

                <div className="flex items-center gap-4">

                  {/* AVATAR */}

                  {aula.aluno_foto ? (

                    <img
                      src={
                        aula.aluno_foto.startsWith("http")
                          ? aula.aluno_foto
                          : `http://127.0.0.1:8000${aula.aluno_foto}`
                      }
                      alt={aula.aluno_nome}
                      className="
                        w-12
                        h-12
                        rounded-full
                        object-cover
                        border
                        border-violet-500/20
                      "
                    />

                  ) : (

                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        bg-violet-500/10
                        border
                        border-violet-500/20
                        flex
                        items-center
                        justify-center
                        text-violet-400
                        font-bold
                      "
                    >
                      {aula.aluno_nome
                        ?.charAt(0)
                        .toUpperCase() || "A"}
                    </div>

                  )}

                  {/* DADOS */}

                  <div className="flex-1 min-w-0">

                    <p className="text-white font-semibold truncate">
                      {aula.aluno_nome || "Aluno"}
                    </p>

                    <p className="text-zinc-500 text-sm mt-1 capitalize">
                      {formatarData(aula.data)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                      <Clock3
                        size={15}
                        className="text-violet-400"
                      />

                      <span className="text-zinc-300 text-sm">

                        {formatarHora(
                          aula.hora_inicio
                        )}

                        {" → "}

                        {formatarHora(
                          aula.hora_fim
                        )}

                      </span>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div
                    className={`
                      px-3
                      py-1.5
                      rounded-full
                      text-xs
                      font-medium
                      whitespace-nowrap
                      ${getStatusClass(aula.status)}
                    `}
                  >
                    {getStatusText(aula.status)}
                  </div>

                </div>

                {/* BOTÕES */}

                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-800">

                  {/* PENDENTE */}

                  {aula.status === "pendente" && (

                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleConfirmar(aula.id)
                        }
                        disabled={processando}
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          bg-green-600
                          hover:bg-green-500
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          text-white
                          text-sm
                          font-medium
                          transition
                        "
                      >

                        <Check size={16} />

                        {processando
                          ? "Processando..."
                          : "Confirmar"}

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCancelar(aula.id)
                        }
                        disabled={processando}
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          border
                          border-red-500/30
                          bg-red-500/10
                          hover:bg-red-500/20
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          text-red-400
                          text-sm
                          font-medium
                          transition
                        "
                      >

                        <X size={16} />

                        Cancelar

                      </button>

                    </>

                  )}

                  {/* CONFIRMADO */}

                  {aula.status === "confirmado" && (

                    <>

                      <button
                        type="button"
                        onClick={() =>
                          handleConcluir(aula.id)
                        }
                        disabled={processando}
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          bg-violet-600
                          hover:bg-violet-500
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          text-white
                          text-sm
                          font-medium
                          transition
                        "
                      >

                        <CheckCircle2 size={16} />

                        {processando
                          ? "Processando..."
                          : "Concluir aula"}

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCancelar(aula.id)
                        }
                        disabled={processando}
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          border
                          border-red-500/30
                          bg-red-500/10
                          hover:bg-red-500/20
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          text-red-400
                          text-sm
                          font-medium
                          transition
                        "
                      >

                        <X size={16} />

                        Cancelar

                      </button>

                    </>

                  )}

                </div>

              </div>

            );

          })}

          {/* MAIS AULAS */}

          {aulas.length > 5 && (

            <p className="text-center text-zinc-500 text-sm pt-2">
              + {aulas.length - 5} outras aulas agendadas
            </p>

          )}

        </div>

      )}

    </Card>
  );
}