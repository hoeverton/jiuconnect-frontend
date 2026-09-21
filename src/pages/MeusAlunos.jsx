import { useEffect, useMemo, useState } from "react";
import { Search, Users, Calendar, CheckCircle2, BookOpen } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getMeusAlunos } from "../services/alunosService";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

function formatarData(data) {
  if (!data) return "Nenhuma";

  const date = new Date(data);

  if (Number.isNaN(date.getTime())) {
    return "Nenhuma";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatarHora(data) {
  if (!data) return "";

  const date = new Date(data);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getFotoUrl(foto) {
  if (!foto) return null;

  if (foto.startsWith("http")) {
    return foto;
  }

  return `${API_URL}${foto}`;
}

export default function MeusAlunos() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAlunos() {
      try {
        setLoading(true);
        setErro("");

        const dados = await getMeusAlunos();

        const lista = Array.isArray(dados)
          ? dados
          : Array.isArray(dados?.results)
            ? dados.results
            : [];

        setAlunos(lista);
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
        setErro("Não foi possível carregar seus alunos.");
      } finally {
        setLoading(false);
      }
    }

    carregarAlunos();
  }, []);

  const alunosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return alunos;
    }

    return alunos.filter((aluno) =>
      aluno.nome?.toLowerCase().includes(termo)
    );
  }, [alunos, busca]);

  const totalAlunos = alunos.length;

  const totalAulas = alunos.reduce(
    (total, aluno) => total + (aluno.total_aulas || 0),
    0
  );

  const totalConcluidas = alunos.reduce(
    (total, aluno) => total + (aluno.aulas_concluidas || 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Meus Alunos
                </h1>

                <p className="text-sm text-zinc-400 mt-1">
                  Acompanhe seus alunos e o histórico de aulas.
                </p>
              </div>
            </div>
          </div>

          {/* BUSCA */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />

            <input
              type="text"
              placeholder="Buscar aluno..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="
                w-full
                bg-zinc-900
                border border-zinc-800
                rounded-xl
                py-3
                pl-10
                pr-4
                text-sm
                text-white
                placeholder:text-zinc-500
                outline-none
                focus:border-purple-500
                focus:ring-1
                focus:ring-purple-500
                transition
              "
            />
          </div>
        </div>

        {/* RESUMO */}
        {!loading && !erro && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* ALUNOS */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    Total de alunos
                  </p>

                  <p className="text-2xl font-bold text-white mt-1">
                    {totalAlunos}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>

            {/* AULAS */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    Total de aulas
                  </p>

                  <p className="text-2xl font-bold text-white mt-1">
                    {totalAulas}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>

            {/* CONCLUÍDAS */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    Aulas concluídas
                  </p>

                  <p className="text-2xl font-bold text-white mt-1">
                    {totalConcluidas}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-10 text-center">
            <div className="w-8 h-8 mx-auto border-2 border-zinc-700 border-t-purple-500 rounded-full animate-spin" />

            <p className="text-sm text-zinc-400 mt-4">
              Carregando seus alunos...
            </p>
          </div>
        )}

        {/* ERRO */}
        {!loading && erro && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
            <p className="text-red-400 font-medium">
              {erro}
            </p>
          </div>
        )}

        {/* LISTA */}
        {!loading && !erro && (
          <>
            {alunosFiltrados.length === 0 ? (
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-zinc-800 flex items-center justify-center">
                  <Users className="w-6 h-6 text-zinc-500" />
                </div>

                <h2 className="text-lg font-semibold text-white mt-4">
                  {busca
                    ? "Nenhum aluno encontrado"
                    : "Você ainda não possui alunos"}
                </h2>

                <p className="text-sm text-zinc-500 mt-2">
                  {busca
                    ? "Tente pesquisar por outro nome."
                    : "Quando alunos agendarem aulas com você, eles aparecerão aqui."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {alunosFiltrados.map((aluno) => {
                  const fotoUrl = getFotoUrl(aluno.foto);

                  return (
                    <div
                      key={aluno.id}
                      onClick={() => navigate(`/meus-alunos/${aluno.id}`)}
                      className="
                        group
                        cursor-pointer
                        bg-zinc-900/70
                        border border-zinc-800
                        rounded-2xl
                        p-5
                        hover:border-purple-500/30
                        hover:bg-zinc-900
                        transition
                      "
                    >

                      {/* ALUNO */}
                      <div className="flex items-center gap-4">

                        {fotoUrl ? (
                          <img
                            src={fotoUrl}
                            alt={aluno.nome}
                            className="
                              w-14
                              h-14
                              rounded-full
                              object-cover
                              border
                              border-zinc-700
                              group-hover:border-purple-500/50
                              transition
                            "
                          />
                        ) : (
                          <div className="
                            w-14
                            h-14
                            rounded-full
                            bg-purple-500/10
                            border border-purple-500/20
                            flex
                            items-center
                            justify-center
                            text-lg
                            font-bold
                            text-purple-400
                          ">
                            {aluno.nome?.charAt(0)?.toUpperCase() || "A"}
                          </div>
                        )}

                        <div className="min-w-0">
                          <h2 className="font-semibold text-white truncate">
                            {aluno.nome}
                          </h2>

                          <p className="text-sm text-zinc-500 truncate">
                            {aluno.email || "Sem e-mail"}
                          </p>
                        </div>

                      </div>

                      {/* ESTATÍSTICAS */}
                      <div className="grid grid-cols-2 gap-3 mt-5">

                        <div className="bg-zinc-950/70 rounded-xl p-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-purple-400" />

                            <span className="text-xs text-zinc-500">
                              Aulas
                            </span>
                          </div>

                          <p className="text-lg font-semibold text-white mt-1">
                            {aluno.total_aulas || 0}
                          </p>
                        </div>

                        <div className="bg-zinc-950/70 rounded-xl p-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />

                            <span className="text-xs text-zinc-500">
                              Concluídas
                            </span>
                          </div>

                          <p className="text-lg font-semibold text-white mt-1">
                            {aluno.aulas_concluidas || 0}
                          </p>
                        </div>

                      </div>

                      {/* PRÓXIMA AULA */}
                      <div className="mt-4 pt-4 border-t border-zinc-800">

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-400" />

                          <span className="text-xs text-zinc-500">
                            Próxima aula
                          </span>
                        </div>

                        {aluno.proxima_aula ? (
                          <p className="text-sm text-white font-medium mt-1">
                            {formatarData(aluno.proxima_aula)}
                            {" • "}
                            {formatarHora(aluno.proxima_aula)}
                          </p>
                        ) : (
                          <p className="text-sm text-zinc-500 mt-1">
                            Nenhuma aula agendada
                          </p>
                        )}

                      </div>

                    </div>
                  );
                })}

              </div>
            )}
          </>
        )}

      </div>
    </DashboardLayout>
  );
}