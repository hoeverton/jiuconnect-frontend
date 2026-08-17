import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BookingModal from "./BookingModal";
import AvailabilityGrid from "./AvailabilityGrid";

import api from "../../services/api";
import Button from "../ui/Button";

export default function ProfessorProfile() {
  const { id } = useParams();

  const [professor, setProfessor] =
    useState(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [horarioSelecionado, setHorarioSelecionado] =
    useState(null);

  const fotoPadrao =
    "https://ui-avatars.com/api/?name=Professor&background=7B2EFF&color=fff&size=600";

  // =========================================================
  // CARREGAR PROFESSOR
  // =========================================================

  useEffect(() => {
    async function carregarProfessor() {
      try {
        const response =
          await api.get(
            `/professores/${id}/`
          );

        setProfessor(
          response.data
        );

      } catch (err) {
        console.error(
          "Erro ao carregar professor:",
          err
        );
      }
    }

    carregarProfessor();
  }, [id]);

  // =========================================================
  // ABRIR MODAL
  // =========================================================

  function handleAgendar(horario) {
    setHorarioSelecionado(
      horario
    );

    setModalOpen(true);
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (!professor) {
    return (
      <section className="max-w-7xl mx-auto py-20 px-8">

        <p className="text-center text-gray-400">
          Carregando Professor...
        </p>

      </section>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="max-w-7xl mx-auto pt-32 pb-14 px-8">

      {/* =====================================================
          HERO
      ====================================================== */}

      <div className="grid lg:grid-cols-5 gap-8 items-center">

        {/* FOTO */}

        <div className="lg:col-span-2">

          <img
            src={
              professor.foto ||
              fotoPadrao
            }
            alt={professor.nome}
            className="
              w-full
              max-w-sm
              h-[380px]
              mx-auto
              rounded-3xl
              object-cover
              shadow-2xl
            "
          />

        </div>

        {/* DADOS */}

        <div className="lg:col-span-3">

          <span className="inline-flex bg-purple-600 px-4 py-2 rounded-full font-semibold">

            🥋 {professor.faixa}

          </span>

          <h1 className="text-5xl font-black mt-4">

            {professor.nome}

          </h1>

          <div className="mt-3 text-base text-gray-300">

            ⭐ {professor.media_avaliacoes}

            <span className="text-gray-500">

              {" "}
              •{" "}
              {professor.total_avaliacoes} avaliações

            </span>

          </div>

          <div className="flex flex-wrap gap-5 mt-3 text-gray-300">

            <span>
              📍 {professor.cidade}
            </span>

            <span>
              🎯 {professor.especialidade}
            </span>

          </div>

          {/* PREÇO */}

          <div className="mt-6">

            <p className="text-gray-500 uppercase text-sm">
              Valor da Aula
            </p>

            <p className="text-4xl font-black text-green-400">

              R$ {professor.preco_hora}

              <span className="text-xl text-gray-400">
                /hora
              </span>

            </p>

          </div>

          {/* BOTÕES */}

          <div className="flex flex-wrap gap-3 mt-6">

            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                setModalOpen(true)
              }
            >
              Agendar Aula
            </Button>

            <Button
              variant="secondary"
              size="lg"
            >
              WhatsApp
            </Button>

          </div>

          {/* ESTATÍSTICAS */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-8
              border-y
              border-white/10
              py-4
            "
          >

            <div>

              <p className="text-2xl font-black">
                {professor.total_alunos}
              </p>

              <p className="text-sm text-gray-400">
                👥 Alunos
              </p>

            </div>

            <div>

              <p className="text-2xl font-black">
                {professor.total_aulas_concluidas}
              </p>

              <p className="text-sm text-gray-400">
                📚 Aulas
              </p>

            </div>

            <div>

              <p className="text-2xl font-black">
                {professor.total_avaliacoes}
              </p>

              <p className="text-sm text-gray-400">
                ⭐ Avaliações
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SOBRE
      ====================================================== */}

      <div className="mt-12">

        <h2 className="text-3xl font-black mb-6">
          Sobre o Professor
        </h2>

        <div
          className="
            bg-[#111827]
            rounded-3xl
            border
            border-white/10
            p-6
          "
        >

          <p className="text-gray-300 leading-7">

            {professor.biografia}

          </p>

        </div>

      </div>

      {/* =====================================================
          ESPECIALIDADES
      ====================================================== */}

      <div className="mt-10">

        <h2 className="text-3xl font-black mb-6">
          Especialidades
        </h2>

        <div className="flex flex-wrap gap-3">

          <span
            className="
              px-5
              py-2
              rounded-full
              bg-purple-600/20
              border
              border-purple-500/30
              text-purple-300
            "
          >
            🥋 {professor.especialidade}
          </span>

          <span className="px-5 py-2 rounded-full bg-[#161F2F]">
            Competição
          </span>

          <span className="px-5 py-2 rounded-full bg-[#161F2F]">
            No-Gi
          </span>

          <span className="px-5 py-2 rounded-full bg-[#161F2F]">
            Defesa Pessoal
          </span>

        </div>

      </div>

      {/* =====================================================
          DISPONIBILIDADE REAL
      ====================================================== */}

      <AvailabilityGrid
        professor={professor}
        onAgendar={handleAgendar}
      />

      {/* =====================================================
          MODAL DE AGENDAMENTO
      ====================================================== */}

      <BookingModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setHorarioSelecionado(null);
        }}
        professor={professor}
        horarioSelecionado={
          horarioSelecionado
        }
      />

    </section>
  );
}