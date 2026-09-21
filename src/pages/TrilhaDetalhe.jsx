import { Fragment, useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Loader2,
  CheckCircle2,
  Pencil,
  Power,
  Trash2,
  X,
  Save,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getTrilhaDetalhe,
  atualizarTrilha,
  desativarTrilha,
  criarCategoria,
  criarTecnica,
  atualizarCategoria,
  excluirCategoria,
  atualizarTecnica,
  desativarTecnica,
  excluirTecnica,
  getCategorias,
} from "../services/trilhasService";

import DashboardLayout from "../layouts/DashboardLayout";

export default function TrilhaDetalhe() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [trilha, setTrilha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [categorias, setCategorias] = useState([]);

  // Nova técnica
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [criando, setCriando] = useState(false);
  

  // Edição
  const [editandoId, setEditandoId] = useState(null);
  const [editandoNome, setEditandoNome] = useState("");
  const [editandoDescricao, setEditandoDescricao] = useState("");
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  // CATEGORIA
const [mostrarFormularioCategoria, setMostrarFormularioCategoria] =
  useState(false);
const [nomeCategoria, setNomeCategoria] = useState("");
const [ordemCategoria, setOrdemCategoria] = useState("");
const [criandoCategoria, setCriandoCategoria] = useState(false);
const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

// EDIÇÃO DA CATEGORIA
const [editandoCategoriaId, setEditandoCategoriaId] = useState(null);
const [nomeCategoriaEdicao, setNomeCategoriaEdicao] = useState("");
const [ordemCategoriaEdicao, setOrdemCategoriaEdicao] = useState("");
const [salvandoCategoria, setSalvandoCategoria] = useState(false);

  // EDIÇÃO DA TRILHA
const [editandoTrilha, setEditandoTrilha] = useState(false);
const [nomeTrilha, setNomeTrilha] = useState("");
const [descricaoTrilha, setDescricaoTrilha] = useState("");
const [salvandoTrilha, setSalvandoTrilha] = useState(false);

  // Ações
  const [processandoId, setProcessandoId] = useState(null);

  async function carregarTrilha() {
    try {
      setLoading(true);
      setErro("");

      const dados = await getTrilhaDetalhe(id);
      const categoriasDados = await getCategorias(id);

      const listaCategorias = Array.isArray(categoriasDados)
        ? categoriasDados
        : Array.isArray(categoriasDados?.results)
          ? categoriasDados.results
          : [];

      setTrilha(dados);
      setCategorias(listaCategorias);
    } catch (error) {
      console.error("Erro ao carregar trilha:", error);

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível carregar a trilha."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTrilha();
  }, [id]);

  // =========================================================
  // EDITAR TRILHA  
  // =========================================================

  async function handleEditarTrilha(e) {
    e.preventDefault();

    if (!nomeTrilha.trim()) {
      return;
    }

    try {
      setSalvandoTrilha(true);
      setErro("");

      await atualizarTrilha(id, {
        nome: nomeTrilha.trim(),
        descricao: descricaoTrilha.trim(),
      });

      setEditandoTrilha(false);

      await carregarTrilha();
    } catch (error) {
      console.error("Erro ao editar trilha:", error);

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível editar a trilha."
      );
    } finally {
      setSalvandoTrilha(false);
    }
  }

  // =========================================================
  // DESATIVAR TRILHA
  // =========================================================
  async function handleDesativarTrilha() {
    const confirmar = window.confirm(
      "Tem certeza que deseja desativar esta trilha?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");
      setProcessandoId(id);

      await desativarTrilha(id);

      navigate("/trilhas");
    } catch (error) {
      console.error("Erro ao desativar trilha:", error);

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível desativar a trilha."
      );
    } finally {
      setProcessandoId(null);
    }
  }

  // =========================================================
  // CRIAR CATEGORIA
  // =========================================================

  async function handleCriarCategoria(e) {
      e.preventDefault();

      if (!nomeCategoria.trim()) {
        return;
      }

      try {
        setCriandoCategoria(true);
        setErro("");

        await criarCategoria(id, {
          nome: nomeCategoria.trim(),
          ordem: Number(ordemCategoria) || categorias.length + 1,
          ativa: true,
        });

        setNomeCategoria("");
        setOrdemCategoria("");
        setMostrarFormularioCategoria(false);

        await carregarTrilha();
      } catch (error) {
        console.error("Erro ao criar categoria:", error);

        setErro(
          error?.response?.data?.detail ||
            error?.response?.data?.nome?.[0] ||
            "Não foi possível criar a categoria."
        );
      } finally {
        setCriandoCategoria(false);
      }
    }
      
  // =========================================================
  // EXCLUSÃO CATEGORIA 
  // =========================================================
  
  async function handleExcluirCategoria(categoria) {
  const confirmar = window.confirm(
      `Tem certeza que deseja excluir a categoria "${categoria.nome}"?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");
      setProcessandoId(`categoria-${categoria.id}`);

      await excluirCategoria(id, categoria.id);

      await carregarTrilha();
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível excluir a categoria."
      );
    } finally {
      setProcessandoId(null);
    }
  }

  // =========================================================
  // EDITAR CATEGORIA
  // =========================================================

  async function handleEditarCategoria(e) {
    e.preventDefault();

    if (!nomeCategoriaEdicao.trim()) {
      return;
    }

    try {
      setSalvandoCategoria(true);
      setErro("");

      await atualizarCategoria(
        id,
        editandoCategoriaId,
        {
          nome: nomeCategoriaEdicao.trim(),
          ordem: Number(ordemCategoriaEdicao) || 1,
        }
      );

      setEditandoCategoriaId(null);
      setNomeCategoriaEdicao("");
      setOrdemCategoriaEdicao("");

      await carregarTrilha();
    } catch (error) {
      console.error("Erro ao editar categoria:", error);

      setErro(
        error?.response?.data?.detail ||
          error?.response?.data?.nome?.[0] ||
          "Não foi possível editar a categoria."
      );
    } finally {
      setSalvandoCategoria(false);
    }
  }

  // =========================================================
  // CRIAR TÉCNICA
  // =========================================================

  async function handleCriarTecnica(e) {
    e.preventDefault();

    if (!nome.trim()) {
      return;
    }

    try {
      setCriando(true);
      setErro("");

      const tecnicasAtuais = trilha?.tecnicas || [];

      await criarTecnica({
        trilha: Number(id),
        categoria: Number(categoriaSelecionada),
        nome: nome.trim(),
        descricao: descricao.trim(),
        ordem: tecnicasAtuais.length + 1,
        ativa: true,
      });

      setNome("");
      setDescricao("");
      setCategoriaSelecionada("");
      setMostrarFormulario(false);

      await carregarTrilha();
    } catch (error) {
      console.error("Erro ao criar técnica:", error);

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível criar a técnica."
      );
    } finally {
      setCriando(false);
    }
  }
  

  // =========================================================
  // COMEÇAR EDIÇÃO
  // =========================================================

  function iniciarEdicao(tecnica) {
    setErro("");

    setEditandoId(tecnica.id);
    setEditandoNome(tecnica.nome || "");
    setEditandoDescricao(tecnica.descricao || "");
  }

  // =========================================================
  // CANCELAR EDIÇÃO
  // =========================================================

  function cancelarEdicao() {
    setEditandoId(null);
    setEditandoNome("");
    setEditandoDescricao("");
  }

  // =========================================================
  // SALVAR EDIÇÃO
  // =========================================================

  async function handleSalvarEdicao(e, tecnica) {
    e.preventDefault();

    if (!editandoNome.trim()) {
      setErro("Informe o nome da técnica.");
      return;
    }

    try {
      setSalvandoEdicao(true);
      setErro("");

      await atualizarTecnica(tecnica.id, {
        nome: editandoNome.trim(),
        descricao: editandoDescricao.trim(),
        ordem: tecnica.ordem,
        ativa: tecnica.ativa,
        trilha: tecnica.trilha || Number(id),
      });

      cancelarEdicao();

      await carregarTrilha();
    } catch (error) {
      console.error("Erro ao atualizar técnica:", error);

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível atualizar a técnica."
      );
    } finally {
      setSalvandoEdicao(false);
    }
  }

  // =========================================================
  // DESATIVAR / REATIVAR
  // =========================================================

  async function handleAlternarStatus(tecnica) {
    try {
      setProcessandoId(tecnica.id);
      setErro("");

      if (tecnica.ativa) {
        await desativarTecnica(tecnica.id);
      } else {
        await atualizarTecnica(tecnica.id, {
          ativa: true,
        });
      }

      await carregarTrilha();
    } catch (error) {
      console.error(
        "Erro ao alterar status da técnica:",
        error
      );

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível alterar o status da técnica."
      );
    } finally {
      setProcessandoId(null);
    }
  }

  // =========================================================
  // EXCLUIR
  // =========================================================

  async function handleExcluirTecnica(tecnica) {
    const confirmar = window.confirm(
      `Excluir a técnica "${tecnica.nome}"?\n\n` +
        "Essa ação é permanente e pode apagar o progresso dos alunos relacionado a esta técnica."
    );

    if (!confirmar) {
      return;
    }

    try {
      setProcessandoId(tecnica.id);
      setErro("");

      await excluirTecnica(tecnica.id);

      if (editandoId === tecnica.id) {
        cancelarEdicao();
      }

      await carregarTrilha();
    } catch (error) {
      console.error("Erro ao excluir técnica:", error);

      setErro(
        error?.response?.data?.detail ||
          "Não foi possível excluir a técnica."
      );
    } finally {
      setProcessandoId(null);
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-full bg-zinc-950 text-white">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex items-center gap-3 text-slate-400">
              <Loader2
                size={24}
                className="animate-spin"
              />

              <span>Carregando trilha...</span>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // =========================================================
  // TRILHA NÃO ENCONTRADA
  // =========================================================

  if (!trilha) {
    return (
      <DashboardLayout>
        <div className="min-h-full bg-slate-950 px-4 py-8 text-white sm:px-6">
          <div className="mx-auto max-w-4xl">
            <button
              onClick={() => navigate("/trilhas")}
              className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft size={18} />
              Voltar para trilhas
            </button>

            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
              {erro || "Trilha não encontrada."}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const tecnicas = trilha.tecnicas || [];

  // =========================================================
  // TELA
  // =========================================================

  return (
    <DashboardLayout>
      <div className="min-h-full bg-zinc-950 text-white">

        <div className="mx-auto w-full max-w-5xl px-1 py-2 sm:px-2 lg:px-4">

          {/* ===================================================
              VOLTAR
          ==================================================== */}

          <button
            onClick={() => navigate("/trilhas")}
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Voltar para trilhas
          </button>

          {/* ===================================================
              CABEÇALHO DA TRILHA
          ==================================================== */}

          <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                <BookOpen size={28} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {trilha.nome}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                  {trilha.descricao ||
                    "Nenhuma descrição cadastrada."}
                </p>
              </div>

            </div>

            <div className="flex shrink-0 flex-col gap-2">

              {/* CONTADOR DE TÉCNICAS */}
              <div className="rounded-xl bg-slate-800 px-4 py-3 text-center">
                <div className="text-xl font-bold">
                  {tecnicas.length}
                </div>

                <div className="text-xs text-slate-400">
                  {tecnicas.length === 1
                    ? "técnica"
                    : "técnicas"}
                </div>
              </div>

              {/* EDITAR TRILHA */}
              <button
                type="button"
                onClick={() => {
                  setNomeTrilha(trilha.nome || "");
                  setDescricaoTrilha(trilha.descricao || "");
                  setEditandoTrilha(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20"
              >
                <Pencil size={16} />
                Editar trilha
              </button>

              {/* DESATIVAR TRILHA */}
              <button
                type="button"
                onClick={handleDesativarTrilha}
                disabled={processandoId === id}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processandoId === id ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Desativando...
                  </>
                ) : (
                  <>
                    <Power size={16} />
                    Desativar trilha
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
          {editandoTrilha && (
          <div className="mb-8 rounded-2xl border border-purple-500/20 bg-slate-900 p-5 shadow-xl sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Editar trilha
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Altere o nome e a descrição da trilha.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditandoTrilha(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            

            <form
              onSubmit={handleEditarTrilha}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Nome da trilha
                </label>

                <input
                  type="text"
                  value={nomeTrilha}
                  onChange={(e) => setNomeTrilha(e.target.value)}
                  placeholder="Nome da trilha"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Descrição
                </label>

                <textarea
                  value={descricaoTrilha}
                  onChange={(e) => setDescricaoTrilha(e.target.value)}
                  placeholder="Descrição da trilha"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditandoTrilha(false)}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvandoTrilha}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {salvandoTrilha ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Salvar alterações
                    </>
                  )}
                </button>
              </div>
            </form>
            
          </div>
        )}
        
          {/* ===================================================
              CATEGORIAS
          ==================================================== */}

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Categorias
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Organize as técnicas por categoria.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setMostrarFormularioCategoria(!mostrarFormularioCategoria)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold transition hover:bg-purple-500"
            >
              <Plus size={18} />
              Nova categoria
            </button>
          </div>

          {/* FORMULÁRIO NOVA CATEGORIA */}
          {mostrarFormularioCategoria && (
            <form
              onSubmit={handleCriarCategoria}
              className="mb-6 rounded-2xl border border-purple-500/20 bg-slate-900 p-5 shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Nova categoria
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Crie uma categoria dentro desta trilha.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMostrarFormularioCategoria(false)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Nome da categoria
                  </label>

                  <input
                    type="text"
                    value={nomeCategoria}
                    onChange={(e) => setNomeCategoria(e.target.value)}
                    placeholder="Ex.: Raspagens"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Ordem
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={ordemCategoria}
                    onChange={(e) => setOrdemCategoria(e.target.value)}
                    placeholder={`Ex.: ${categorias.length + 1}`}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setMostrarFormularioCategoria(false)}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={criandoCategoria}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {criandoCategoria ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Criar categoria
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* FORMULÁRIO EDITAR CATEGORIA */}
          {editandoCategoriaId && (
            <form
              onSubmit={handleEditarCategoria}
              className="mb-6 rounded-2xl border border-purple-500/20 bg-slate-900 p-5 shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Editar categoria
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Altere o nome ou a ordem da categoria.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditandoCategoriaId(null);
                    setNomeCategoriaEdicao("");
                    setOrdemCategoriaEdicao("");
                  }}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Nome da categoria
                  </label>

                  <input
                    type="text"
                    value={nomeCategoriaEdicao}
                    onChange={(e) =>
                      setNomeCategoriaEdicao(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Ordem
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={ordemCategoriaEdicao}
                    onChange={(e) =>
                      setOrdemCategoriaEdicao(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEditandoCategoriaId(null);
                    setNomeCategoriaEdicao("");
                    setOrdemCategoriaEdicao("");
                  }}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvandoCategoria}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {salvandoCategoria ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Salvar alterações
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* LISTA DE CATEGORIAS */}
          {categorias.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-10 text-center">
              <p className="text-sm text-slate-400">
                Nenhuma categoria cadastrada.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categorias.map((categoria) => {
                const tecnicasDaCategoria = tecnicas
                  .filter(
                    (tecnica) =>
                      Number(tecnica.categoria) === Number(categoria.id)
                  )
                  .sort((a, b) => a.ordem - b.ordem);

                return (
                  <div
                    key={categoria.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                  >
                    {/* CABEÇALHO DA CATEGORIA */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-white">
                          {categoria.nome}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {tecnicasDaCategoria.length}{" "}
                          {tecnicasDaCategoria.length === 1
                            ? "técnica"
                            : "técnicas"}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="mr-1 text-xs text-slate-500">
                          #{categoria.ordem}
                        </span>

                        {/* EDITAR */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditandoCategoriaId(categoria.id);
                            setNomeCategoriaEdicao(
                              categoria.nome || ""
                            );
                            setOrdemCategoriaEdicao(
                              categoria.ordem?.toString() || ""
                            );
                          }}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-purple-400"
                          title="Editar categoria"
                        >
                          <Pencil size={16} />
                        </button>

                        {/* EXCLUIR */}
                        <button
                          type="button"
                          onClick={() =>
                            handleExcluirCategoria(categoria)
                          }
                          disabled={
                            processandoId ===
                            `categoria-${categoria.id}`
                          }
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Excluir categoria"
                        >
                          {processandoId ===
                          `categoria-${categoria.id}` ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* TÉCNICAS DA CATEGORIA */}
                    <div className="mt-4 space-y-2">
                      {tecnicasDaCategoria.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 px-4 py-5 text-center">
                          <p className="text-xs text-slate-500">
                            Nenhuma técnica nesta categoria.
                          </p>
                        </div>
                      ) : (
                        tecnicasDaCategoria.map((tecnica, index) => (
                          <Fragment key={tecnica.id}>
                            <div
                              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 px-3 py-3"
                            >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-400">
                              {String(index + 1).padStart(2, "0")}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`text-sm font-medium ${
                                    tecnica.ativa
                                      ? "text-white"
                                      : "text-slate-500"
                                  }`}
                                >
                                  {tecnica.nome}
                                </span>

                                {tecnica.ativa ? (
                                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                                    Ativa
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                                    Inativa
                                  </span>
                                )}
                              </div>

                              {tecnica.descricao && (
                                <p className="mt-1 truncate text-xs text-slate-500">
                                  {tecnica.descricao}
                                </p>
                              )}
                            </div>

                            {/* AÇÕES DA TÉCNICA */}
                            <div className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                onClick={() => iniciarEdicao(tecnica)}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-purple-400"
                                title="Editar técnica"
                              >
                                <Pencil size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleAlternarStatus(tecnica)
                                }
                                disabled={processandoId === tecnica.id}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                                title={
                                  tecnica.ativa
                                    ? "Desativar técnica"
                                    : "Reativar técnica"
                                }
                              >
                                {processandoId === tecnica.id ? (
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Power size={16} />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleExcluirTecnica(tecnica)
                                }
                                disabled={processandoId === tecnica.id}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                title="Excluir técnica"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            </div>

                            {/* FORMULÁRIO DE EDIÇÃO DA TÉCNICA */}
                            {editandoId === tecnica.id && (
                            <form
                              onSubmit={(e) =>
                                handleSalvarEdicao(e, tecnica)
                              }
                              className="mt-3 rounded-xl border border-purple-500/20 bg-slate-950 p-4"
                            >
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-white">
                                  Editar técnica
                                </h4>
                              </div>

                              <div>
                                <label className="mb-2 block text-xs font-medium text-slate-300">
                                  Nome da técnica
                                </label>

                                <input
                                  type="text"
                                  value={editandoNome}
                                  onChange={(e) =>
                                    setEditandoNome(e.target.value)
                                  }
                                  required
                                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                                />
                              </div>

                              <div className="mt-4">
                                <label className="mb-2 block text-xs font-medium text-slate-300">
                                  Descrição
                                </label>

                                <textarea
                                  value={editandoDescricao}
                                  onChange={(e) =>
                                    setEditandoDescricao(e.target.value)
                                  }
                                  rows={3}
                                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                                />
                              </div>

                              <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <button
                                  type="button"
                                  onClick={cancelarEdicao}
                                  disabled={salvandoEdicao}
                                  className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
                                >
                                  Cancelar
                                </button>

                                <button
                                  type="submit"
                                  disabled={
                                    salvandoEdicao || !editandoNome.trim()
                                  }
                                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {salvandoEdicao ? (
                                    <>
                                      <Loader2
                                        size={16}
                                        className="animate-spin"
                                      />
                                      Salvando...
                                    </>
                                  ) : (
                                    <>
                                      <Save size={16} />
                                      Salvar alterações
                                    </>
                                  )}
                                </button>
                              </div>
                            </form>
                            )}
                          </Fragment>
                        ))
                      )}
                    </div>
                    {/* ADICIONAR TÉCNICA */}
                    <button
                      type="button"
                      onClick={() => {
                        setCategoriaSelecionada(String(categoria.id));
                        setNome("");
                        setDescricao("");
                        setMostrarFormulario(true);
                      }}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20"
                    >
                      <Plus size={17} />
                      Adicionar técnica
                    </button>

                    {/* FORMULÁRIO DA TÉCNICA */}
                    {mostrarFormulario &&
                    categoriaSelecionada === String(categoria.id) && (
                      <form
                        onSubmit={handleCriarTecnica}
                        className="mt-4 rounded-xl border border-purple-500/20 bg-slate-950 p-4"
                      >
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white">
                            Nova técnica
                          </h4>

                          <p className="mt-1 text-xs text-slate-500">
                            Adicionando técnica em{" "}
                            <span className="text-purple-400">
                              {categoria.nome}
                            </span>
                          </p>
                        </div>

                        {/* NOME */}
                        <div>
                          <label className="mb-2 block text-xs font-medium text-slate-300">
                            Nome da técnica
                          </label>

                          <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex.: Raspagem tesoura"
                            required
                            autoFocus
                            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                          />
                        </div>

                        {/* DESCRIÇÃO */}
                        <div className="mt-4">
                          <label className="mb-2 block text-xs font-medium text-slate-300">
                            Descrição
                          </label>

                          <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Explique brevemente a técnica..."
                            rows={3}
                            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                          />
                        </div>

                        {/* BOTÕES */}
                        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setMostrarFormulario(false);
                              setCategoriaSelecionada("");
                              setNome("");
                              setDescricao("");
                            }}
                            disabled={criando}
                            className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
                          >
                            Cancelar
                          </button>

                          <button
                            type="submit"
                            disabled={criando || !nome.trim()}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {criando ? (
                              <>
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                                Adicionando...
                              </>
                            ) : (
                              <>
                                <Plus size={16} />
                                Adicionar técnica
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                );
              })}
              
            </div>
          )}
                    {/* ===================================================
              ERRO
          ==================================================== */}

          {erro && (
            <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">

              <span>{erro}</span>

              <button
                onClick={() => setErro("")}
                className="shrink-0 text-red-300 transition hover:text-white"
              >
                <X size={18} />
              </button>

            </div>
          )}

          

        </div>
      </div>
    </DashboardLayout>
  );
}