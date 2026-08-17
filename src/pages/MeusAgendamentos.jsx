import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";

import {
  getMeusAgendamentos,
} from "../services/agendamentoService";

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================================================
  // CARREGAR AGENDAMENTOS
  // =========================================================

  async function carregarAgendamentos() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getMeusAgendamentos();

      setAgendamentos(
        response.results || []
      );

    } catch (error) {
      console.error(
        "Erro ao carregar agendamentos:",
        error
      );

      setError(
        "Não foi possível carregar seus agendamentos."
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  // =========================================================
  // SEPARAR PRÓXIMAS E HISTÓRICO
  // =========================================================

  const proximasAulas =
    agendamentos.filter(
      (agendamento) =>
        agendamento.status ===
          "pendente" ||
        agendamento.status ===
          "confirmado"
    );

  const historico =
    agendamentos.filter(
      (agendamento) =>
        agendamento.status ===
          "concluido" ||
        agendamento.status ===
          "cancelado"
    );

  // =========================================================
  // FORMATAR DATA
  // =========================================================

  function formatarData(data) {
    return new Date(
      `${data}T00:00:00`
    ).toLocaleDateString(
      "pt-BR",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  }

  // =========================================================
  // FORMATAR HORA
  // =========================================================

  function formatarHora(hora) {
    return hora.slice(0, 5);
  }

  // =========================================================
  // STATUS
  // =========================================================

  function getStatus(status) {
    switch (status) {
      case "pendente":
        return {
          label: "Pendente",
          className:
            "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        };

      case "confirmado":
        return {
          label: "Confirmado",
          className:
            "bg-blue-500/10 text-blue-400 border-blue-500/20",
        };

      case "concluido":
        return {
          label: "Concluído",
          className:
            "bg-green-500/10 text-green-400 border-green-500/20",
        };

      case "cancelado":
        return {
          label: "Cancelado",
          className:
            "bg-red-500/10 text-red-400 border-red-500/20",
        };

      default:
        return {
          label: status,
          className:
            "bg-zinc-800 text-zinc-400 border-zinc-700",
        };
    }
  }

  // =========================================================
  // CARD DE AGENDAMENTO
  // =========================================================

  function AgendamentoCard({
    agendamento,
  }) {
    const status =
      getStatus(
        agendamento.status
      );

    return (
      <Card className="p-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* INFORMAÇÕES */}

          <div className="flex items-start gap-4">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                overflow-hidden
                border
                border-purple-500/20
                flex-shrink-0
                bg-zinc-900
              "
            >
              <img
                src={
                  agendamento.professor_foto ||
                  "https://ui-avatars.com/api/?name=Professor&background=7B2EFF&color=fff"
                }
                alt={agendamento.professor_nome}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            </div>

            <div>

              <h3 className="text-lg font-semibold text-white">
                Aula de Jiu-Jitsu
              </h3>

              <p className="text-zinc-400 mt-1">
                Professor
              </p>

              <p className="text-zinc-300 font-medium">
                {agendamento.professor_nome}
              </p>

            </div>

          </div>

          {/* DATA / HORÁRIO */}

          <div>

            <p className="text-sm text-zinc-500">
              Data
            </p>

            <p className="text-zinc-200 capitalize">
              {formatarData(
                agendamento.data
              )}
            </p>

            <p className="text-sm text-zinc-500 mt-3">
              Horário
            </p>

            <p className="text-zinc-200">
              {formatarHora(
                agendamento.hora_inicio
              )}
              {" → "}
              {formatarHora(
                agendamento.hora_fim
              )}
            </p>

          </div>

          {/* STATUS */}

          <div className="lg:text-right">

            <span
              className={`
                inline-flex
                items-center
                px-3
                py-1.5
                rounded-full
                border
                text-xs
                font-semibold
                ${status.className}
              `}
            >
              {status.label}
            </span>

          </div>

        </div>

      </Card>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <DashboardLayout>

      <div className="space-y-10">

        {/* =====================================================
            CABEÇALHO
        ====================================================== */}

        <div>

          <h1 className="text-3xl font-bold text-white">
            Meus Agendamentos
          </h1>

          <p className="text-zinc-500 mt-2">
            Acompanhe suas aulas e seu histórico.
          </p>

        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (
          <Card className="p-6">

            <p className="text-zinc-400">
              Carregando seus agendamentos...
            </p>

          </Card>
        )}

        {/* =====================================================
            ERRO
        ====================================================== */}

        {!loading && error && (
          <Card className="p-6">

            <p className="text-red-400">
              {error}
            </p>

          </Card>
        )}

        {!loading && !error && (

          <>

            {/* =================================================
                PRÓXIMAS AULAS
            ================================================== */}

            <section>

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-xl font-semibold text-white">
                    Próximas aulas
                  </h2>

                  <p className="text-sm text-zinc-500 mt-1">
                    Aulas pendentes ou confirmadas.
                  </p>

                </div>

                <span className="text-sm text-zinc-500">
                  {proximasAulas.length}
                </span>

              </div>

              {proximasAulas.length === 0 ? (

                <Card className="p-8">

                  <div className="text-center">

                    <div className="text-4xl mb-4">
                      📅
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      Nenhuma próxima aula
                    </h3>

                    <p className="text-zinc-500 mt-2">
                      Quando você agendar uma aula,
                      ela aparecerá aqui.
                    </p>

                  </div>

                </Card>

              ) : (

                <div className="space-y-4">

                  {proximasAulas.map(
                    (agendamento) => (
                      <AgendamentoCard
                        key={
                          agendamento.id
                        }
                        agendamento={
                          agendamento
                        }
                      />
                    )
                  )}

                </div>

              )}

            </section>

            {/* =================================================
                HISTÓRICO
            ================================================== */}

            <section>

              <div className="mb-5">

                <h2 className="text-xl font-semibold text-white">
                  Histórico
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  Aulas concluídas ou canceladas.
                </p>

              </div>

              {historico.length === 0 ? (

                <Card className="p-8">

                  <div className="text-center">

                    <div className="text-4xl mb-4">
                      📚
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      Nenhum histórico
                    </h3>

                    <p className="text-zinc-500 mt-2">
                      Suas aulas concluídas aparecerão aqui.
                    </p>

                  </div>

                </Card>

              ) : (

                <div className="space-y-4">

                  {historico.map(
                    (agendamento) => (
                      <AgendamentoCard
                        key={
                          agendamento.id
                        }
                        agendamento={
                          agendamento
                        }
                      />
                    )
                  )}

                </div>

              )}

            </section>

          </>

        )}

      </div>

    </DashboardLayout>
  );
}