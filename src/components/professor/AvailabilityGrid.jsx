import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AvailabilityGrid({
  professor,
  onAgendar,
}) {
  const [dias, setDias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDisponibilidades() {
      if (!professor?.id) {
        return;
      }

      setLoading(true);

      try {
        const response = await api.get(
          "/disponibilidades/",
          {
            params: {
              professor: professor.id,
            },
          }
        );

        setDias(response.data || []);

      } catch (error) {
        console.error(
          "Erro ao carregar disponibilidades:",
          error
        );

        setDias([]);

      } finally {
        setLoading(false);
      }
    }

    carregarDisponibilidades();
  }, [professor]);

  if (loading) {
    return (
      <section className="mt-24">

        <h2 className="text-4xl font-black mb-10">
          Disponibilidade
        </h2>

        <div
          className="
            bg-[#111827]
            rounded-3xl
            border
            border-white/10
            p-8
          "
        >
          <p className="text-gray-400">
            Carregando horários disponíveis...
          </p>
        </div>

      </section>
    );
  }

  if (dias.length === 0) {
    return (
      <section className="mt-24">

        <h2 className="text-4xl font-black mb-10">
          Disponibilidade
        </h2>

        <div
          className="
            bg-[#111827]
            rounded-3xl
            border
            border-white/10
            p-8
          "
        >

          <p className="text-gray-400">
            Este professor não possui horários disponíveis no momento.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="mt-24">

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">

        <div>

          <h2 className="text-4xl font-black">
            Disponibilidade
          </h2>

          <p className="text-gray-400 mt-2">
            Escolha um dia e encontre um horário para sua aula.
          </p>

        </div>

      </div>

      <div
        className="
          bg-[#111827]
          rounded-3xl
          border
          border-white/10
          overflow-hidden
        "
      >

        <div className="p-6 md:p-8">

          {/* DIAS */}

          <div className="flex gap-3 overflow-x-auto pb-3">

            {dias.map((dia) => {

              const data = new Date(
                `${dia.data}T00:00:00`
              );

              const diaSemana =
                data
                  .toLocaleDateString(
                    "pt-BR",
                    {
                      weekday: "short",
                    }
                  )
                  .replace(".", "")
                  .toUpperCase();

              const dataFormatada =
                data
                  .toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "short",
                    }
                  )
                  .replace(".", "")
                  .toUpperCase();

              return (
                <div
                  key={dia.data}
                  className="
                    min-w-[110px]
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-4
                  "
                >

                  <div className="text-xs text-purple-300 font-semibold">
                    {diaSemana}
                  </div>

                  <div className="text-lg font-black text-white mt-1">
                    {dataFormatada}
                  </div>

                  <div className="mt-4 space-y-2">

                    {dia.horarios.map(
                      (horario) => (

                        <button
                          key={horario.id}
                          type="button"
                          onClick={() =>
                            onAgendar?.(
                              horario
                            )
                          }
                          className="
                            w-full
                            rounded-xl
                            border
                            border-purple-500/20
                            bg-purple-500/10
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            text-purple-300
                            hover:bg-purple-600
                            hover:text-white
                            hover:border-purple-500
                            transition
                          "
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

                      )
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}