import { useEffect, useState } from "react";
import api from "../../services/api";
import Button from "../ui/Button";

export default function BookingModal({
  open,
  onClose,
  professor,
  horarioSelecionado: horarioInicial,
}) {
  const [dias, setDias] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // =========================================================
  // CARREGAR DISPONIBILIDADES
  // =========================================================

  useEffect(() => {
    async function carregarHorarios() {
      if (!professor?.id) {
        return;
      }

      setLoading(true);
      setErro("");

      try {
        const response = await api.get(
          "/disponibilidades/",
          {
            params: {
              professor: professor.id,
            },
          }
        );

        const resultados = response.data || [];

        setDias(resultados);

        // Se o aluno clicou em um horário antes de abrir o modal,
        // encontramos o dia correspondente.
        if (horarioInicial) {
          const diaEncontrado = resultados.find(
            (dia) =>
              dia.horarios.some(
                (horario) =>
                  horario.id === horarioInicial.id
              )
          );

          if (diaEncontrado) {
            setDiaSelecionado(diaEncontrado);

            const horarioEncontrado =
              diaEncontrado.horarios.find(
                (horario) =>
                  horario.id === horarioInicial.id
              );

            setHorarioSelecionado(
              horarioEncontrado || horarioInicial
            );
          }
        } else if (resultados.length > 0) {
          setDiaSelecionado(resultados[0]);
          setHorarioSelecionado(null);
        } else {
          setDiaSelecionado(null);
          setHorarioSelecionado(null);
        }

      } catch (error) {
        console.error(
          "Erro ao carregar horários:",
          error
        );

        setErro(
          "Não foi possível carregar os horários disponíveis."
        );

        setDias([]);

      } finally {
        setLoading(false);
      }
    }

    if (open) {
      carregarHorarios();
    }
  }, [open, professor, horarioInicial]);

  // =========================================================
  // FECHAR MODAL
  // =========================================================

  function handleClose() {
    if (salvando) {
      return;
    }

    setDiaSelecionado(null);
    setHorarioSelecionado(null);
    setErro("");
    setDias([]);

    onClose();
  }

  // =========================================================
  // CONFIRMAR AGENDAMENTO
  // =========================================================

  async function confirmarAgendamento() {
    if (!horarioSelecionado) {
      return;
    }

    setSalvando(true);
    setErro("");

    try {
      await api.post(
        "/agendamentos/create/",
        {
          disponibilidade:
            horarioSelecionado.id,
        }
      );

      alert(
        "Aula agendada com sucesso!"
      );

      handleClose();

    } catch (error) {
      console.error(
        "Erro ao realizar agendamento:",
        error
      );

      const mensagem =
        error?.response?.data;

      if (
        typeof mensagem === "string"
      ) {
        setErro(mensagem);

      } else if (
        mensagem?.detail
      ) {
        setErro(mensagem.detail);

      } else {
        setErro(
          "Não foi possível realizar o agendamento."
        );
      }

    } finally {
      setSalvando(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          bg-[#101828]
          rounded-3xl
          border
          border-white/10
          shadow-2xl
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            p-8
          "
        >
          <div>

            <h2 className="text-3xl font-black text-white">
              Agendar Aula
            </h2>

            <p className="text-gray-400 mt-2">
              Escolha um horário disponível
            </p>

          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              text-3xl
              text-gray-500
              hover:text-white
              transition
            "
          >
            ×
          </button>

        </div>

        {/* PROFESSOR */}

        <div
          className="
            p-8
            border-b
            border-white/10
          "
        >
          <div className="flex items-center gap-5">

            <img
              src={
                professor?.foto ||
                "https://ui-avatars.com/api/?name=Professor&background=7B2EFF&color=fff"
              }
              alt={
                professor?.nome ||
                "Professor"
              }
              className="
                w-20
                h-20
                rounded-2xl
                object-cover
              "
            />

            <div>

              <h3 className="text-2xl font-bold text-white">
                {professor?.nome}
              </h3>

              <p className="text-gray-400 mt-1">
                🥋 {professor?.faixa}
              </p>

              <p className="text-gray-400">
                📍 {professor?.cidade}
              </p>

            </div>

          </div>
        </div>

        {/* ERRO */}

        {erro && (
          <div className="px-8 pt-6">

            <div
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-400
              "
            >
              {erro}
            </div>

          </div>
        )}

        {/* DISPONIBILIDADE */}

        <div className="p-8">

          <h3 className="text-xl font-bold text-white mb-5">
            Escolha um dia
          </h3>

          {loading ? (

            <p className="text-gray-400">
              Carregando disponibilidade...
            </p>

          ) : dias.length === 0 ? (

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.02]
                p-6
              "
            >
              <p className="text-gray-400">
                Este professor não possui horários disponíveis no momento.
              </p>
            </div>

          ) : (

            <>
              {/* DIAS */}

              <div
                className="
                  flex
                  gap-3
                  overflow-x-auto
                  mb-7
                  pb-2
                "
              >

                {dias.map((dia) => {

                  const data =
                    new Date(
                      `${dia.data}T00:00:00`
                    );

                  const selecionado =
                    diaSelecionado?.data ===
                    dia.data;

                  return (
                    <button
                      key={dia.data}
                      type="button"
                      onClick={() => {

                        setDiaSelecionado(
                          dia
                        );

                        setHorarioSelecionado(
                          null
                        );

                        setErro("");

                      }}
                      className={`
                        min-w-[95px]
                        rounded-2xl
                        border
                        py-3
                        px-3
                        transition

                        ${
                          selecionado
                            ? "bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/30"
                            : "border-white/10 hover:border-purple-500 bg-white/[0.02]"
                        }
                      `}
                    >

                      <p
                        className={`
                          text-[10px]
                          uppercase
                          tracking-widest
                          ${
                            selecionado
                              ? "text-purple-100"
                              : "text-purple-300"
                          }
                        `}
                      >
                        {data
                          .toLocaleDateString(
                            "pt-BR",
                            {
                              weekday:
                                "short",
                            }
                          )
                          .replace(
                            ".",
                            ""
                          )
                          .toUpperCase()}
                      </p>

                      <p className="text-lg font-black text-white mt-1">
                        {data
                          .toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month:
                                "short",
                            }
                          )
                          .replace(
                            ".",
                            ""
                          )
                          .toUpperCase()}
                      </p>

                      <p className="text-[10px] text-white/50 mt-1">
                        {dia.horarios.length}{" "}
                        {dia.horarios.length === 1
                          ? "horário"
                          : "horários"}
                      </p>

                    </button>
                  );
                })}

              </div>

              {/* HORÁRIOS */}

              <h3 className="text-base font-bold text-white mb-3">
                Horários disponíveis
              </h3>

              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  md:grid-cols-4
                  gap-3
                "
              >

                {diaSelecionado?.horarios?.map(
                  (horario) => {

                    const selecionado =
                      horarioSelecionado?.id ===
                      horario.id;

                    return (
                      <button
                        key={horario.id}
                        type="button"
                        onClick={() => {

                          setHorarioSelecionado(
                            horario
                          );

                          setErro("");

                        }}
                        className={`
                          rounded-xl
                          py-3
                          px-2
                          font-semibold
                          border
                          transition

                          ${
                            selecionado
                              ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/30"
                              : "border-white/10 text-gray-300 hover:border-purple-500 hover:bg-purple-600/10"
                          }
                        `}
                      >

                        {horario.hora_inicio.slice(
                          0,
                          5
                        )}

                        {" → "}

                        {horario.hora_fim.slice(
                          0,
                          5
                        )}

                      </button>
                    );
                  }
                )}

              </div>
            </>
          )}

        </div>

        {/* FOOTER */}

        <div
          className="
            border-t
            border-white/10
            p-8
          "
        >

          <div className="flex justify-between items-center mb-6">

            <div>

              <p className="text-gray-400">
                Valor da Aula
              </p>

              <p className="text-3xl font-black text-green-400">
                R$ {professor?.preco_hora}
              </p>

            </div>

            {horarioSelecionado && (
              <div className="text-right">

                <p className="text-gray-400">
                  Horário
                </p>

                <p className="text-xl font-bold text-white">

                  {horarioSelecionado.hora_inicio.slice(
                    0,
                    5
                  )}

                  {" → "}

                  {horarioSelecionado.hora_fim.slice(
                    0,
                    5
                  )}

                </p>

              </div>
            )}

          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={
              confirmarAgendamento
            }
            disabled={
              !horarioSelecionado ||
              salvando
            }
          >
            {salvando
              ? "Agendando..."
              : "Confirmar Agendamento"}
          </Button>

        </div>

      </div>
    </div>
  );
}