import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  User,
  BookOpen,
  XCircle,
  AlertCircle,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAlunoDetalhe } from "../services/alunosService";

import {
  getTrilhas,
  getProgressoAluno,
  marcarTecnicaAprendida,
} from "../services/trilhasService";

const API_URL = "http://127.0.0.1:8000";

function getFotoUrl(foto) {
  if (!foto) return null;

  if (foto.startsWith("http")) {
    return foto;
  }

  return `${API_URL}${foto}`;
}

function formatarData(data) {
  if (!data) return "-";

  const date = new Date(`${data}T00:00:00`);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatarStatus(status) {
  switch (status) {
    case "confirmado":
      return {
        texto: "Confirmada",
        classe: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        icone: CheckCircle2,
      };

    case "concluido":
      return {
        texto: "Concluída",
        classe: "text-green-400 bg-green-500/10 border-green-500/20",
        icone: CheckCircle2,
      };

    case "cancelado":
      return {
        texto: "Cancelada",
        classe: "text-red-400 bg-red-500/10 border-red-500/20",
        icone: XCircle,
      };

    default:
      return {
        texto: "Pendente",
        classe: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
        icone: AlertCircle,
      };
  }
}

export default function AlunoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aluno, setAluno] = useState(null);

  const [trilhas, setTrilhas] = useState([]);
  const [progresso, setProgresso] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingProgresso, setLoadingProgresso] = useState(true);

  const [erro, setErro] = useState("");
  const [erroProgresso, setErroProgresso] = useState("");

  const [trilhasAbertas, setTrilhasAbertas] = useState({});

  const [salvandoTecnica, setSalvandoTecnica] = useState(null);

  useEffect(() => {
    async function carregarAluno() {
      try {
        setLoading(true);
        setErro("");

        const dados = await getAlunoDetalhe(id);

        setAluno(dados);
      } catch (error) {
        console.error("Erro ao carregar aluno:", error);

        setErro(
          error?.response?.data?.detail ||
            "Não foi possível carregar os dados do aluno."
        );
      } finally {
        setLoading(false);
      }
    }

    carregarAluno();
  }, [id]);

  useEffect(() => {
    async function carregarProgresso() {
      try {
        setLoadingProgresso(true);
        setErroProgresso("");

        const [dadosTrilhas, dadosProgresso] = await Promise.all([
          getTrilhas(),
          getProgressoAluno(id),
        ]);

        const listaTrilhas = Array.isArray(dadosTrilhas)
          ? dadosTrilhas
          : Array.isArray(dadosTrilhas?.results)
            ? dadosTrilhas.results
            : [];

        const listaProgresso = Array.isArray(dadosProgresso)
          ? dadosProgresso
          : Array.isArray(dadosProgresso?.results)
            ? dadosProgresso.results
            : [];

        setTrilhas(listaTrilhas);
        setProgresso(listaProgresso);

        // Abre automaticamente as trilhas que possuem progresso
        const abertas = {};

        listaTrilhas.forEach((trilha) => {
          const possuiProgresso = listaProgresso.some(
            (item) => item.trilha_id === trilha.id
          );

          if (possuiProgresso) {
            abertas[trilha.id] = true;
          }
        });

        setTrilhasAbertas(abertas);
      } catch (error) {
        console.error("Erro ao carregar progresso:", error);

        setErroProgresso(
          error?.response?.data?.detail ||
            "Não foi possível carregar o progresso técnico."
        );
      } finally {
        setLoadingProgresso(false);
      }
    }

    carregarProgresso();
  }, [id]);

  function tecnicaAprendida(tecnicaId) {
    return progresso.some(
      (item) =>
        item.tecnica === tecnicaId &&
        item.aprendido === true
    );
  }

  function getProgressoTrilha(trilha) {
    const tecnicasAtivas = (trilha.tecnicas || []).filter(
      (tecnica) => tecnica.ativa
    );

    if (tecnicasAtivas.length === 0) {
      return {
        total: 0,
        aprendidas: 0,
        percentual: 0,
      };
    }

    const aprendidas = tecnicasAtivas.filter((tecnica) =>
      tecnicaAprendida(tecnica.id)
    ).length;

    const percentual = Math.round(
      (aprendidas / tecnicasAtivas.length) * 100
    );

    return {
      total: tecnicasAtivas.length,
      aprendidas,
      percentual,
    };
  }

  function alternarTrilha(trilhaId) {
    setTrilhasAbertas((estadoAtual) => ({
      ...estadoAtual,
      [trilhaId]: !estadoAtual[trilhaId],
    }));
  }

  async function alternarTecnica(tecnica) {
    const atual = tecnicaAprendida(tecnica.id);
    const novoStatus = !atual;

    try {
      setSalvandoTecnica(tecnica.id);
      setErroProgresso("");

      const resultado = await marcarTecnicaAprendida(
        id,
        tecnica.id,
        novoStatus
      );

      setProgresso((estadoAtual) => {
        const existe = estadoAtual.some(
          (item) => item.tecnica === tecnica.id
        );

        if (existe) {
          return estadoAtual.map((item) =>
            item.tecnica === tecnica.id
              ? resultado
              : item
          );
        }

        return [...estadoAtual, resultado];
      });
    } catch (error) {
      console.error(
        "Erro ao atualizar técnica:",
        error
      );

      setErroProgresso(
        error?.response?.data?.detail ||
          "Não foi possível atualizar o progresso."
      );
    } finally {
      setSalvandoTecnica(null);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-purple-500" />

            <p className="mt-4 text-sm text-zinc-400">
              Carregando aluno...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (erro || !aluno) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => navigate("/meus-alunos")}
            className="mb-6 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Meus Alunos
          </button>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-red-400" />

            <p className="mt-3 text-red-400">
              {erro || "Aluno não encontrado."}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const fotoUrl = getFotoUrl(aluno.foto);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6">

        {/* VOLTAR */}
        <button
          onClick={() => navigate("/meus-alunos")}
          className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Meus Alunos
        </button>

        {/* PERFIL */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {fotoUrl ? (
              <img
                src={fotoUrl}
                alt={aluno.nome}
                className="h-20 w-20 rounded-full border border-zinc-700 object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-purple-500/20 bg-purple-500/10">
                <User className="h-8 w-8 text-purple-400" />
              </div>
            )}

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {aluno.nome}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="h-4 w-4" />

                <span className="truncate">
                  {aluno.email || "Sem e-mail"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ESTATÍSTICAS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-zinc-400">
                  Total de aulas
                </p>

                <p className="mt-1 text-3xl font-bold text-white">
                  {aluno.total_aulas || 0}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
                <BookOpen className="h-5 w-5 text-purple-400" />
              </div>

            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-zinc-400">
                  Aulas concluídas
                </p>

                <p className="mt-1 text-3xl font-bold text-white">
                  {aluno.aulas_concluidas || 0}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>

            </div>
          </div>

        </div>

        {/* PROGRESSO TÉCNICO */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">

          <div className="border-b border-zinc-800 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-400" />

                  <h2 className="text-lg font-semibold text-white">
                    Progresso técnico
                  </h2>
                </div>

                <p className="mt-1 text-sm text-zinc-500">
                  Acompanhe as técnicas que o aluno já domina.
                </p>
              </div>

            </div>
          </div>

          {loadingProgresso ? (
            <div className="p-10 text-center">
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-purple-400" />

              <p className="mt-3 text-sm text-zinc-500">
                Carregando progresso...
              </p>
            </div>
          ) : erroProgresso ? (
            <div className="p-8 text-center">
              <AlertCircle className="mx-auto h-7 w-7 text-red-400" />

              <p className="mt-3 text-sm text-red-400">
                {erroProgresso}
              </p>
            </div>
          ) : trilhas.length === 0 ? (
            <div className="p-10 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-zinc-600" />

              <p className="mt-3 text-sm text-zinc-500">
                Nenhuma trilha cadastrada.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">

              {trilhas.map((trilha) => {
                const dadosProgresso =
                  getProgressoTrilha(trilha);

                const aberta =
                  trilhasAbertas[trilha.id];

                return (
                  <div key={trilha.id}>

                    {/* CABEÇALHO DA TRILHA */}
                    <button
                      onClick={() =>
                        alternarTrilha(trilha.id)
                      }
                      className="w-full p-5 text-left transition hover:bg-zinc-800/30 sm:p-6"
                    >
                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                          <BookOpen className="h-5 w-5 text-purple-400" />
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="font-semibold text-white">
                              {trilha.nome}
                            </h3>

                            <span className="text-sm text-zinc-400">
                              {dadosProgresso.aprendidas}/
                              {dadosProgresso.total}
                            </span>
                          </div>

                          {/* BARRA */}
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
                            <div
                              className="h-full rounded-full bg-purple-500 transition-all duration-300"
                              style={{
                                width: `${dadosProgresso.percentual}%`,
                              }}
                            />
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-zinc-500">
                              {dadosProgresso.percentual}% concluído
                            </span>

                            <span className="text-xs text-zinc-500">
                              {aberta ? "Fechar" : "Ver técnicas"}
                            </span>
                          </div>

                        </div>

                        <div className="hidden sm:block">
                          {aberta ? (
                            <ChevronUp className="h-5 w-5 text-zinc-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-zinc-500" />
                          )}
                        </div>

                      </div>
                    </button>

                    {/* TÉCNICAS */}
                    {aberta && (
                      <div className="border-t border-zinc-800 bg-zinc-950/30 px-5 py-3 sm:px-6">

                        {(trilha.tecnicas || [])
                          .filter((tecnica) => tecnica.ativa)
                          .map((tecnica, index) => {

                            const aprendida =
                              tecnicaAprendida(
                                tecnica.id
                              );

                            const salvando =
                              salvandoTecnica ===
                              tecnica.id;

                            return (
                              <button
                                key={tecnica.id}
                                onClick={() =>
                                  alternarTecnica(
                                    tecnica
                                  )
                                }
                                disabled={salvando}
                                className="flex w-full items-center gap-4 border-b border-zinc-800/70 py-4 text-left transition last:border-b-0 hover:bg-zinc-800/20 disabled:cursor-wait disabled:opacity-70"
                              >

                                {/* CHECK */}
                                <div
                                  className={`
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    transition
                                    ${
                                      aprendida
                                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                                        : "border-zinc-700 bg-zinc-900 text-zinc-600"
                                    }
                                  `}
                                >
                                  {salvando ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : aprendida ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                  ) : (
                                    <span className="text-xs font-bold">
                                      {String(index + 1).padStart(
                                        2,
                                        "0"
                                      )}
                                    </span>
                                  )}
                                </div>

                                {/* TEXTO */}
                                <div className="min-w-0 flex-1">

                                  <p
                                    className={`
                                      font-medium
                                      transition
                                      ${
                                        aprendida
                                          ? "text-green-400"
                                          : "text-white"
                                      }
                                    `}
                                  >
                                    {tecnica.nome}
                                  </p>

                                  <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                                    {tecnica.descricao ||
                                      "Nenhuma descrição cadastrada."}
                                  </p>

                                </div>

                                {/* STATUS */}
                                <span
                                  className={`
                                    hidden
                                    shrink-0
                                    text-xs
                                    font-medium
                                    sm:block
                                    ${
                                      aprendida
                                        ? "text-green-400"
                                        : "text-zinc-600"
                                    }
                                  `}
                                >
                                  {aprendida
                                    ? "Aprendida"
                                    : "Pendente"}
                                </span>

                              </button>
                            );
                          })}

                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* HISTÓRICO */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">

          <div className="border-b border-zinc-800 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-white">
              Histórico de aulas
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Acompanhe todas as aulas deste aluno.
            </p>
          </div>

          {aluno.historico?.length === 0 ? (
            <div className="p-10 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-zinc-600" />

              <p className="mt-3 text-sm text-zinc-500">
                Nenhuma aula encontrada.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">

              {aluno.historico?.map((aula) => {
                const status = formatarStatus(
                  aula.status
                );

                const StatusIcon = status.icone;

                return (
                  <div
                    key={aula.id}
                    className="p-5 transition hover:bg-zinc-800/30"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950">
                          <Calendar className="h-5 w-5 text-purple-400" />
                        </div>

                        <div>
                          <p className="font-medium text-white">
                            {formatarData(aula.data)}
                          </p>

                          <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                            <Clock className="h-3.5 w-3.5" />

                            {aula.hora_inicio?.slice(0, 5)}
                            {" - "}
                            {aula.hora_fim?.slice(0, 5)}
                          </div>
                        </div>

                      </div>

                      <div
                        className={`
                          inline-flex
                          w-fit
                          items-center
                          gap-2
                          rounded-full
                          border
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          ${status.classe}
                        `}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />

                        {status.texto}
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}