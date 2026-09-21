import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  User,
  X,
  Check,
  Ban,
  CheckCircle2,
  List,
  CalendarRange,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getProfessorAgendamentos,
  confirmarAgendamento,
  cancelarAgendamento,
  concluirAgendamento,
} from "../services/agendamentoService";

export default function Agenda() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [visualizacao, setVisualizacao] = useState("semana");

  const [dataAtual, setDataAtual] = useState(
    new Date()
  );

  const [agendamentoSelecionado, setAgendamentoSelecionado] =
    useState(null);

  const [processando, setProcessando] = useState(false);

  async function carregarAgendamentos() {
    try {
      setLoading(true);
      setErro("");

      const response = await getProfessorAgendamentos();

      const dados = Array.isArray(response)
        ? response
        : Array.isArray(response?.results)
          ? response.results
          : [];

      setAgendamentos(dados);
    } catch (error) {
      console.error(error);
      setErro(
        "Não foi possível carregar seus agendamentos."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  /*
   * =========================================================
   * AÇÕES DE NAVEGAÇÃO
   * =========================================================
   */

  function irParaHoje() {
    setDataAtual(new Date());
  }

  function navegarAnterior() {
    const novaData = new Date(dataAtual);

    if (visualizacao === "mes") {
      novaData.setMonth(
        novaData.getMonth() - 1
      );
    } else if (visualizacao === "dia") {
      novaData.setDate(
        novaData.getDate() - 1
      );
    } else {
      novaData.setDate(
        novaData.getDate() - 7
      );
    }

    setDataAtual(novaData);
  }

  function navegarProximo() {
    const novaData = new Date(dataAtual);

    if (visualizacao === "mes") {
      novaData.setMonth(
        novaData.getMonth() + 1
      );
    } else if (visualizacao === "dia") {
      novaData.setDate(
        novaData.getDate() + 1
      );
    } else {
      novaData.setDate(
        novaData.getDate() + 7
      );
    }

    setDataAtual(novaData);
  }

  /*
   * =========================================================
   * AÇÕES DOS AGENDAMENTOS
   * =========================================================
   */

  async function executarAcao(acao) {
    if (!agendamentoSelecionado) return;

    try {
      setProcessando(true);

      const id = agendamentoSelecionado.id;

      if (acao === "confirmar") {
        await confirmarAgendamento(id);
      }

      if (acao === "cancelar") {
        await cancelarAgendamento(id);
      }

      if (acao === "concluir") {
        await concluirAgendamento(id);
      }

      setAgendamentoSelecionado(null);

      await carregarAgendamentos();
    } catch (error) {
      console.error(error);

      alert(
        "Não foi possível realizar essa ação."
      );
    } finally {
      setProcessando(false);
    }
  }

  /*
   * =========================================================
   * DADOS
   * =========================================================
   */

  const semanaAtual = useMemo(
    () => gerarSemana(dataAtual),
    [dataAtual]
  );

  const diasDoMes = useMemo(
    () => gerarCalendarioMes(dataAtual),
    [dataAtual]
  );

  const aulasHoje = useMemo(() => {
    const hoje = formatarDataAPI(
      new Date()
    );

    return agendamentos
      .filter(
        (aula) => aula.data === hoje
      )
      .sort(compararHorario);
  }, [agendamentos]);

  /*
   * =========================================================
   * TÍTULO
   * =========================================================
   */

  function tituloPeriodo() {
    if (visualizacao === "dia") {
      return formatarDataCompleta(
        formatarDataAPI(dataAtual)
      );
    }

    if (visualizacao === "mes") {
      return dataAtual.toLocaleDateString(
        "pt-BR",
        {
          month: "long",
          year: "numeric",
        }
      );
    }

    return formatarPeriodoSemana(
      semanaAtual[0],
      semanaAtual[6]
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-[1800px] mx-auto space-y-6">

        {/* =====================================================
            CABEÇALHO
        ====================================================== */}

        <div className="
          flex
          flex-col
          gap-5
          xl:flex-row
          xl:items-center
          xl:justify-between
        ">

          <div className="flex items-center gap-3">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-violet-600/15
              border
              border-violet-500/20
              flex
              items-center
              justify-center
              shrink-0
            ">
              <CalendarDays
                size={22}
                className="text-violet-400"
              />
            </div>

            <div>

              <h1 className="
                text-2xl
                md:text-3xl
                font-black
                text-white
              ">
                Minha Agenda
              </h1>

              <p className="
                text-zinc-500
                text-sm
                md:text-base
                mt-1
              ">
                Gerencie suas aulas e horários
              </p>

            </div>

          </div>

          {/* =================================================
              CONTROLES
          ================================================== */}

          <div className="
            flex
            flex-wrap
            items-center
            gap-2
          ">

            <button
              onClick={irParaHoje}
              className="
                px-4
                py-2.5
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                text-zinc-200
                text-sm
                font-semibold
                hover:bg-zinc-800
                transition
              "
            >
              Hoje
            </button>

            <button
              onClick={navegarAnterior}
              className="
                w-11
                h-11
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                flex
                items-center
                justify-center
                text-zinc-300
                hover:bg-zinc-800
                hover:text-white
                transition
              "
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={navegarProximo}
              className="
                w-11
                h-11
                rounded-xl
                border
                border-zinc-700
                bg-zinc-900
                flex
                items-center
                justify-center
                text-zinc-300
                hover:bg-zinc-800
                hover:text-white
                transition
              "
            >
              <ChevronRight size={20} />
            </button>

          </div>

        </div>

        {/* =====================================================
            SELETOR DE VISUALIZAÇÃO
        ====================================================== */}

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        ">

          <div>

            <h2 className="
              text-lg
              md:text-xl
              font-bold
              text-white
              capitalize
            ">
              {tituloPeriodo()}
            </h2>

            <p className="
              text-zinc-500
              text-sm
              mt-1
            ">
              {agendamentos.length} agendamento(s)
            </p>

          </div>

          <div className="
            flex
            w-full
            sm:w-auto
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900
            p-1
          ">

            <BotaoVisualizacao
              ativo={visualizacao === "dia"}
              onClick={() =>
                setVisualizacao("dia")
              }
              icone={<List size={16} />}
            >
              Hoje
            </BotaoVisualizacao>

            <BotaoVisualizacao
              ativo={visualizacao === "semana"}
              onClick={() =>
                setVisualizacao("semana")
              }
              icone={<CalendarRange size={16} />}
            >
              Semana
            </BotaoVisualizacao>

            <BotaoVisualizacao
              ativo={visualizacao === "mes"}
              onClick={() =>
                setVisualizacao("mes")
              }
              icone={<CalendarDays size={16} />}
            >
              Mês
            </BotaoVisualizacao>

          </div>

        </div>

        {/* =====================================================
            ERRO
        ====================================================== */}

        {erro && (
          <div className="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-300
          ">
            {erro}
          </div>
        )}

        {/* =====================================================
            CONTEÚDO
        ====================================================== */}

        {loading ? (

          <div className="
            min-h-[450px]
            rounded-2xl
            border
            border-zinc-800
            bg-[#0B0B0E]
            flex
            items-center
            justify-center
          ">
            <div className="text-zinc-500">
              Carregando agenda...
            </div>
          </div>

        ) : (

          <>
            {visualizacao === "dia" && (
              <AgendaDia
                data={dataAtual}
                agendamentos={agendamentos}
                onSelecionar={
                  setAgendamentoSelecionado
                }
              />
            )}

            {visualizacao === "semana" && (
              <AgendaSemana
                dias={semanaAtual}
                agendamentos={agendamentos}
                onSelecionar={
                  setAgendamentoSelecionado
                }
              />
            )}

            {visualizacao === "mes" && (
              <AgendaMes
                dias={diasDoMes}
                agendamentos={agendamentos}
                onSelecionar={
                  setAgendamentoSelecionado
                }
              />
            )}
          </>

        )}

        {/* =====================================================
            RESUMO
        ====================================================== */}

        <ResumoAgenda
          agendamentos={agendamentos}
        />

      </div>

      {/* =======================================================
          MODAL
      ======================================================== */}

      {agendamentoSelecionado && (
        <ModalAgendamento
          aula={agendamentoSelecionado}
          fechar={() =>
            !processando &&
            setAgendamentoSelecionado(null)
          }
          executarAcao={executarAcao}
          processando={processando}
        />
      )}

    </DashboardLayout>
  );
}

/* =============================================================
   BOTÃO VISUALIZAÇÃO
============================================================= */

function BotaoVisualizacao({
  ativo,
  onClick,
  children,
  icone,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1
        sm:flex-none
        flex
        items-center
        justify-center
        gap-2
        px-3
        sm:px-4
        py-2
        rounded-lg
        text-xs
        sm:text-sm
        font-semibold
        transition
        ${
          ativo
            ? "bg-violet-600 text-white"
            : "text-zinc-400 hover:text-white"
        }
      `}
    >
      {icone}
      {children}
    </button>
  );
}

/* =============================================================
   AGENDA DO DIA
============================================================= */

function AgendaDia({
  data,
  agendamentos,
  onSelecionar,
}) {
  const aulas = agendamentos
    .filter(
      (aula) =>
        aula.data ===
        formatarDataAPI(data)
    )
    .sort(compararHorario);

  return (
    <div className="
      rounded-2xl
      border
      border-zinc-800
      bg-[#0B0B0E]
      overflow-hidden
    ">

      <div className="
        p-5
        border-b
        border-zinc-800
      ">

        <p className="
          text-xs
          uppercase
          tracking-wider
          text-zinc-500
          font-semibold
        ">
          {data.toLocaleDateString(
            "pt-BR",
            {
              weekday: "long",
            }
          )}
        </p>

        <p className="
          text-2xl
          font-black
          text-white
          mt-1
        ">
          {formatarDataCompleta(
            formatarDataAPI(data)
          )}
        </p>

      </div>

      <div className="p-5">

        {aulas.length === 0 ? (
          <EstadoVazio />
        ) : (
          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-4
          ">
            {aulas.map((aula) => (
              <AulaCard
                key={aula.id}
                aula={aula}
                onClick={() =>
                  onSelecionar(aula)
                }
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

/* =============================================================
   AGENDA SEMANAL
============================================================= */

function AgendaSemana({
  dias,
  agendamentos,
  onSelecionar,
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-zinc-800
      bg-[#0B0B0E]
      overflow-hidden
    ">

      <div className="overflow-x-auto">

        <div className="min-w-[1050px]">

          {/* CABEÇALHO */}

          <div className="
            grid
            grid-cols-7
            border-b
            border-zinc-800
          ">

            {dias.map((dia) => (
              <CabecalhoDia
                key={formatarDataAPI(dia)}
                dia={dia}
              />
            ))}

          </div>

          {/* CONTEÚDO */}

          <div className="
            grid
            grid-cols-7
          ">

            {dias.map((dia) => {

              const aulas =
                agendamentos
                  .filter(
                    (aula) =>
                      aula.data ===
                      formatarDataAPI(dia)
                  )
                  .sort(compararHorario);

              return (
                <div
                  key={formatarDataAPI(dia)}
                  className={`
                    min-h-[500px]
                    p-3
                    border-r
                    border-zinc-800
                    last:border-r-0
                    ${
                      isHoje(dia)
                        ? "bg-violet-600/[0.025]"
                        : ""
                    }
                  `}
                >

                  {aulas.length === 0 ? (
                    <div className="
                      h-full
                      flex
                      items-center
                      justify-center
                      text-center
                    ">
                      <div>

                        <CalendarDays
                          size={24}
                          className="
                            mx-auto
                            text-zinc-800
                          "
                        />

                        <p className="
                          text-xs
                          text-zinc-700
                          mt-2
                        ">
                          Sem aulas
                        </p>

                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">

                      {aulas.map((aula) => (
                        <AulaCard
                          key={aula.id}
                          aula={aula}
                          onClick={() =>
                            onSelecionar(aula)
                          }
                        />
                      ))}

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}

/* =============================================================
   AGENDA MENSAL
============================================================= */

function AgendaMes({
  dias,
  agendamentos,
  onSelecionar,
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-zinc-800
      bg-[#0B0B0E]
      overflow-hidden
    ">

      {/* DIAS DA SEMANA */}

      <div className="
        grid
        grid-cols-7
        border-b
        border-zinc-800
      ">

        {[
          "Dom",
          "Seg",
          "Ter",
          "Qua",
          "Qui",
          "Sex",
          "Sáb",
        ].map((dia) => (
          <div
            key={dia}
            className="
              p-3
              md:p-4
              text-center
              text-xs
              md:text-sm
              uppercase
              tracking-wide
              font-bold
              text-zinc-500
              border-r
              border-zinc-800
              last:border-r-0
            "
          >
            {dia}
          </div>
        ))}

      </div>

      {/* CALENDÁRIO */}

      <div className="
        grid
        grid-cols-7
      ">

        {dias.map((dia, index) => {

          const aulas = dia.data
            ? agendamentos
                .filter(
                  (aula) =>
                    aula.data ===
                    dia.data
                )
                .sort(compararHorario)
            : [];

          return (
            <div
              key={`${dia.data || "vazio"}-${index}`}
              className={`
                min-h-[105px]
                md:min-h-[140px]
                p-2
                md:p-3
                border-r
                border-b
                border-zinc-800
                ${
                  !dia.data
                    ? "bg-zinc-950/50"
                    : ""
                }
                ${
                  dia.data &&
                  isHoje(
                    stringParaData(
                      dia.data
                    )
                  )
                    ? "bg-violet-600/[0.035]"
                    : ""
                }
              `}
            >

              {dia.data && (
                <>

                  <div className="
                    flex
                    items-center
                    justify-between
                  ">

                    <span
                      className={`
                        w-7
                        h-7
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-xs
                        md:text-sm
                        font-bold
                        ${
                          isHoje(
                            stringParaData(
                              dia.data
                            )
                          )
                            ? "bg-violet-600 text-white"
                            : "text-zinc-300"
                        }
                      `}
                    >
                      {dia.dia}
                    </span>

                    {aulas.length > 0 && (
                      <span className="
                        text-[10px]
                        md:text-xs
                        text-violet-400
                        font-bold
                      ">
                        {aulas.length}
                      </span>
                    )}

                  </div>

                  <div className="
                    mt-2
                    space-y-1
                  ">

                    {aulas
                      .slice(0, 3)
                      .map((aula) => (
                        <button
                          key={aula.id}
                          onClick={() =>
                            onSelecionar(aula)
                          }
                          className="
                            w-full
                            text-left
                            rounded-lg
                            bg-violet-600/10
                            border
                            border-violet-500/10
                            px-2
                            py-1.5
                            hover:bg-violet-600/20
                            transition
                          "
                        >

                          <p className="
                            text-[10px]
                            md:text-xs
                            text-violet-300
                            font-bold
                          ">
                            {formatarHora(
                              aula.hora_inicio
                            )}
                          </p>

                          <p className="
                            hidden
                            md:block
                            text-[10px]
                            text-zinc-400
                            truncate
                          ">
                            {aula.aluno_nome ||
                              "Aluno"}
                          </p>

                        </button>
                      ))}

                    {aulas.length > 3 && (
                      <p className="
                        text-[10px]
                        text-zinc-600
                        px-1
                      ">
                        + {aulas.length - 3} aula(s)
                      </p>
                    )}

                  </div>

                </>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}

/* =============================================================
   CABEÇALHO DIA
============================================================= */

function CabecalhoDia({ dia }) {
  return (
    <div
      className={`
        min-h-[90px]
        p-4
        border-r
        border-zinc-800
        last:border-r-0
        ${
          isHoje(dia)
            ? "bg-violet-600/5"
            : ""
        }
      `}
    >

      <p className="
        text-xs
        uppercase
        tracking-wider
        text-zinc-500
        font-semibold
      ">
        {dia.toLocaleDateString(
          "pt-BR",
          {
            weekday: "short",
          }
        )}
      </p>

      <div className="
        flex
        items-center
        gap-2
        mt-2
      ">

        <span
          className={`
            text-2xl
            font-black
            ${
              isHoje(dia)
                ? "text-violet-400"
                : "text-white"
            }
          `}
        >
          {dia.getDate()}
        </span>

        <span className="
          text-xs
          text-zinc-600
        ">
          {dia.toLocaleDateString(
            "pt-BR",
            {
              month: "short",
            }
          )}
        </span>

      </div>

      {isHoje(dia) && (
        <span className="
          inline-block
          mt-2
          text-[10px]
          uppercase
          font-bold
          text-violet-400
        ">
          Hoje
        </span>
      )}

    </div>
  );
}

/* =============================================================
   CARD DA AULA
============================================================= */

function AulaCard({
  aula,
  onClick,
}) {
  const status =
    aula.status || "pendente";

  const configuracao = {
    pendente: {
      label: "Pendente",
      classe:
        "border-yellow-500/20 bg-yellow-500/5",
      bolinha: "bg-yellow-500",
      texto: "text-yellow-400",
    },

    confirmado: {
      label: "Confirmado",
      classe:
        "border-emerald-500/20 bg-emerald-500/5",
      bolinha: "bg-emerald-500",
      texto: "text-emerald-400",
    },

    concluido: {
      label: "Concluído",
      classe:
        "border-zinc-700 bg-zinc-900/70",
      bolinha: "bg-zinc-500",
      texto: "text-zinc-400",
    },

    cancelado: {
      label: "Cancelado",
      classe:
        "border-red-500/20 bg-red-500/5",
      bolinha: "bg-red-500",
      texto: "text-red-400",
    },
  };

  const config =
    configuracao[status] ||
    configuracao.pendente;

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        text-left
        rounded-xl
        border
        p-3
        ${config.classe}
        hover:border-violet-500/40
        hover:bg-zinc-900
        transition-all
        duration-200
      `}
    >

      <div className="
        flex
        items-center
        justify-between
        gap-2
      ">

        <div className="
          flex
          items-center
          gap-2
        ">

          <Clock3
            size={14}
            className="text-zinc-500"
          />

          <span className="
            text-sm
            font-bold
            text-white
          ">
            {formatarHora(
              aula.hora_inicio
            )}
          </span>

        </div>

        <span
          className={`
            w-2
            h-2
            rounded-full
            ${config.bolinha}
          `}
        />

      </div>

      <div className="
        flex
        items-center
        gap-2
        mt-3
      ">

        <div className="
          w-8
          h-8
          rounded-full
          bg-zinc-800
          flex
          items-center
          justify-center
          shrink-0
        ">

          <User
            size={14}
            className="text-zinc-500"
          />

        </div>

        <div className="min-w-0">

          <p className="
            text-sm
            font-semibold
            text-white
            truncate
          ">
            {aula.aluno_nome ||
              "Aluno"}
          </p>

          <p className="
            text-[11px]
            text-zinc-500
            truncate
          ">
            {formatarHora(
              aula.hora_inicio
            )}
            {" → "}
            {formatarHora(
              aula.hora_fim
            )}
          </p>

        </div>

      </div>

      <div className="mt-3">

        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            text-[10px]
            font-bold
            uppercase
            tracking-wide
            ${config.texto}
          `}
        >

          <span
            className={`
              w-1.5
              h-1.5
              rounded-full
              ${config.bolinha}
            `}
          />

          {config.label}

        </span>

      </div>

    </button>
  );
}

/* =============================================================
   RESUMO
============================================================= */

function ResumoAgenda({
  agendamentos,
}) {
  const pendentes =
    agendamentos.filter(
      (aula) =>
        aula.status === "pendente"
    ).length;

  const confirmados =
    agendamentos.filter(
      (aula) =>
        aula.status === "confirmado"
    ).length;

  const concluidos =
    agendamentos.filter(
      (aula) =>
        aula.status === "concluido"
    ).length;

  return (
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-3
      gap-4
    ">

      <ResumoCard
        label="Pendentes"
        valor={pendentes}
        texto="Aguardando confirmação"
        icone={
          <Clock3 size={20} />
        }
      />

      <ResumoCard
        label="Confirmadas"
        valor={confirmados}
        texto="Aulas confirmadas"
        icone={
          <CheckCircle2 size={20} />
        }
      />

      <ResumoCard
        label="Concluídas"
        valor={concluidos}
        texto="Aulas realizadas"
        icone={
          <Check size={20} />
        }
      />

    </div>
  );
}

function ResumoCard({
  label,
  valor,
  texto,
  icone,
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-zinc-800
      bg-[#0B0B0E]
      p-5
      flex
      items-center
      gap-4
    ">

      <div className="
        w-11
        h-11
        rounded-xl
        bg-violet-600/10
        text-violet-400
        flex
        items-center
        justify-center
        shrink-0
      ">
        {icone}
      </div>

      <div>

        <p className="
          text-zinc-500
          text-sm
        ">
          {label}
        </p>

        <p className="
          text-2xl
          font-black
          text-white
        ">
          {valor}
        </p>

        <p className="
          text-xs
          text-zinc-600
          mt-1
        ">
          {texto}
        </p>

      </div>

    </div>
  );
}

/* =============================================================
   ESTADO VAZIO
============================================================= */

function EstadoVazio() {
  return (
    <div className="
      min-h-[250px]
      flex
      items-center
      justify-center
      text-center
    ">

      <div>

        <div className="
          w-14
          h-14
          rounded-2xl
          bg-zinc-900
          mx-auto
          flex
          items-center
          justify-center
        ">
          <CalendarDays
            size={25}
            className="text-zinc-700"
          />
        </div>

        <p className="
          text-white
          font-semibold
          mt-4
        ">
          Nenhuma aula
        </p>

        <p className="
          text-zinc-600
          text-sm
          mt-1
        ">
          Não existem aulas agendadas para este dia.
        </p>

      </div>

    </div>
  );
}

/* =============================================================
   MODAL
============================================================= */

function ModalAgendamento({
  aula,
  fechar,
  executarAcao,
  processando,
}) {
  const status =
    aula.status || "pendente";

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-black/70
        backdrop-blur-sm
        p-4
        flex
        items-center
        justify-center
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          fechar();
        }
      }}
    >

      <div className="
        w-full
        max-w-lg
        max-h-[90vh]
        overflow-y-auto
        rounded-2xl
        border
        border-zinc-800
        bg-[#0B0B0E]
        shadow-2xl
        overflow-hidden
      ">

        {/* CABEÇALHO */}

        <div className="
          flex
          items-center
          justify-between
          p-5
          border-b
          border-zinc-800
        ">

          <div>

            <h3 className="
              text-xl
              font-bold
              text-white
            ">
              Detalhes da aula
            </h3>

            <p className="
              text-sm
              text-zinc-500
              mt-1
            ">
              Informações do agendamento
            </p>

          </div>

          <button
            onClick={fechar}
            disabled={processando}
            className="
              w-9
              h-9
              rounded-lg
              bg-zinc-900
              text-zinc-400
              flex
              items-center
              justify-center
              hover:text-white
              hover:bg-zinc-800
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* CONTEÚDO */}

        <div className="
          p-5
          space-y-5
        ">

          <div className="
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900/50
            p-4
          ">

            <div className="
              flex
              items-center
              gap-3
            ">

              <div className="
                w-12
                h-12
                rounded-full
                bg-violet-600/15
                flex
                items-center
                justify-center
              ">
                <User
                  size={21}
                  className="text-violet-400"
                />
              </div>

              <div>

                <p className="
                  text-xs
                  text-zinc-500
                ">
                  Aluno
                </p>

                <p className="
                  font-bold
                  text-white
                ">
                  {aula.aluno_nome ||
                    "Aluno"}
                </p>

              </div>

            </div>

          </div>

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-3
          ">

            <InfoItem
              icone={
                <CalendarDays size={17} />
              }
              titulo="Data"
              valor={formatarDataCompleta(
                aula.data
              )}
            />

            <InfoItem
              icone={
                <Clock3 size={17} />
              }
              titulo="Horário"
              valor={`
                ${formatarHora(
                  aula.hora_inicio
                )}
                →
                ${formatarHora(
                  aula.hora_fim
                )}
              `}
            />

          </div>

          <div className="
            rounded-xl
            border
            border-zinc-800
            p-4
          ">

            <p className="
              text-xs
              text-zinc-500
              mb-2
            ">
              Status
            </p>

            <StatusBadge
              status={status}
            />

          </div>

          {/* AÇÕES */}

          {status !== "concluido" &&
            status !== "cancelado" && (

              <div className="
                flex
                flex-col
                sm:flex-row
                gap-3
              ">

                {status === "pendente" && (
                  <ActionButton
                    onClick={() =>
                      executarAcao(
                        "confirmar"
                      )
                    }
                    disabled={processando}
                    classe="
                      bg-emerald-600
                      hover:bg-emerald-500
                    "
                    icone={
                      <Check size={17} />
                    }
                  >
                    Confirmar
                  </ActionButton>
                )}

                {status === "confirmado" && (
                  <ActionButton
                    onClick={() =>
                      executarAcao(
                        "concluir"
                      )
                    }
                    disabled={processando}
                    classe="
                      bg-violet-600
                      hover:bg-violet-500
                    "
                    icone={
                      <CheckCircle2
                        size={17}
                      />
                    }
                  >
                    Concluir
                  </ActionButton>
                )}

                <ActionButton
                  onClick={() =>
                    executarAcao(
                      "cancelar"
                    )
                  }
                  disabled={processando}
                  classe="
                    bg-red-600/80
                    hover:bg-red-600
                  "
                  icone={
                    <Ban size={17} />
                  }
                >
                  Cancelar
                </ActionButton>

              </div>

            )}

        </div>

      </div>

    </div>
  );
}

function InfoItem({
  icone,
  titulo,
  valor,
}) {
  return (
    <div className="
      rounded-xl
      border
      border-zinc-800
      p-4
    ">

      <div className="
        flex
        items-center
        gap-2
        text-violet-400
      ">
        {icone}

        <span className="
          text-xs
          text-zinc-500
        ">
          {titulo}
        </span>

      </div>

      <p className="
        text-sm
        font-semibold
        text-white
        mt-2
      ">
        {valor}
      </p>

    </div>
  );
}

function StatusBadge({ status }) {
  const configs = {
    pendente: {
      label: "Pendente",
      classe:
        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },

    confirmado: {
      label: "Confirmado",
      classe:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },

    concluido: {
      label: "Concluído",
      classe:
        "bg-zinc-800 text-zinc-400 border-zinc-700",
    },

    cancelado: {
      label: "Cancelado",
      classe:
        "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };

  const config =
    configs[status] ||
    configs.pendente;

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-bold
        ${config.classe}
      `}
    >
      {config.label}
    </span>
  );
}

function ActionButton({
  children,
  onClick,
  disabled,
  classe,
  icone,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex-1
        min-h-[44px]
        rounded-xl
        px-4
        py-2.5
        text-sm
        font-bold
        text-white
        flex
        items-center
        justify-center
        gap-2
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${classe}
      `}
    >
      {icone}

      {disabled
        ? "Processando..."
        : children}
    </button>
  );
}

/* =============================================================
   FUNÇÕES AUXILIARES
============================================================= */

function getInicioSemana(data) {
  const resultado = new Date(data);

  const dia = resultado.getDay();

  const diferenca =
    dia === 0
      ? -6
      : 1 - dia;

  resultado.setDate(
    resultado.getDate() + diferenca
  );

  resultado.setHours(
    0,
    0,
    0,
    0
  );

  return resultado;
}

function gerarSemana(data) {
  const inicio =
    getInicioSemana(data);

  return Array.from(
    { length: 7 },
    (_, index) => {
      const dia = new Date(inicio);

      dia.setDate(
        dia.getDate() + index
      );

      return dia;
    }
  );
}

function gerarCalendarioMes(data) {
  const ano = data.getFullYear();
  const mes = data.getMonth();

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

  const primeiroDiaSemana =
    primeiroDia.getDay();

  const totalDias =
    ultimoDia.getDate();

  const resultado = [];

  for (
    let i = 0;
    i < primeiroDiaSemana;
    i++
  ) {
    resultado.push({
      data: null,
      dia: null,
    });
  }

  for (
    let dia = 1;
    dia <= totalDias;
    dia++
  ) {
    const dataCompleta =
      new Date(
        ano,
        mes,
        dia
      );

    resultado.push({
      data:
        formatarDataAPI(
          dataCompleta
        ),
      dia,
    });
  }

  while (
    resultado.length % 7 !== 0
  ) {
    resultado.push({
      data: null,
      dia: null,
    });
  }

  return resultado;
}

function formatarDataAPI(data) {
  const ano =
    data.getFullYear();

  const mes =
    String(
      data.getMonth() + 1
    ).padStart(2, "0");

  const dia =
    String(
      data.getDate()
    ).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

function stringParaData(data) {
  const [ano, mes, dia] =
    data.split("-").map(Number);

  return new Date(
    ano,
    mes - 1,
    dia
  );
}

function formatarHora(hora) {
  if (!hora) {
    return "--:--";
  }

  return hora.slice(0, 5);
}

function formatarDataCompleta(data) {
  if (!data) return "--";

  const partes =
    data.split("-");

  if (partes.length !== 3) {
    return data;
  }

  const [
    ano,
    mes,
    dia,
  ] = partes;

  return `${dia}/${mes}/${ano}`;
}

function formatarPeriodoSemana(
  inicio,
  fim
) {
  const inicioTexto =
    inicio.toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "short",
      }
    );

  const fimTexto =
    fim.toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  return `${inicioTexto} – ${fimTexto}`;
}

function isHoje(data) {
  return (
    formatarDataAPI(data) ===
    formatarDataAPI(
      new Date()
    )
  );
}

function compararHorario(a, b) {
  return (
    (a.hora_inicio || "").localeCompare(
      b.hora_inicio || ""
    )
  );
}