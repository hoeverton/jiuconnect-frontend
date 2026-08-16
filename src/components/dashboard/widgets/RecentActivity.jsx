import {
  CalendarPlus,
  Clock3,
  UserPlus,
} from "lucide-react";

import Card from "../../ui/Card";

const atividades = [
  {
    id: 1,
    titulo: "Nenhuma atividade recente",
    descricao: "As movimentações aparecerão aqui.",
    horario: "--:--",
    icon: CalendarPlus,
  },
];

export default function RecentActivity() {
  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Atividade Recente
      </h2>

      <div className="space-y-5">

        {atividades.map((atividade) => {

          const Icon = atividade.icon;

          return (

            <div
              key={atividade.id}
              className="flex items-start gap-4"
            >

              <div className="w-11 h-11 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">

                <Icon
                  size={18}
                  className="text-violet-400"
                />

              </div>

              <div className="flex-1">

                <p className="text-white font-medium">
                  {atividade.titulo}
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  {atividade.descricao}
                </p>

              </div>

              <span className="text-xs text-zinc-600">
                {atividade.horario}
              </span>

            </div>

          );

        })}

      </div>

    </Card>
  );
}