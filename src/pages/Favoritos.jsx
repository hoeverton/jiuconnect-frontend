import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Star } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import api from "../services/api";

export default function Favoritos() {
  const [favoritos, setFavoritos] =
    useState([]);

  const [professores, setProfessores] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================================================
  // CARREGAR FAVORITOS
  // =========================================================

  useEffect(() => {
    async function carregarFavoritos() {
      try {
        setLoading(true);
        setError("");

        const response =
          await api.get("/favoritos/");

        const lista =
          response.data?.results || [];

        setFavoritos(lista);

        // Buscar dados completos dos professores
        const professoresCompletos =
          await Promise.all(
            lista.map(async (favorito) => {
              try {
                const professorResponse =
                  await api.get(
                    `/professores/${favorito.professor}/`
                  );

                return {
                  ...professorResponse.data,
                  favoritoId: favorito.id,
                };

              } catch (error) {
                console.error(
                  `Erro ao carregar professor ${favorito.professor}:`,
                  error
                );

                return null;
              }
            })
          );

        setProfessores(
          professoresCompletos.filter(
            Boolean
          )
        );

      } catch (error) {
        console.error(
          "Erro ao carregar favoritos:",
          error
        );

        setError(
          "Não foi possível carregar seus favoritos."
        );

      } finally {
        setLoading(false);
      }
    }

    carregarFavoritos();
  }, []);

  // =========================================================
  // REMOVER FAVORITO
  // =========================================================

  async function removerFavorito(
    professorId
  ) {
    try {
      await api.delete(
        `/professores/${professorId}/desfavoritar/`
      );

      setProfessores(
        (lista) =>
          lista.filter(
            (professor) =>
              professor.id !==
              professorId
          )
      );

      setFavoritos(
        (lista) =>
          lista.filter(
            (favorito) =>
              favorito.professor !==
              professorId
          )
      );

    } catch (error) {
      console.error(
        "Erro ao remover favorito:",
        error
      );

      alert(
        "Não foi possível remover o favorito."
      );
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <DashboardLayout>

        <div className="flex items-center justify-center py-20">

          <p className="text-zinc-400">
            Carregando favoritos...
          </p>

        </div>

      </DashboardLayout>
    );
  }

  // =========================================================
  // ERRO
  // =========================================================

  if (error) {
    return (
      <DashboardLayout>

        <div className="space-y-6">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Meus Favoritos
            </h1>

            <p className="text-zinc-500 mt-2">
              Professores que você salvou.
            </p>

          </div>

          <Card className="p-8">

            <p className="text-red-400">
              {error}
            </p>

          </Card>

        </div>

      </DashboardLayout>
    );
  }

  // =========================================================
  // SEM FAVORITOS
  // =========================================================

  if (professores.length === 0) {
    return (
      <DashboardLayout>

        <div className="space-y-8">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Meus Favoritos
            </h1>

            <p className="text-zinc-500 mt-2">
              Professores que você salvou.
            </p>

          </div>

          <Card className="p-12">

            <div className="text-center max-w-md mx-auto">

              <div
                className="
                  w-20
                  h-20
                  mx-auto
                  rounded-full
                  bg-red-500/10
                  border
                  border-red-500/20
                  flex
                  items-center
                  justify-center
                  mb-6
                "
              >
                <Heart
                  size={36}
                  className="text-red-400"
                />
              </div>

              <h2 className="text-xl font-bold text-white">
                Você ainda não possui favoritos
              </h2>

              <p className="text-zinc-500 mt-3">
                Encontre professores que combinam
                com você e salve seus favoritos
                para encontrar rapidamente depois.
              </p>

              <Link
                to="/professores"
                className="block mt-6"
              >
                <Button
                  variant="primary"
                  fullWidth
                >
                  Encontrar Professores
                </Button>
              </Link>

            </div>

          </Card>

        </div>

      </DashboardLayout>
    );
  }

  // =========================================================
  // LISTA
  // =========================================================

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* CABEÇALHO */}

        <div>

          <h1 className="text-3xl font-bold text-white">
            Meus Favoritos
          </h1>

          <p className="text-zinc-500 mt-2">
            Professores que você salvou.
          </p>

        </div>

        {/* CONTADOR */}

        <div className="text-sm text-zinc-500">

          {professores.length}{" "}
          {professores.length === 1
            ? "professor favorito"
            : "professores favoritos"}

        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {professores.map(
            (professor) => {

              const foto =
                professor.foto ||
                "https://ui-avatars.com/api/?name=Professor&background=7B2EFF&color=fff&size=600";

              return (
                <Card
                  key={professor.id}
                  className="overflow-hidden"
                >

                  {/* FOTO */}

                  <div className="relative">

                    <img
                      src={foto}
                      alt={professor.nome}
                      className="
                        w-full
                        h-56
                        object-cover
                      "
                    />

                    {/* FAVORITO */}

                    <button
                      type="button"
                      onClick={() =>
                        removerFavorito(
                          professor.id
                        )
                      }
                      className="
                        absolute
                        top-4
                        right-4
                        w-11
                        h-11
                        rounded-full
                        bg-black/70
                        backdrop-blur
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                        hover:scale-110
                        transition
                      "
                      aria-label="Remover favorito"
                    >
                      <Heart
                        size={22}
                        className="
                          fill-red-500
                          text-red-500
                        "
                      />
                    </button>

                    {/* FAIXA */}

                    <div
                      className="
                        absolute
                        bottom-4
                        left-4
                        bg-purple-600
                        text-white
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                      "
                    >
                      🥋 {professor.faixa}
                    </div>

                  </div>

                  {/* CONTEÚDO */}

                  <div className="p-5">

                    <h2 className="text-xl font-bold text-white">
                      {professor.nome}
                    </h2>

                    {/* CIDADE */}

                    <div className="flex items-center gap-2 mt-3 text-zinc-400">

                      <MapPin size={16} />

                      {professor.cidade}

                    </div>

                    {/* AVALIAÇÃO */}

                    <div className="flex items-center gap-2 mt-2 text-yellow-400">

                      <Star
                        size={16}
                        className="fill-yellow-400"
                      />

                      {professor.media_avaliacoes ??
                        "Novo"}

                    </div>

                    {/* ESPECIALIDADE */}

                    <p className="text-zinc-500 text-sm mt-3">

                      Especialista em{" "}
                      {professor.especialidade}

                    </p>

                    {/* PREÇO */}

                    <div className="mt-5">

                      <p className="text-xs uppercase tracking-wider text-zinc-500">
                        Aula Particular
                      </p>

                      <p className="text-2xl font-black text-green-400">

                        R$ {professor.preco_hora}

                        <span className="text-base text-zinc-500 font-medium">
                          /hora
                        </span>

                      </p>

                    </div>

                    {/* BOTÃO */}

                    <Link
                      to={`/professor/${professor.id}`}
                      className="block mt-5"
                    >

                      <Button
                        variant="primary"
                        fullWidth
                      >
                        Ver Perfil →
                      </Button>

                    </Link>

                  </div>

                </Card>
              );
            }
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}