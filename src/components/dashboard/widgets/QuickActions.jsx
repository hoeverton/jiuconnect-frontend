import {
  CalendarPlus,
  Clock3,
  User,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";
import Card from "../../ui/Card";

const actions = [
  {
    title: "Agenda",
    description: "Visualizar agenda",
    icon: CalendarPlus,
    to: "/agenda",
  },
  {
    title: "Disponibilidades",
    description: "Gerenciar horários",
    icon: Clock3,
    to: "/disponibilidades",
  },
  {
    title: "Meu Perfil",
    description: "Editar perfil",
    icon: User,
    to: "/perfil",
  },
  {
    title: "Configurações",
    description: "Preferências",
    icon: Settings,
    to: "/configuracoes",
  },
];

export default function QuickActions() {
  return (
    <Card className="p-6 h-full">

      <h2 className="text-xl font-semibold text-white mb-6">
        Ações Rápidas
      </h2>

      <div className="space-y-3">

        {actions.map((action) => {

          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="
                flex
                items-center
                gap-4
                rounded-xl
                border
                border-zinc-800
                p-4
                transition-all
                hover:border-violet-500/50
                hover:bg-zinc-800/40
              "
            >
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center">

                <Icon
                  size={20}
                  className="text-violet-400"
                />

              </div>

              <div>

                <p className="font-medium text-white">
                  {action.title}
                </p>

                <p className="text-sm text-zinc-500">
                  {action.description}
                </p>

              </div>

            </Link>
          );

        })}

      </div>

    </Card>
  );
}