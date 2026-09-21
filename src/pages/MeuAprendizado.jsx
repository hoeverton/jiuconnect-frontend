import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";
import api from "../services/api";
import {
  CheckCircle2,
  ArrowLeft,
  BookOpen,
  Circle,
} from "lucide-react";

export default function MeuAprendizado() {
  const [progresso, setProgresso] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarAprendizado() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/meu-progresso/");

        setProgresso(response.data?.results || []);
      } catch (error) {
        console.error("Erro ao carregar aprendizado:", error);
        setError("Não foi possível carregar seu aprendizado.");
      } finally {
        setLoading(false);
      }
    }

    carregarAprendizado();
  }, []);

  const totalTecnicas = progresso.length;

  const totalAprendidas = progresso.filter(
    (item) => item.aprendido
  ).length;

  const percentualProgresso =
    totalTecnicas > 0
      ? Math.round((totalAprendidas / totalTecnicas) * 100)
      : 0;

  const trilhaAtual =
    progresso.length > 0 ? progresso[0].trilha_nome : null;

  const categorias = useMemo(() => {
    const agrupadas = {};

    progresso.forEach((item) => {
      const categoria = item.categoria_nome || "Sem categoria";

      if (!agrupadas[categoria]) {
        agrupadas[categoria] = [];
      }

      agrupadas[categoria].push(item);
    });

    return Object.entries(agrupadas);
  }, [progresso]);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* CABEÇALHO */}
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm mb-5"
          >
            <ArrowLeft size={16} />
            Voltar para o Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <BookOpen
                size={22}
                className="text-violet-400"
              />
            </div>

            <div>
              <h1 className="text-3xl font-black text-white">
                Meu Aprendizado
              </h1>

              <p className="text-zinc-500 mt-1">
                Acompanhe sua evolução e tudo o que você já aprendeu.
              </p>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <Card className="p-8">
            <div className="text-center text-zinc-500">
              Carregando seu aprendizado...
            </div>
          </Card>
        )}

        {/* ERRO */}
        {!loading && error && (
          <Card className="p-8">
            <div className="text-center text-red-400">
              {error}
            </div>
          </Card>
        )}

        {/* CONTEÚDO */}
        {!loading && !error && (
          <>
            {/* RESUMO DA TRILHA */}
            <section>
              <div className="mb-5">
                <h2 className="text-xl font-bold text-white">
                  Trilha atual
                </h2>

                <p className="text-zinc-500 text-sm mt-1">
                  Veja seu progresso geral nesta trilha.
                </p>
              </div>

              <Card className="p-6">
                {trilhaAtual ? (
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-zinc-500 text-sm">
                          Trilha
                        </p>

                        <h3 className="text-2xl font-black text-white mt-1">
                          {trilhaAtual}
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-black text-violet-400">
                          {percentualProgresso}%
                        </p>

                        <p className="text-zinc-500 text-xs mt-1">
                          concluído
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentualProgresso}%`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-zinc-500 text-sm">
                        {totalAprendidas} de {totalTecnicas} técnicas aprendidas
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <BookOpen
                      size={32}
                      className="mx-auto text-zinc-700 mb-3"
                    />

                    <h3 className="text-lg font-bold text-white">
                      Nenhuma trilha atribuída
                    </h3>

                    <p className="text-zinc-500 text-sm mt-2">
                      Seu professor ainda não atribuiu uma trilha de aprendizado.
                    </p>
                  </div>
                )}
              </Card>
            </section>

            {/* CATEGORIAS */}
            {categorias.length > 0 && (
              <section>
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-white">
                    Técnicas
                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">
                    Seu aprendizado organizado por categoria.
                  </p>
                </div>

                <div className="space-y-5">
                  {categorias.map(([categoria, tecnicas]) => {
                    const aprendidas = tecnicas.filter(
                      (item) => item.aprendido
                    ).length;

                    const total = tecnicas.length;

                    const percentual =
                      total > 0
                        ? Math.round((aprendidas / total) * 100)
                        : 0;

                    return (
                      <Card
                        key={categoria}
                        className="overflow-hidden"
                      >
                        {/* CABEÇALHO DA CATEGORIA */}
                        <div className="p-6 border-b border-zinc-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-white">
                                {categoria}
                              </h3>

                              <p className="text-zinc-500 text-sm mt-1">
                                {aprendidas} de {total} técnicas aprendidas
                              </p>
                            </div>

                            <div className="text-right">
                              <span className="text-xl font-black text-violet-400">
                                {percentual}%
                              </span>
                            </div>
                          </div>

                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-4">
                            <div
                              className="h-full bg-violet-500 rounded-full transition-all duration-500"
                              style={{
                                width: `${percentual}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* TÉCNICAS */}
                        <div className="divide-y divide-zinc-800">
                          {tecnicas.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-4 px-6 py-4"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {item.aprendido ? (
                                  <CheckCircle2
                                    size={20}
                                    className="text-emerald-400 shrink-0"
                                  />
                                ) : (
                                  <Circle
                                    size={20}
                                    className="text-zinc-600 shrink-0"
                                  />
                                )}

                                <div className="min-w-0">
                                  <p className="text-white font-medium truncate">
                                    {item.tecnica_nome}
                                  </p>

                                  <p className="text-zinc-600 text-xs mt-1">
                                    {item.aprendido
                                      ? "Técnica aprendida"
                                      : "Ainda não aprendida"}
                                  </p>
                                </div>
                              </div>

                              <span
                                className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${
                                  item.aprendido
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "bg-zinc-800 text-zinc-500"
                                }`}
                              >
                                {item.aprendido
                                  ? "Aprendida"
                                  : "Pendente"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}