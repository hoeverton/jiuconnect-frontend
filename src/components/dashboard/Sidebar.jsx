import {
  Home,
  User,
  Calendar,
  Clock3,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menu = [
  {
    label: "Dashboard",
    icon: Home,
    to: "/dashboard",
  },
  {
    label: "Conta",
    icon: User,
    to: "/minha-conta",
  },
  {
    label: "Agenda",
    icon: Calendar,
    to: "/agenda",
  },
  {
    label: "Disponibilidades",
    icon: Clock3,
    to: "/disponibilidades",
  },
  {
    label: "Configurações",
    icon: Settings,
    to: "/configuracoes",
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const { user, logout } = useAuth();

  const initial =
    user?.username?.charAt(0).toUpperCase() || "?";

  return (
    <>
      {/* Overlay Mobile */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-72
          bg-[#0B0B0E]
          border-r
          border-zinc-800
          flex
          flex-col
          z-50
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:static
          lg:flex
        `}
      >
        {/* Cabeçalho */}

        <div className="px-8 py-8 border-b border-zinc-800 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-black text-white">
              Jiu<span className="text-violet-500">Connect</span>
            </h1>

            <p className="text-zinc-500 text-sm mt-2">
              Professor Dashboard
            </p>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X />
          </button>

        </div>

        {/* Menu */}

        <nav className="flex-1 px-5 py-8 space-y-2">

          {menu.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  transition-all

                  ${
                    isActive
                      ? "bg-violet-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }
                `
                }
              >
                <Icon size={20} />

                {item.label}
              </NavLink>
            );

          })}

        </nav>

        {/* Rodapé */}

        <div className="border-t border-zinc-800 p-6">

          <div className="flex items-center gap-4 mb-6">

            {/* Avatar */}

            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center font-bold text-white">
              {initial}
            </div>

            {/* Dados do usuário */}

            <div>

              <p className="text-white font-semibold">
                {user?.username || "Usuário"}
              </p>

              <p className="text-zinc-500 text-sm capitalize">
                {user?.tipo_usuario || ""}
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={logout}
            className="flex items-center gap-3 text-zinc-400 hover:text-red-400 transition"
          >

            <LogOut size={20} />

            Sair

          </button>

        </div>

      </aside>
    </>
  );
}