import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function ProfessorCard({
  professor,
}) {
  const { user } = useAuth();

  const [favoritado, setFavoritado] =
    useState(false);

  const [favoritando, setFavoritando] =
    useState(false);

  const foto =
    professor.foto ||
    "https://ui-avatars.com/api/?name=Professor&background=7B2EFF&color=fff&size=600";

  // =========================================================
  // VERIFICAR SE JÁ ESTÁ FAVORITADO
  // =========================================================

  useEffect(() => {
    async function verificarFavorito() {
      if (
        !user ||
        user.tipo_usuario !== "aluno"
      ) {
        return;
      }

      try {
        const response = await api.get(
          "/favoritos/"
        );

        const favoritos =
          response.data?.results || [];

        const existe =
          favoritos.some(
            (favorito) =>
              favorito.professor ===
              professor.id
          );

        setFavoritado(existe);

      } catch (error) {
        console.error(
          "Erro ao verificar favorito:",
          error
        );
      }
    }

    verificarFavorito();
  }, [professor.id, user]);

  // =========================================================
  // FAVORITAR / DESFAVORITAR
  // =========================================================

  async function alternarFavorito(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      alert(
        "Faça login para adicionar professores aos favoritos."
      );

      return;
    }

    if (
      user.tipo_usuario !== "aluno"
    ) {
      return;
    }

    if (favoritando) {
      return;
    }

    setFavoritando(true);

    try {
      if (favoritado) {
        await api.delete(
          `/professores/${professor.id}/desfavoritar/`
        );

        setFavoritado(false);

      } else {
        await api.post(
          `/professores/${professor.id}/favoritar/`
        );

        setFavoritado(true);
      }

    } catch (error) {
      console.error(
        "Erro ao alterar favorito:",
        error
      );

      alert(
        "Não foi possível alterar o favorito."
      );

    } finally {
      setFavoritando(false);
    }
  }

  return (
    <Card>

      {/* =====================================================
          FOTO
      ====================================================== */}

      <div className="relative overflow-hidden">

        <img
          src={foto}
          alt={professor.nome}
          className="
            w-full
            h-56
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#101828]
            via-transparent
            to-transparent
          "
        />

        {/* =================================================
            BADGE FAIXA
        ================================================== */}

        <div
          className="
            absolute
            top-4
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

        {/* =================================================
            AVALIAÇÃO
        ================================================== */}

        <div
          className="
            absolute
            top-4
            right-4
            bg-black/70
            backdrop-blur
            px-3
            py-1
            rounded-full
            text-yellow-400
            text-sm
            font-bold
          "
        >
          ⭐ {professor.media_avaliacoes ?? "Novo"}
        </div>

        {/* =================================================
            FAVORITO
        ================================================== */}

        {user?.tipo_usuario === "aluno" && (
          <button
            type="button"
            onClick={alternarFavorito}
            disabled={favoritando}
            aria-label={
              favoritado
                ? "Remover dos favoritos"
                : "Adicionar aos favoritos"
            }
            className="
              absolute
              bottom-4
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
              transition-all
              duration-200
              hover:scale-110
              hover:bg-black/90
              disabled:opacity-50
            "
          >
            <Heart
              size={22}
              className={
                favoritado
                  ? "fill-red-500 text-red-500"
                  : "text-white"
              }
            />
          </button>
        )}

      </div>

      {/* =====================================================
          CONTEÚDO
      ====================================================== */}

      <div className="p-5">

        <h2 className="text-xl font-bold text-white">
          {professor.nome}
        </h2>

        <p className="text-gray-400 mt-2">
          📍 {professor.cidade}
          {" • "}
          🥋 {professor.faixa}
        </p>

        <p className="text-gray-500 text-sm mt-2">
          Especialista em{" "}
          {professor.especialidade}
        </p>

        {/* =================================================
            PREÇO
        ================================================== */}

        <div className="mt-6 mb-5">

          <p
            className="
              text-gray-500
              text-xs
              uppercase
              tracking-wider
            "
          >
            Aula Particular
          </p>

          <p
            className="
              text-2xl
              font-black
              text-green-400
            "
          >
            R$ {professor.preco_hora}

            <span
              className="
                text-base
                text-gray-400
                font-medium
              "
            >
              /hora
            </span>

          </p>

        </div>

        {/* =================================================
            VER PERFIL
        ================================================== */}

        <Link
          to={`/professor/${professor.id}`}
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