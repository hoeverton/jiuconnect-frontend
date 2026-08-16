import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  getProfessorAgendamentos,
  confirmarAgendamento,
  concluirAgendamento,
  cancelarAgendamento,
} from "../services/agendamentoService";

export default function Agenda() {
  const [agendamentos, setAgendamentos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const hoje = new Date();

  const [mesAtual, setMesAtual] = useState(
    new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      1
    )
  );

  const [dataSelecionada, setDataSelecionada] =
    useState(null);

  // =========================================================
  // CARREGAR AGENDAMENTOS
  // =========================================================

  async function loadAgendamentos() {
    try {
      setError("");

      const response =
        await getProfessorAgendamentos();

      setAgendamentos(
        response.results || []
      );

    } catch (error) {
      console.error(
        "Erro ao carregar agendamentos:",
        error
      );

      setError(
        "Não foi possível carregar sua agenda."
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAgendamentos();
  }, []);

  // =========================================================
  // NOME DO MÊS
  // =========================================================

  const nomeMes = mesAtual.toLocaleDateString(
    "pt-BR",
    {
      month: "long",
      year: "numeric",
    }
  );

  // =========================================================
  // AGENDAMENTOS DO MÊS
  // =========================================================

  const agendamentosDoMes = useMemo(() => {
    const ano =
      mesAtual.getFullYear();

    const mes = String(
      mesAtual.getMonth() + 1
    ).padStart(2, "0");

    const prefixo = `${ano}-${mes}`;

    return agendamentos.filter(
      (item) =>
        item.data.startsWith(prefixo)
    );
  }, [agendamentos, mesAtual]);

  // =========================================================
  // DATAS QUE POSSUEM AGENDAMENTO
  // =========================================================

  const datasComAgendamento = useMemo(() => {
    return new Set(
      agendamentosDoMes.map(
        (item) => item.data
      )
    );
  }, [agendamentosDoMes]);

  // =========================================================
  // AGENDAMENTOS DO DIA SELECIONADO
  // =========================================================

  const agendamentosSelecionados =
    useMemo(() => {
      if (!dataSelecionada) {
        return [];
      }

      return agendamentos.filter(
        (item) =>
          item.data === dataSelecionada
      );
    }, [
      agendamentos,
      dataSelecionada,
    ]);

  // =========================================================
  // GERAR DIAS DO CALENDÁRIO
  // =========================================================

  const diasDoMes = useMemo(() => {
    const ano =
      mesAtual.getFullYear();

    const mes =
      mesAtual.getMonth();

    const primeiroDia =
      new Date(
        ano,
        mes,
        1
      );

    const ultimoDia =
      new Date(
        ano,
        mes + 1,
        0
      );

    let diaSemana =
      primeiroDia.getDay();

    // Segunda-feira = primeiro dia
    diaSemana =
      diaSemana === 0
        ? 6
        : diaSemana - 1;

    const totalDias =
      ultimoDia.getDate();

    const dias = [];

    // Espaços antes do primeiro dia
    for (
      let i = 0;
      i < diaSemana;
      i++
    ) {
      dias.push(null);
    }

    // Dias do mês
    for (
      let dia = 1;
      dia <= totalDias;
      dia++
    ) {
      dias.push(dia);
    }

    return dias;
  }, [mesAtual]);

  // =========================================================
  // NAVEGAÇÃO
  // =========================================================

  function mesAnterior() {
    setMesAtual(
      (mes) =>
        new Date(
          mes.getFullYear(),
          mes.getMonth() - 1,
          1
        )
    );

    setDataSelecionada(null);
  }

  function proximoMes() {
    setMesAtual(
      (mes) =>
        new Date(
          mes.getFullYear(),
          mes.getMonth() + 1,
          1
        )
    );

    setDataSelecionada(null);
  }

  // =========================================================
  // CRIAR DATA
  // =========================================================

  function criarDataDoDia(dia) {
    const ano =
      mesAtual.getFullYear();

    const mes = String(
      mesAtual.getMonth() + 1
    ).padStart(2, "0");

    const diaFormatado =
      String(dia).padStart(2, "0");

    return `${ano}-${mes}-${diaFormatado}`;
  }

  // =========================================================
  // SELECIONAR DIA
  // =========================================================

  function selecionarDia(dia) {
    if (!dia) {
      return;
    }

    const novaData =
      criarDataDoDia(dia);

    setDataSelecionada(novaData);
  }

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
  // FORMATAR HORÁRIO
  // =========================================================

  function formatarHora(hora) {
    return hora.slice(0, 5);
  }

  // =========================================================
  // STATUS
  // =========================================================

  function getStatusStyle(status) {
    switch (status) {
      case "pendente":
        return {
          label: "Pendente",
          className:
            "bg-yellow-500/10 text-yellow-400",
        };

      case "confirmado":
        return {
          label: "Confirmado",
          className:
            "bg-blue-500/10 text-blue-400",
        };

      case "concluido":
        return {
          label: "Concluído",
          className:
            "bg-green-500/10 text-green-400",
        };

      case "cancelado":
        return {
          label: "Cancelado",
          className:
            "bg-red-500/10 text-red-400",
        };

      default:
        return {
          label: status,
          className:
            "bg-zinc-800 text-zinc-400",
        };
    }
  }

  // =========================================================
  // CONFIRMAR
  // =========================================================

  async function handleConfirmar(id) {
    setActionLoading(id);
    setError("");
    setMessage("");

    try {
      await confirmarAgendamento(id);

      setMessage(
        "Agendamento confirmado com sucesso."
      );

      await loadAgendamentos();

    } catch (error) {
      console.error(
        "Erro ao confirmar agendamento:",
        error
      );

      setError(
        "Não foi possível confirmar o agendamento."
      );
    } finally {
      setActionLoading(null);
    }
  }

  // =========================================================
  // CONCLUIR
  // =========================================================

  async function handleConcluir(id) {
    setActionLoading(id);
    setError("");
    setMessage("");

    try {
      await concluirAgendamento(id);

      setMessage(
        "Agendamento concluído com sucesso."
      );

      await loadAgendamentos();

    } catch (error) {
      console.error(
        "Erro ao concluir agendamento:",
        error
      );

      setError(
        "Não foi possível concluir o agendamento."
      );
    } finally {
      setActionLoading(null);
    }
  }

  // =========================================================
  // CANCELAR
  // =========================================================

  async function handleCancelar(id) {
    const confirmado =
      window.confirm(
        "Tem certeza que deseja cancelar este agendamento?"
      );

    if (!confirmado) {
      return;
    }

    setActionLoading(id);
    setError("");
    setMessage("");

    try {
      await cancelarAgendamento(id);

      setMessage(
        "Agendamento cancelado com sucesso."
      );

      await loadAgendamentos();

    } catch (error) {
      console.error(
        "Erro ao cancelar agendamento:",
        error
      );

      setError(
        "Não foi possível cancelar o agendamento."
      );
    } finally {
      setActionLoading(null);
    }
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* =====================================================
            CABEÇALHO
        ====================================================== */}

        <div>

          <h1 className="text-3xl font-bold text-white">
            Agenda
          </h1>

          <p className="text-zinc-500 mt-2">
            Visualize e gerencie suas aulas agendadas.
          </p>

        </div>

        {/* =====================================================
            MENSAGEM
        ====================================================== */}

        {message && (
          <div
            className="
              rounded-xl
              border
              border-green-500/20
              bg-green-500/10
              px-4
              py-3
              text-sm
              text-green-400
            "
          >
            {message}
          </div>
        )}

        {error && (
          <div
            className="
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-3
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* =====================================================
            NAVEGAÇÃO DO MÊS
        ====================================================== */}

        <Card className="p-4">

          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={mesAnterior}
              className="
                w-10
                h-10
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900/50
                text-zinc-300
                hover:bg-zinc-800
                hover:text-white
                transition
                text-2xl
              "
            >
              ‹
            </button>

            <div className="text-center">

              <h2 className="text-xl md:text-2xl font-semibold text-white capitalize">
                {nomeMes}
              </h2>

              <p className="text-sm text-zinc-500 mt-1">
                {agendamentosDoMes.length}{" "}
                {agendamentosDoMes.length === 1
                  ? "agendamento"
                  : "agendamentos"}
              </p>

            </div>

            <button
              type="button"
              onClick={proximoMes}
              className="
                w-10
                h-10
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900/50
                text-zinc-300
                hover:bg-zinc-800
                hover:text-white
                transition
                text-2xl
              "
            >
              ›
            </button>

          </div>

        </Card>

        {/* =====================================================
            CALENDÁRIO
        ====================================================== */}

        <Card className="p-4">

          {/* Dias da semana */}

          <div className="grid grid-cols-7 mb-2">

            {[
              "Seg",
              "Ter",
              "Qua",
              "Qui",
              "Sex",
              "Sáb",
              "Dom",
            ].map((dia) => (

              <div
                key={dia}
                className="
                  text-center
                  text-xs
                  font-semibold
                  text-zinc-500
                  py-1
                "
              >
                {dia}
              </div>

            ))}

          </div>

          {/* Dias */}

          <div className="grid grid-cols-7 gap-1.5">

            {diasDoMes.map(
              (dia, index) => {

                if (!dia) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="h-10"
                    />
                  );
                }

                const dataDia =
                  criarDataDoDia(dia);

                const possuiAgendamento =
                  datasComAgendamento.has(
                    dataDia
                  );

                const selecionado =
                  dataSelecionada ===
                  dataDia;

                return (
                  <button
                    key={dataDia}
                    type="button"
                    onClick={() =>
                      selecionarDia(dia)
                    }
                    className={`
                      h-10
                      rounded-lg
                      flex
                      flex-col
                      items-center
                      justify-center
                      transition-all
                      text-sm
                      font-medium

                      ${
                        selecionado
                          ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                          : possuiAgendamento
                          ? "bg-violet-500/20 border border-violet-500/40 text-violet-300 hover:bg-violet-500/30"
                          : "border border-transparent text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }
                    `}
                  >

                    <span>
                      {dia}
                    </span>

                    {possuiAgendamento &&
                      !selecionado && (
                        <span
                          className="
                            w-1
                            h-1
                            rounded-full
                            bg-violet-400
                            mt-0.5
                          "
                        />
                      )}

                  </button>
                );
              }
            )}

          </div>

        </Card>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (
          <Card className="p-6">

            <p className="text-zinc-400">
              Carregando agenda...
            </p>

          </Card>
        )}

        {/* =====================================================
            DIA SELECIONADO
        ====================================================== */}

        {!loading &&
          dataSelecionada && (

            <Card className="overflow-hidden">

              {/* Cabeçalho */}

              <div
                className="
                  px-6
                  py-5
                  border-b
                  border-zinc-800
                  bg-zinc-900/30
                "
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-violet-500/10
                        border
                        border-violet-500/20
                        flex
                        items-center
                        justify-center
                        text-violet-400
                        text-xl
                      "
                    >
                      📅
                    </div>

                    <div>

                      <h2 className="text-lg font-semibold text-white capitalize">
                        {formatarData(
                          dataSelecionada
                        )}
                      </h2>

                      <p className="text-sm text-zinc-500 mt-1">
                        {agendamentosSelecionados.length}{" "}
                        {agendamentosSelecionados.length === 1
                          ? "agendamento"
                          : "agendamentos"}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Nenhum agendamento */}

              {agendamentosSelecionados.length ===
              0 ? (

                <div className="p-8 text-center">

                  <div className="text-3xl mb-3">
                    📅
                  </div>

                  <p className="text-zinc-500">
                    Nenhum agendamento para este dia.
                  </p>

                </div>

              ) : (

                /* Lista de agendamentos */

                <div className="divide-y divide-zinc-800">

                  {agendamentosSelecionados.map(
                    (agendamento) => {

                      const status =
                        getStatusStyle(
                          agendamento.status
                        );

                      const carregando =
                        actionLoading ===
                        agendamento.id;

                      return (
                        <div
                          key={
                            agendamento.id
                          }
                          className="
                            px-6
                            py-6
                            flex
                            flex-col
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                            gap-6
                          "
                        >

                          {/* Informações */}

                          <div className="flex items-start gap-4">

                            <div
                              className="
                                w-12
                                h-12
                                rounded-xl
                                bg-zinc-900
                                border
                                border-zinc-800
                                flex
                                items-center
                                justify-center
                                text-lg
                                flex-shrink-0
                              "
                            >
                              👤
                            </div>

                            <div>

                              <h3 className="text-white font-semibold text-lg">
                                {
                                  agendamento.aluno_nome
                                }
                              </h3>

                              <p className="text-zinc-400 mt-1">
                                🕐{" "}
                                {formatarHora(
                                  agendamento.hora_inicio
                                )}
                                {" → "}
                                {formatarHora(
                                  agendamento.hora_fim
                                )}
                              </p>

                              <span
                                className={`
                                  inline-flex
                                  mt-3
                                  px-2.5
                                  py-1
                                  rounded-full
                                  text-xs
                                  font-medium
                                  ${status.className}
                                `}
                              >
                                {status.label}
                              </span>

                            </div>

                          </div>

                          {/* Ações */}

                          <div className="flex flex-wrap items-center gap-3">

                            {agendamento.status ===
                              "pendente" && (

                              <>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    handleConfirmar(
                                      agendamento.id
                                    )
                                  }
                                  disabled={
                                    carregando
                                  }
                                >
                                  {carregando
                                    ? "Processando..."
                                    : "Confirmar"}
                                </Button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCancelar(
                                      agendamento.id
                                    )
                                  }
                                  disabled={
                                    carregando
                                  }
                                  className="
                                    h-10
                                    px-4
                                    rounded-xl
                                    border
                                    border-red-500/20
                                    text-red-400
                                    text-sm
                                    font-semibold
                                    hover:bg-red-500/10
                                    transition
                                    disabled:opacity-50
                                  "
                                >
                                  Cancelar
                                </button>
                              </>
                            )}

                            {agendamento.status ===
                              "confirmado" && (

                              <>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    handleConcluir(
                                      agendamento.id
                                    )
                                  }
                                  disabled={
                                    carregando
                                  }
                                >
                                  {carregando
                                    ? "Processando..."
                                    : "Concluir"}
                                </Button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCancelar(
                                      agendamento.id
                                    )
                                  }
                                  disabled={
                                    carregando
                                  }
                                  className="
                                    h-10
                                    px-4
                                    rounded-xl
                                    border
                                    border-red-500/20
                                    text-red-400
                                    text-sm
                                    font-semibold
                                    hover:bg-red-500/10
                                    transition
                                    disabled:opacity-50
                                  "
                                >
                                  Cancelar
                                </button>
                              </>
                            )}

                            {agendamento.status ===
                              "concluido" && (

                              <span className="text-sm text-green-400">
                                Aula concluída
                              </span>
                            )}

                            {agendamento.status ===
                              "cancelado" && (

                              <span className="text-sm text-red-400">
                                Agendamento cancelado
                              </span>
                            )}

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              )}

            </Card>
          )}

        {/* =====================================================
            NENHUM DIA SELECIONADO
        ====================================================== */}

        {!loading &&
          !dataSelecionada && (

            <Card className="p-8">

              <div className="text-center">

                <div className="text-4xl mb-4">
                  📅
                </div>

                <h2 className="text-xl font-semibold text-white">
                  Selecione um dia
                </h2>

                <p className="text-zinc-500 mt-2">
                  Clique em uma data no calendário para
                  visualizar os agendamentos.
                </p>

              </div>

            </Card>
          )}

      </div>

    </DashboardLayout>
  );
}