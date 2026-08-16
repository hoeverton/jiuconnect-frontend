import { useEffect, useState } from "react";
import { Menu, Bell } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getMyProfessorProfile } from "../../services/professorService";

export default function Topbar({ setSidebarOpen }) {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getMyProfessorProfile();

        setProfile(data);
      } catch (error) {
        console.error(
          "Erro ao carregar perfil do professor:",
          error
        );
      }
    }

    loadProfile();
  }, []);

  const initial =
    user?.username?.charAt(0).toUpperCase() || "?";

  function getPhotoUrl() {
    if (!profile?.foto) {
      return null;
    }

    if (profile.foto.startsWith("http")) {
      return profile.foto;
    }

    return `http://127.0.0.1:8000${profile.foto}`;
  }

  const photoUrl = getPhotoUrl();

  return (
    <header className="h-20 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-4 md:px-8">

      {/* Lado esquerdo */}

      <div className="flex items-center gap-4">

        {/* Botão Menu - apenas mobile */}

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-zinc-800 transition"
        >
          <Menu size={24} />
        </button>

        <div>

          <h2 className="text-2xl font-bold">
            Dashboard
          </h2>

          <p className="text-zinc-400 text-sm">
            Bem-vindo ao JiuConnect
          </p>

        </div>

      </div>

      {/* Lado direito */}

      <div className="flex items-center gap-4">

        <button
          className="p-2 rounded-lg hover:bg-zinc-800 transition"
        >
          <Bell size={20} />
        </button>

        {/* Avatar */}

        {photoUrl ? (

          <img
            src={photoUrl}
            alt="Foto do professor"
            className="
              w-11
              h-11
              rounded-full
              object-cover
              border
              border-violet-500/30
            "
          />

        ) : (

          <div
            className="
              w-11
              h-11
              rounded-full
              bg-gradient-to-br
              from-violet-500
              to-purple-700
              flex
              items-center
              justify-center
              font-bold
              text-white
            "
          >
            {initial}
          </div>

        )}

      </div>

    </header>
  );
}