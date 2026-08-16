import Card from "../../ui/Card";

export default function CalendarWidget() {
  const hoje = new Date();

  const mes = hoje.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Card className="p-6 h-full">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-semibold text-white">
          Calendário
        </h2>

        <span className="text-sm text-zinc-500 capitalize">
          {mes}
        </span>

      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">

        {diasSemana.map((dia) => (
          <div
            key={dia}
            className="text-center text-xs font-semibold text-zinc-500"
          >
            {dia}
          </div>
        ))}

      </div>

      <div className="grid grid-cols-7 gap-2">

        {dias.map((dia) => {

          const isToday = dia === hoje.getDate();

          return (
            <button
              key={dia}
              className={`
                h-10
                rounded-lg
                text-sm
                transition

                ${
                  isToday
                    ? "bg-violet-600 text-white font-semibold"
                    : "text-zinc-400 hover:bg-zinc-800"
                }
              `}
            >
              {dia}
            </button>
          );

        })}

      </div>

    </Card>
  );
}