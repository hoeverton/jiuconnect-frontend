import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import {
  Calendar,
  Heart,
  CheckCircle2,
  Search,
  Clock3,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function DashboardAluno() {
  const { user } = useAuth();

  const [agendamentos, setAgendamentos] =
    useState([]);

  const [favoritos, setFavoritos] =
    useState([]);
   
  const [progresso, setProgresso] =
  useState([]);  

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================================================
  // CARREGAR DADOS
  // =========================================================

  useEffect(() => {
    async function carregarDashboard() {
      try {
        setLoading(true);
        setError("");

        const [
          agendamentosResponse,
          favoritosResponse,
          progressoResponse,
        ] = await Promise.all([
          api.get("/me/agendamentos/"),
          api.get("/favoritos/"),
          api.get("/meu-progresso/"),
        ]);

        const agendamentosData =
          agendamentosResponse.data?.results ||
          [];

        const favoritosData =
          favoritosResponse.data?.results ||
          [];

        const progressoData = Array.isArray(progressoResponse.data)
          ? progressoResponse.data
          : progressoResponse.data?.results || [];  

        setAgendamentos(
          agendamentosData
        );

        // Buscar informações completas dos favoritos
        const professores =
          await Promise.all(
            favoritosData.map(
              async (favorito) => {
                try {
                  const response =
                    await api.get(
                      `/professores/${favorito.professor}/`
                    );

                  return {
                    ...response.data,
                    favoritoId:
                      favorito.id,
                  };
                } catch (error) {
                  console.error(
                    "Erro ao carregar professor favorito:",
                    error
                  );

                  return null;
                }
              }
            )
          );

        setFavoritos(
          professores.filter(Boolean)
        );

        setProgresso(progressoData);

      } catch (error) {
        console.error(
          "Erro ao carregar dashboard:",
          error
        );

        setError(
          "Não foi possível carregar seu dashboard."
        );

      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, []);

  // =========================================================
  // PRÓXIMAS AULAS
  // =========================================================

  const proximasAulas =
    agendamentos.filter(
      (agendamento) =>
        agendamento.status ===
          "pendente" ||
        agendamento.status ===
          "confirmado"
    );

  // =========================================================
  // AULAS CONCLUÍDAS
  // =========================================================

  const aulasConcluidas =
    agendamentos.filter(
      (agendamento) =>
        agendamento.status ===
        "concluido"
    );

  // =========================================================
  // PRÓXIMA AULA
  // =========================================================

  const proximasAulasOrdenadas = [...proximasAulas].sort((a, b) => {
    const dataHoraA = new Date(`${a.data}T${a.hora_inicio}`);
    const dataHoraB = new Date(`${b.data}T${b.hora_inicio}`);

    return dataHoraA - dataHoraB;
  });

  const proximaAula =
    proximasAulasOrdenadas.length > 0
      ? proximasAulasOrdenadas[0]
      : null;

  // =========================================================
  // PROGRESSO DA TRILHA
  // =========================================================

  const tecnicasAprendidas = progresso.filter(
    (item) => item.aprendido
  );

  const totalTecnicas = progresso.length;

  const totalAprendidas = tecnicasAprendidas.length;

  const percentualProgresso =
    totalTecnicas > 0
      ? Math.round(
          (totalAprendidas / totalTecnicas) * 100
        )
      : 0;    

  // =========================================================
  // FORMATAR DATA
  // =========================================================

  function formatarData(data) {
    if (!data) {
      return "";
    }

    return new Date(
      `${data}T00:00:00`
    ).toLocaleDateString(
      "pt-BR",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
      }
    );
  }

  // =========================================================
  // FORMATAR HORA
  // =========================================================

  function formatarHora(hora) {
    if (!hora) {
      return "";
    }

    return hora.slice(0, 5);
  }

  // =========================================================
  // FOTO
  // =========================================================

  function getPhotoUrl(foto) {
    if (!foto) {
      return null;
    }

    if (foto.startsWith("http")) {
      return foto;
    }

    return `http://127.0.0.1:8000${foto}`;
  }

  // =========================================================
  // STATUS
  // =========================================================

  function statusInfo(status) {
    if (status === "confirmado") {
      return {
        label: "Confirmado",
        className:
          "bg-blue-500/10 text-blue-400 border-blue-500/20",
      };
    }

    if (status === "pendente") {
      return {
        label: "Pendente",
        className:
          "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      };
    }

    return {
      label: status,
      className:
        "bg-zinc-800 text-zinc-400 border-zinc-700",
    };
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center">

          <p className="text-zinc-400">
            Carregando seu dashboard...
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

        <Card className="p-8">

          <p className="text-red-400">
            {error}
          </p>

        </Card>

      </DashboardLayout>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <DashboardLayout>

      <div className="space-y-10">

        {/* ===================================================
            CABEÇALHO
        ==================================================== */}

        <div>

          <p className="text-violet-400 font-medium mb-2">
            Área do aluno
          </p>

          <h1 className="text-3xl md:text-4xl font-black text-white">
            Olá, {user?.username || "Aluno"} 👋
          </h1>

          <p className="text-zinc-500 mt-2">
            Encontre professores, agende suas aulas
            e acompanhe seus treinos.
          </p>

        </div>

        {/* ===================================================
            CARDS DE RESUMO
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
        >

          {/* PRÓXIMAS AULAS */}

          <Card className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Próximas aulas
                </p>

                <p className="text-3xl font-black text-white mt-2">
                  {proximasAulas.length}
                </p>

              </div>

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-violet-500/10
                  border
                  border-violet-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <Calendar
                  size={22}
                  className="text-violet-400"
                />
              </div>

            </div>

          </Card>

          {/* FAVORITOS */}

          <Card className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Favoritos
                </p>

                <p className="text-3xl font-black text-white mt-2">
                  {favoritos.length}
                </p>

              </div>

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <Heart
                  size={22}
                  className="
                    text-red-400
                    fill-red-400
                  "
                />
              </div>

            </div>

          </Card>

          {/* CONCLUÍDAS */}

          <Card className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Aulas concluídas
                </p>

                <p className="text-3xl font-black text-white mt-2">
                  {aulasConcluidas.length}
                </p>

              </div>

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-green-500/10
                  border
                  border-green-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <CheckCircle2
                  size={22}
                  className="text-green-400"
                />
              </div>

            </div>

          </Card>

        </div>

        {/* ===================================================
            PRÓXIMA AULA
        ==================================================== */}

        <section>

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-xl font-bold text-white">
                Próxima aula
              </h2>

              <p className="text-zinc-500 text-sm mt-1">
                Seu próximo compromisso.
              </p>

            </div>

            <Link
              to="/meus-agendamentos"
              className="
                text-violet-400
                hover:text-violet-300
                text-sm
                font-medium
              "
            >
              Ver todos →
            </Link>

          </div>

          {proximaAula ? (

            <Card className="p-6">

              <div
                className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-6
                "
              >

                {/* PROFESSOR */}

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      overflow-hidden
                      bg-violet-500/10
                      border
                      border-violet-500/20
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    "
                  >
                    {getPhotoUrl(proximaAula.professor_foto) ? (
                      <img
                        src={getPhotoUrl(proximaAula.professor_foto)}
                        alt={
                          proximaAula.professor_nome ||
                          "Professor"
                        }
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          bg-gradient-to-br
                          from-violet-500
                          to-purple-700
                          text-white
                          text-xl
                          font-bold
                        "
                      >
                        {proximaAula.professor_nome
                          ?.charAt(0)
                          .toUpperCase() || "P"}
                      </div>
                    )}
                  </div>

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Professor
                    </p>

                    <h3 className="text-lg font-bold text-white">
                      {proximaAula.professor_nome}
                    </h3>

                  </div>

                </div>

                {/* DATA */}

                <div>

                  <p className="text-zinc-500 text-sm">
                    Data
                  </p>

                  <p className="text-white capitalize mt-1">
                    {formatarData(
                      proximaAula.data
                    )}
                  </p>

                </div>

                {/* HORÁRIO */}

                <div>

                  <p className="text-zinc-500 text-sm">
                    Horário
                  </p>

                  <div className="flex items-center gap-2 text-white mt-1">

                    <Clock3
                      size={16}
                      className="text-violet-400"
                    />

                    {formatarHora(
                      proximaAula.hora_inicio
                    )}

                    {" → "}

                    {formatarHora(
                      proximaAula.hora_fim
                    )}

                  </div>

                </div>

                {/* STATUS */}

                <div>

                  <span
                    className={`
                      inline-flex
                      px-3
                      py-1.5
                      rounded-full
                      border
                      text-xs
                      font-semibold
                      ${
                        statusInfo(
                          proximaAula.status
                        ).className
                      }
                    `}
                  >
                    {
                      statusInfo(
                        proximaAula.status
                      ).label
                    }
                  </span>

                </div>

              </div>

            </Card>

          ) : (

            <Card className="p-10">

              <div className="text-center max-w-md mx-auto">

                <Calendar
                  size={40}
                  className="
                    mx-auto
                    text-zinc-600
                  "
                />

                <h3 className="text-lg font-bold text-white mt-4">
                  Você não tem próximas aulas
                </h3>

                <p className="text-zinc-500 mt-2">
                  Encontre um professor e agende
                  sua próxima aula.
                </p>

                <Link
                  to="/professores"
                  className="block mt-6"
                >

                  <Button
                    variant="primary"
                  >
                    <span className="flex items-center gap-2">
                      <Search size={18} />
                      Encontrar Professores
                    </span>
                  </Button>

                </Link>

              </div>

            </Card>

          )}

        </section>
                {/* ===================================================
                    MINHA TRILHA ATUAL
                ==================================================== */}

                <section>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Minha trilha atual
                      </h2>

                      <p className="text-zinc-500 text-sm mt-1">
                        Continue evoluindo no seu aprendizado.
                      </p>
                    </div>

                    <Link
                      to="/meu-aprendizado"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-violet-400
                        hover:text-violet-300
                        text-sm
                        font-medium
                        transition
                      "
                    >
                      Ver meu aprendizado
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <Card className="p-6">

                    {progresso.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between mb-5">

                          <div>
                            <p className="text-zinc-500 text-sm">
                              Trilha
                            </p>

                            <h3 className="text-2xl font-black text-white mt-1">
                              {progresso[0]?.trilha_nome}
                            </h3>
                          </div>

                          <div className="text-right">
                            <p className="text-2xl font-black text-violet-400">
                              {percentualProgresso}%
                            </p>

                            <p className="text-zinc-500 text-xs mt-1">
                              concluído
                            </p>
                          </div>

                        </div>

                        {/* BARRA DE PROGRESSO */}

                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="
                              h-full
                              bg-violet-500
                              rounded-full
                              transition-all
                              duration-500
                            "
                            style={{
                              width: `${percentualProgresso}%`,
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between mt-4">

                          <p className="text-zinc-500 text-sm">
                            {totalAprendidas} de {totalTecnicas} técnicas aprendidas
                          </p>

                          <Link
                            to="/meu-aprendizado"
                            className="
                              inline-flex
                              items-center
                              gap-2
                              text-violet-400
                              hover:text-violet-300
                              text-sm
                              font-medium
                            "
                          >
                            Continuar
                            <ArrowRight size={16} />
                          </Link>

                        </div>
                      </>
                    ) : (
                      <div className="py-8 text-center">

                        <p className="text-zinc-500">
                          Você ainda não possui uma trilha de aprendizado.
                        </p>

                        <p className="text-zinc-600 text-sm mt-2">
                          Seu professor poderá atribuir uma trilha para você.
                        </p>

                      </div>
                    )}

                  </Card>
                </section>

        {/* ===================================================
            FAVORITOS
        ==================================================== */}

        <section>

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-xl font-bold text-white">
                Meus favoritos
              </h2>

              <p className="text-zinc-500 text-sm mt-1">
                Professores que você salvou.
              </p>

            </div>

            {favoritos.length > 0 && (

              <Link
                to="/favoritos"
                className="
                  text-violet-400
                  hover:text-violet-300
                  text-sm
                  font-medium
                "
              >
                Ver todos →
              </Link>

            )}

          </div>

          {favoritos.length === 0 ? (

            <Card className="p-10">

              <div className="text-center">

                <Heart
                  size={36}
                  className="
                    mx-auto
                    text-zinc-600
                  "
                />

                <h3 className="text-lg font-bold text-white mt-4">
                  Nenhum favorito ainda
                </h3>

                <p className="text-zinc-500 mt-2">
                  Salve professores para encontrá-los
                  rapidamente depois.
                </p>

                <Link
                  to="/professores"
                  className="inline-block mt-6"
                >

                  <Button variant="primary">

                    <span className="flex items-center gap-2">

                      <Search size={18} />

                      Encontrar Professores

                    </span>

                  </Button>

                </Link>

              </div>

            </Card>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-5
              "
            >

              {favoritos
                .slice(0, 3)
                .map((professor) => {

                  const foto = getPhotoUrl(
                    professor.foto
                  );

                  return (
                    <Card
                      key={professor.id}
                      className="overflow-hidden"
                    >

                      <div className="relative">

                        {foto ? (
                          <img
                            src={foto}
                            alt={professor.nome}
                            className="
                              w-full
                              h-44
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              w-full
                              h-44
                              bg-gradient-to-br
                              from-violet-500
                              to-purple-700
                              flex
                              items-center
                              justify-center
                              text-5xl
                              font-bold
                              text-white
                            "
                          >
                            {professor.nome
                              ?.charAt(0)
                              .toUpperCase() || "P"}
                          </div>
                        )}

                        <div
                          className="
                            absolute
                            top-3
                            right-3
                            w-9
                            h-9
                            rounded-full
                            bg-black/70
                            backdrop-blur
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <Heart
                            size={17}
                            className="
                              text-red-400
                              fill-red-400
                            "
                          />

                        </div>

                      </div>

                      <div className="p-5">

                        <h3 className="text-lg font-bold text-white">
                          {professor.nome}
                        </h3>

                        <p className="text-zinc-500 text-sm mt-2">
                          🥋 {professor.faixa}
                        </p>

                        <div className="flex items-center gap-2 text-zinc-500 text-sm mt-2">

                          <MapPin size={14} />

                          {professor.cidade}

                        </div>

                        <Link
                          to={`/professor/${professor.id}`}
                          className="block mt-5"
                        >

                          <Button
                            variant="secondary"
                            fullWidth
                          >
                            Ver Perfil
                          </Button>

                        </Link>

                      </div>

                    </Card>
                  );
                })}

            </div>

          )}

        </section>

        {/* ===================================================
            CTA
        ==================================================== */}

        <Card className="p-8 md:p-10">

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
            "
          >

            <div>

              <h2 className="text-2xl font-black text-white">
                Pronto para seu próximo treino?
              </h2>

              <p className="text-zinc-500 mt-2">
                Encontre um professor e agende sua aula.
              </p>

            </div>

            <Link
              to="/professores"
            >

              <Button variant="primary">

                <span className="flex items-center gap-2">

                  Encontrar Professores

                  <ArrowRight size={18} />

                </span>

              </Button>

            </Link>

          </div>

        </Card>

      </div>

    </DashboardLayout>
  );
}