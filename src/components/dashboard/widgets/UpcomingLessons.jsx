import { CalendarClock } from "lucide-react";
import Card from "../../ui/Card";

const aulas = [];

export default function UpcomingLessons() {
  return (
    <Card className="p-6 h-full">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-semibold text-white">
            Próximas Aulas
          </h2>

          <p className="text-zinc-500 text-sm">
            Seus próximos agendamentos.
          </p>
        </div>

        <CalendarClock className="text-violet-400" size={26} />

      </div>

      {aulas.length === 0 ? (
        <div className="py-12 flex flex-col items-center text-center">

          <CalendarClock
            size={42}
            className="text-zinc-600 mb-4"
          />

          <p className="text-zinc-300 font-medium">
            Nenhuma aula agendada
          </p>

          <span className="text-zinc-500 text-sm mt-2">
            Quando houver agendamentos eles aparecerão aqui.
          </span>

        </div>
      ) : (
        <div>
          {/* Futuramente renderizaremos as aulas aqui */}
        </div>
      )}

    </Card>
  );
}