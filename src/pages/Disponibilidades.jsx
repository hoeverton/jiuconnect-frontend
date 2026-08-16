import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  getMyDisponibilidades,
  createDisponibilidade,
  updateDisponibilidade,
  deleteDisponibilidade,
} from "../services/disponibilidadeService";

export default function Disponibilidades() {
  const [disponibilidades, setDisponibilidades] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

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

  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");

  // =========================================================
  // CARREGAR DISPONIBILIDADES
  // =========================================================

  async function loadDisponibilidades() {
    try {
      setError("");

      const response = await getMyDisponibilidades();

      setDisponibilidades(response.results || []);
    } catch (error) {
      console.error(
        "Erro ao carregar disponibilidades:",
        error
      );

      setError(
        "Não foi possível carregar suas disponibilidades."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDisponibilidades();
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
  // FILTRAR DISPONIBILIDADES DO MÊS
  // =========================================================

  const disponibilidadesDoMes = useMemo(() => {
    const ano = mesAtual.getFullYear();

    const mes = String(
      mesAtual.getMonth() + 1
    ).padStart(2, "0");

    const prefixo = `${ano}-${mes}`;

    return disponibilidades.filter(
      (item) =>
        item.data.startsWith(prefixo)
    );
  }, [disponibilidades, mesAtual]);

  // =========================================================
  // DATAS QUE POSSUEM DISPONIBILIDADE
  // =========================================================

  const datasComDisponibilidade = useMemo(() => {
    return new Set(
      disponibilidadesDoMes.map(
        (item) => item.data
      )
    );
  }, [disponibilidadesDoMes]);

  // =========================================================
  // HORÁRIOS DO DIA SELECIONADO
  // =========================================================

  const horariosSelecionados = useMemo(() => {
    if (!dataSelecionada) {
      return [];
    }

    return disponibilidades.filter(
      (item) =>
        item.data === dataSelecionada
    );
  }, [
    disponibilidades,
    dataSelecionada,
  ]);

  // =========================================================
  // GERAR DIAS DO CALENDÁRIO
  // =========================================================

  const diasDoMes = useMemo(() => {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();

    const primeiroDia = new Date(
      ano,
      mes,
      1
    );

    const ultimoDia = new Date(
      ano,
      mes + 1,
      0
    );

    let diaSemana =
      primeiroDia.getDay();

    // Segunda-feira = primeiro dia da semana
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
  // NAVEGAR MÊS ANTERIOR
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

  // =========================================================
  // NAVEGAR PRÓXIMO MÊS
  // =========================================================

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
  // CRIAR DATA YYYY-MM-DD
  // =========================================================

  function criarDataDoDia(dia) {
    const ano =
      mesAtual.getFullYear();

    const mes = String(
      mesAtual.getMonth() + 1
    ).padStart(2, "0");

    const diaFormatado = String(
      dia
    ).padStart(2, "0");

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
  // LIMPAR FORMULÁRIO
  // =========================================================

  function clearForm() {
    setData("");
    setHoraInicio("");
    setHoraFim("");
    setEditingId(null);
  }

  // =========================================================
  // ABRIR FORMULÁRIO PARA CRIAR
  // =========================================================

  function openCreateForm() {
    clearForm();

    if (dataSelecionada) {
      setData(dataSelecionada);
    }

    setError("");
    setMessage("");

    setShowForm(true);
  }

  // =========================================================
  // ABRIR FORMULÁRIO PARA EDITAR
  // =========================================================

  function openEditForm(item) {
    setData(item.data);

    setHoraInicio(
      item.hora_inicio.slice(0, 5)
    );

    setHoraFim(
      item.hora_fim.slice(0, 5)
    );

    setEditingId(item.id);

    setDataSelecionada(item.data);

    setError("");
    setMessage("");

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================================
  // FECHAR FORMULÁRIO
  // =========================================================

  function closeForm() {
    clearForm();

    setShowForm(false);

    setError("");
  }

  // =========================================================
  // SALVAR DISPONIBILIDADE
  // =========================================================

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (
      !data ||
      !horaInicio ||
      !horaFim
    ) {
      setError(
        "Preencha a data, hora inicial e hora final."
      );

      return;
    }

    if (horaInicio >= horaFim) {
      setError(
        "A hora final deve ser maior que a hora inicial."
      );

      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        await updateDisponibilidade(
          editingId,
          {
            data,
            hora_inicio: horaInicio,
            hora_fim: horaFim,
          }
        );

        setMessage(
          "Horário atualizado com sucesso."
        );
      } else {
        await createDisponibilidade({
          data,
          hora_inicio: horaInicio,
          hora_fim: horaFim,
          disponivel: true,
        });

        setMessage(
          "Horário adicionado com sucesso."
        );
      }

      setDataSelecionada(data);

      clearForm();

      setShowForm(false);

      await loadDisponibilidades();

    } catch (error) {
      console.error(
        "Erro ao salvar disponibilidade:",
        error
      );

      setError(
        "Não foi possível salvar esse horário."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // EXCLUIR DISPONIBILIDADE
  // =========================================================

  async function handleDelete(id) {
    const confirmed =
      window.confirm(
        "Tem certeza que deseja excluir este horário?"
      );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");
    setDeletingId(id);

    try {
      await deleteDisponibilidade(id);

      setMessage(
        "Horário excluído com sucesso."
      );

      await loadDisponibilidades();

    } catch (error) {
      console.error(
        "Erro ao excluir disponibilidade:",
        error
      );

      setError(
        "Não foi possível excluir esse horário."
      );
    } finally {
      setDeletingId(null);
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

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Disponibilidades
            </h1>

            <p className="text-zinc-500 mt-2">
              Gerencie os dias e horários em que você oferece aulas.
            </p>

          </div>

          <Button
            onClick={
              showForm
                ? closeForm
                : openCreateForm
            }
          >
            {showForm
              ? "Cancelar"
              : "+ Adicionar horário"}
          </Button>

        </div>

        {/* =====================================================
            MENSAGEM DE SUCESSO
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

        {/* =====================================================
            MENSAGEM DE ERRO
        ====================================================== */}

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
                {disponibilidadesDoMes.length}{" "}
                {disponibilidadesDoMes.length === 1
                  ? "horário cadastrado"
                  : "horários cadastrados"}
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
            MINI CALENDÁRIO
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

                const possuiHorario =
                  datasComDisponibilidade.has(
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
                          : possuiHorario
                          ? "bg-violet-500/20 border border-violet-500/40 text-violet-300 hover:bg-violet-500/30"
                          : "border border-transparent text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }
                    `}
                  >

                    <span>
                      {dia}
                    </span>

                    {possuiHorario &&
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
            FORMULÁRIO
        ====================================================== */}

        {showForm && (
          <Card className="p-6">

            <div className="mb-6">

              <h2 className="text-xl font-semibold text-white">
                {editingId
                  ? "Editar horário"
                  : "Adicionar horário"}
              </h2>

              <p className="text-zinc-500 text-sm mt-1">
                {editingId
                  ? "Atualize os dados deste horário."
                  : "Informe quando você estará disponível para dar aulas."}
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >

              {/* DATA */}

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Data
                </label>

                <input
                  type="date"
                  value={data}
                  onChange={(event) =>
                    setData(
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-900/60
                    px-4
                    text-white
                    outline-none
                    focus:border-violet-500
                    focus:ring-2
                    focus:ring-violet-500/20
                  "
                />

              </div>

              {/* HORA INICIAL */}

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Hora inicial
                </label>

                <input
                  type="time"
                  value={horaInicio}
                  onChange={(event) =>
                    setHoraInicio(
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-900/60
                    px-4
                    text-white
                    outline-none
                    focus:border-violet-500
                    focus:ring-2
                    focus:ring-violet-500/20
                  "
                />

              </div>

              {/* HORA FINAL */}

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Hora final
                </label>

                <input
                  type="time"
                  value={horaFim}
                  onChange={(event) =>
                    setHoraFim(
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-900/60
                    px-4
                    text-white
                    outline-none
                    focus:border-violet-500
                    focus:ring-2
                    focus:ring-violet-500/20
                  "
                />

              </div>

              {/* BOTÕES */}

              <div className="md:col-span-3 flex justify-end gap-3">

                <Button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  variant="outline"
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Salvando..."
                    : editingId
                    ? "Salvar alterações"
                    : "Adicionar horário"}
                </Button>

              </div>

            </form>

          </Card>
        )}

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (
          <Card className="p-6">

            <p className="text-zinc-400">
              Carregando disponibilidades...
            </p>

          </Card>
        )}

        {/* =====================================================
            DIA SELECIONADO
        ====================================================== */}

        {!loading &&
          dataSelecionada && (

            <Card className="overflow-hidden">

              {/* Cabeçalho do dia */}

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
                      🗓️
                    </div>

                    <div>

                      <h2 className="text-lg font-semibold text-white capitalize">
                        {formatarData(
                          dataSelecionada
                        )}
                      </h2>

                      <p className="text-sm text-zinc-500 mt-1">
                        {horariosSelecionados.length}{" "}
                        {horariosSelecionados.length === 1
                          ? "horário cadastrado"
                          : "horários cadastrados"}
                      </p>

                    </div>

                  </div>

                  <Button
                    onClick={
                      openCreateForm
                    }
                  >
                    + Adicionar horário
                  </Button>

                </div>

              </div>

              {/* Nenhum horário */}

              {horariosSelecionados.length ===
              0 ? (

                <div className="p-8 text-center">

                  <p className="text-zinc-500">
                    Nenhum horário cadastrado para este dia.
                  </p>

                  <div className="mt-5 flex justify-center">

                    <Button
                      onClick={
                        openCreateForm
                      }
                    >
                      + Adicionar horário
                    </Button>

                  </div>

                </div>

              ) : (

                /* Lista de horários */

                <div className="divide-y divide-zinc-800">

                  {horariosSelecionados.map(
                    (item) => (

                      <div
                        key={item.id}
                        className="
                          px-6
                          py-5
                          flex
                          flex-col
                          md:flex-row
                          md:items-center
                          md:justify-between
                          gap-4
                        "
                      >

                        {/* HORÁRIO */}

                        <div className="flex items-center gap-4">

                          <div
                            className="
                              w-11
                              h-11
                              rounded-lg
                              bg-zinc-900
                              border
                              border-zinc-800
                              flex
                              items-center
                              justify-center
                              text-zinc-300
                              text-lg
                            "
                          >
                            🕐
                          </div>

                          <div>

                            <p className="text-white font-semibold text-lg">

                              {item.hora_inicio.slice(
                                0,
                                5
                              )}

                              {" → "}

                              {item.hora_fim.slice(
                                0,
                                5
                              )}

                            </p>

                            <span
                              className={`
                                inline-flex
                                mt-1
                                px-2.5
                                py-1
                                rounded-full
                                text-xs
                                font-medium

                                ${
                                  item.disponivel
                                    ? "bg-green-500/10 text-green-400"
                                    : "bg-red-500/10 text-red-400"
                                }
                              `}
                            >
                              {item.disponivel
                                ? "Disponível"
                                : "Ocupado"}
                            </span>

                          </div>

                        </div>

                        {/* AÇÕES */}

                        <div className="flex items-center gap-3">

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              openEditForm(
                                item
                              )
                            }
                            disabled={
                              deletingId ===
                              item.id
                            }
                          >
                            Editar
                          </Button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                            disabled={
                              deletingId ===
                              item.id
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
                              disabled:cursor-not-allowed
                            "
                          >
                            {deletingId ===
                            item.id
                              ? "Excluindo..."
                              : "Excluir"}
                          </button>

                        </div>

                      </div>

                    )
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
                  🗓️
                </div>

                <h2 className="text-xl font-semibold text-white">
                  Selecione um dia
                </h2>

                <p className="text-zinc-500 mt-2">
                  Clique em uma data no calendário para visualizar
                  seus horários.
                </p>

              </div>

            </Card>
          )}

      </div>

    </DashboardLayout>
  );
}