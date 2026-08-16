import { useEffect, useState } from "react";
import api from "../../services/api";
import Button from "../ui/Button";

export default function BookingModal({
  open,
  onClose,
  professor,
}) {

const [dias, setDias] = useState([]);
const [salvando, setSalvando] = useState(false);
const [diaSelecionado, setDiaSelecionado] = useState(null);
const [horarioSelecionado, setHorarioSelecionado] = useState(null);
const [loading, setLoading] = useState(false);

  useEffect(() => {

    async function carregarHorarios() {

      if (!professor) return;

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

        setDias(response.data);

        if (response.data.length > 0) {
            setDiaSelecionado(response.data[0]);
        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }

    if (open) {

      carregarHorarios();

    }

  }, [open, professor]);

  if (!open) return null;
  async function confirmarAgendamento() {

  if (!horarioSelecionado) return;

  setSalvando(true);

  try {

    await api.post("/agendamentos/create/", {

      disponibilidade: horarioSelecionado.id,

    });

    alert("Aula agendada com sucesso!");

    onClose();

  } catch (err) {

    console.log(err);

    alert("Erro ao realizar agendamento.");

  } finally {

    setSalvando(false);

  }

}
  return (

    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">

      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#101828] rounded-3xl border border-white/10 shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-white/10 p-8">

          <div>

            <h2 className="text-3xl font-black text-white">

              Agendar Aula

            </h2>

            <p className="text-gray-400 mt-2">

              Escolha um horário disponível

            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-white transition"
          >
            ×
          </button>

        </div>

        {/* PROFESSOR */}

        <div className="p-8 border-b border-white/10">

          <div className="flex items-center gap-5">

            <img
              src={
                professor.foto ||
                "https://ui-avatars.com/api/?name=Professor&background=7B2EFF&color=fff"
              }
              alt={professor.nome}
              className="w-20 h-20 rounded-2xl object-cover"
            />

            <div>

              <h3 className="text-2xl font-bold">

                {professor.nome}

              </h3>

              <p className="text-gray-400 mt-1">

                🥋 {professor.faixa}

              </p>

              <p className="text-gray-400">

                📍 {professor.cidade}

              </p>

            </div>

          </div>

        </div>

        {/* DISPONIBILIDADE */}

        <div className="p-6">

          <h3 className="text-xl font-bold mb-4">

            Escolha um dia

          </h3>

          {loading ? (

            <p className="text-gray-400">

              Carregando disponibilidade...

            </p>

          ) : dias.length === 0 ? (

            <p className="text-gray-400">

              Nenhuma disponibilidade encontrada.

            </p>

          ) : (

            <>

              {/* DIAS */}

              <div className="flex gap-2 overflow-x-auto mb-4 pb-2">

                {dias.map((dia) => (

                  <button
                    key={dia.data}
                    onClick={() => {

                      setDiaSelecionado(dia);
                      setHorarioSelecionado(null);

                    }}
                    className={`min-w-[80px] rounded-xl border py-2 px-2 transition duration-300 ${
                      diaSelecionado?.data === dia.data
                        ? "bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/30 scale-105"
                        : "border-white/10 hover:border-purple-500 hover:scale-105"
                    }`}
                  >

                    <p className="text-[10px] uppercase tracking-widest text-purple-200">

                      {new Date(dia.data)
                        .toLocaleDateString("pt-BR", {
                          weekday: "short",
                        })
                        .replace(".", "")
                        .toUpperCase()}

                    </p>

                    <p className="text-lg font-black mt-1">

                      {new Date(dia.data)
                        .toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })
                        .replace(".", "")
                        .toUpperCase()}

                    </p>

                  </button>

                ))}

              </div>

              {/* HORÁRIOS */}

              <h3 className="text-base font-bold mb-3">

                Horários Disponíveis

              </h3>

              <div className="grid grid-cols-4 gap-2">

                {diaSelecionado?.horarios.map((horario) => (

                  <button
                    key={horario.id}
                    onClick={() => setHorarioSelecionado(horario)}
                    className={`rounded-xl py-2 font-semibold border transition duration-300 ${
                      horarioSelecionado?.id === horario.id
                        ? "bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/30"
                        : "border-white/10 hover:border-purple-500 hover:bg-purple-600/10"
                    }`}
                  >

                    {horario.hora_inicio}

                  </button>

                ))}

              </div>

            </>

          )}

        </div>

        {/* FOOTER */}

        <div className="border-t border-white/10 p-8">

          <div className="flex justify-between items-center mb-4">

            <div>

              <p className="text-gray-400">

                Valor da Aula

              </p>

              <p className="text-3xl font-black text-green-400">

                R$ {professor.preco_hora}

              </p>

            </div>

            {horarioSelecionado && (

              <div className="text-right">

                <p className="text-gray-400">

                  Horário

                </p>

                <p className="text-xl font-bold">

                  {horarioSelecionado.hora_inicio.slice(0,5)}

                </p>

              </div>

            )}

          </div>

          <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={confirmarAgendamento}
              disabled={!horarioSelecionado || salvando}
            >

              {salvando ? "Agendando..." : "Confirmar Agendamento"}

          </Button>

        </div>

      </div>

    </div>

  );

}