export default function AvailabilityGrid() {

  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "19:00",
    "20:00",
  ];

  const dias = [
    "SEG",
    "TER",
    "QUA",
    "QUI",
    "SEX",
    "SÁB",
  ];

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
          overflow-hidden
        "
      >

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="p-5 text-left">

                  Horário

                </th>

                {dias.map((dia) => (

                  <th
                    key={dia}
                    className="text-center p-5"
                  >

                    {dia}

                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {horarios.map((hora) => (

                <tr
                  key={hora}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >

                  <td className="p-5 font-semibold text-gray-300">

                    {hora}

                  </td>

                  {dias.map((dia, index) => (

                    <td
                      key={dia + hora}
                      className="text-center"
                    >

                      <button
                        className={`
                          w-5
                          h-5
                          rounded-full
                          transition
                          ${
                            (hora.length + index) % 3 === 0
                              ? "bg-gray-600"
                              : "bg-green-500 hover:scale-125"
                          }
                        `}
                      />

                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="flex gap-8 mt-6 text-sm text-gray-400">

        <div className="flex items-center gap-2">

          <div className="w-4 h-4 rounded-full bg-green-500"></div>

          Disponível

        </div>

        <div className="flex items-center gap-2">

          <div className="w-4 h-4 rounded-full bg-gray-600"></div>

          Ocupado

        </div>

      </div>

    </section>

  );

}