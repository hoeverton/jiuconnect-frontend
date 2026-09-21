import { useEffect, useState } from "react";
import { BookOpen, Plus, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getTrilhas,
  criarTrilha,
} from "../services/trilhasService";

import DashboardLayout from "../layouts/DashboardLayout";

export default function Trilhas() {
  const navigate = useNavigate();

  const [trilhas, setTrilhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [criando, setCriando] = useState(false);

  async function carregarTrilhas() {
    try {
      setLoading(true);
      setErro("");

      const dados = await getTrilhas();

      const lista = Array.isArray(dados)
        ? dados
        : Array.isArray(dados?.results)
          ? dados.results
          : [];

      setTrilhas(lista);
    } catch (error) {
      console.error("Erro ao carregar trilhas:", error);

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível carregar as trilhas."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTrilhas();
  }, []);

  async function handleCriarTrilha(e) {
    e.preventDefault();

    if (!nome.trim()) {
      return;
    }

    try {
      setCriando(true);
      setErro("");

      await criarTrilha({
        nome: nome.trim(),
        descricao: descricao.trim(),
        ordem: trilhas.length + 1,
        ativa: true,
      });

      setNome("");
      setDescricao("");
      setMostrarFormulario(false);

      await carregarTrilhas();
    } catch (error) {
      console.error(error);

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível criar a trilha."
      );
    } finally {
      setCriando(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-full bg-zinc-950 text-white">

        <div className="mx-auto w-full max-w-7xl px-1 py-2 sm:px-2 lg:px-4">

          {/* Cabeçalho */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-purple-400">
                <BookOpen size={22} />

                <span className="text-sm font-semibold">
                  JiuConnect
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Trilhas de Estudo
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                Organize as principais técnicas do Jiu-Jitsu
                e acompanhe a evolução dos seus alunos.
              </p>
            </div>

            <button
              onClick={() =>
                setMostrarFormulario(!mostrarFormulario)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold transition hover:bg-purple-500"
            >
              <Plus size={18} />

              Nova trilha
            </button>
          </div>

          {/* Erro */}
          {erro && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {erro}
            </div>
          )}

          {/* Formulário */}
          {mostrarFormulario && (
            <form
              onSubmit={handleCriarTrilha}
              className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6"
            >
              <h2 className="mb-5 text-lg font-semibold">
                Criar nova trilha
              </h2>

              <div className="grid gap-5">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Nome da trilha
                  </label>

                  <input
                    type="text"
                    value={nome}
                    onChange={(e) =>
                      setNome(e.target.value)
                    }
                    placeholder="Ex.: Raspagens"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Descrição
                  </label>

                  <textarea
                    value={descricao}
                    onChange={(e) =>
                      setDescricao(e.target.value)
                    }
                    placeholder="Descreva brevemente o objetivo dessa trilha..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      setMostrarFormulario(false)
                    }
                    className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={criando || !nome.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {criando && (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    )}

                    {criando
                      ? "Criando..."
                      : "Criar trilha"}
                  </button>

                </div>

              </div>
            </form>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3 text-slate-400">

                <Loader2
                  size={24}
                  className="animate-spin"
                />

                <span>
                  Carregando trilhas...
                </span>

              </div>
            </div>

          ) : trilhas.length === 0 ? (

            /* Estado vazio */
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-16 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                <BookOpen size={30} />
              </div>

              <h2 className="text-lg font-semibold">
                Nenhuma trilha criada
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                Crie sua primeira trilha para começar a
                organizar o conteúdo técnico dos seus alunos.
              </p>

              <button
                onClick={() =>
                  setMostrarFormulario(true)
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500"
              >
                <Plus size={18} />
                Criar primeira trilha
              </button>

            </div>

          ) : (

            /* Lista */
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {trilhas.map((trilha) => (
                <div
                  key={trilha.id}
                  className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:-translate-y-1 hover:border-purple-500/40 sm:p-6"
                >

                  <div className="mb-5 flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                      <BookOpen size={24} />
                    </div>

                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                      {trilha.total_tecnicas || 0}{" "}
                      {trilha.total_tecnicas === 1
                        ? "técnica"
                        : "técnicas"}
                    </span>

                  </div>

                  <h2 className="text-lg font-semibold">
                    {trilha.nome}
                  </h2>

                  <p className="mt-2 line-clamp-3 min-h-[60px] text-sm leading-6 text-slate-400">
                    {trilha.descricao ||
                      "Nenhuma descrição cadastrada."}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/trilhas/${trilha.id}`)
                    }
                    className="mt-6 flex w-full items-center justify-between rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-purple-500/50 hover:bg-purple-500/10"
                  >
                    Ver trilha

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}