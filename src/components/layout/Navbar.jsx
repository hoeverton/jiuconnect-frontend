import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const logado = !!user;

  function fecharMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    fecharMenu();
  }

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-300

        ${
          scrolled || menuOpen
            ? "bg-[#050816]/95 backdrop-blur-xl shadow-xl"
            : "bg-transparent"
        }
      `}
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          h-20
          lg:h-24
          flex
          items-center
          justify-between
        "
      >

        {/* =====================================================
            LOGO
        ====================================================== */}

        <Link
          to="/"
          onClick={fecharMenu}
          className="flex items-center gap-3"
        >
          <div
            className="
              w-10
              h-10
              lg:w-11
              lg:h-11
              rounded-xl
              bg-purple-600
              flex
              items-center
              justify-center
              text-white
              text-lg
              lg:text-xl
            "
          >
            🥋
          </div>

          <div>
            <h1 className="font-bold text-white text-xl lg:text-2xl">
              JiuConnect
            </h1>

            <p className="hidden sm:block text-xs text-gray-400">
              Connect • Train • Evolve
            </p>
          </div>
        </Link>

        {/* =====================================================
            MENU DESKTOP
        ====================================================== */}

        <nav
          className="
            hidden
            lg:flex
            gap-10
            text-gray-300
          "
        >
          <Link
            to="/professores"
            className="
              hover:text-purple-400
              transition
            "
          >
            Professores
          </Link>

          <a
            href="#"
            className="
              hover:text-purple-400
              transition
            "
          >
            Eventos
          </a>

          <a
            href="#"
            className="
              hover:text-purple-400
              transition
            "
          >
            Blog
          </a>

          <a
            href="#"
            className="
              hover:text-purple-400
              transition
            "
          >
            Como Funciona
          </a>
        </nav>

        {/* =====================================================
            USUÁRIO DESKTOP
        ====================================================== */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-4
          "
        >
          {!logado ? (
            <>
              {/* ENTRAR */}

              <Link to="/login">
                <Button variant="ghost">
                  Entrar
                </Button>
              </Link>

              {/* COMEÇAR AGORA */}

              <Link to="/cadastro">
                <Button variant="primary">
                  Começar Agora
                </Button>
              </Link>
            </>
          ) : (
            <>
              {/* USUÁRIO */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    bg-gradient-to-br
                    from-purple-500
                    to-violet-700
                    flex
                    items-center
                    justify-center
                    text-white
                    font-bold
                  "
                >
                  {user?.username
                    ?.charAt(0)
                    .toUpperCase() || (
                    <User size={18} />
                  )}
                </div>

                <div className="text-left">
                  <p className="text-white text-sm font-semibold">
                    {user?.username || "Usuário"}
                  </p>

                  <p className="text-gray-500 text-xs capitalize">
                    {user?.tipo_usuario || ""}
                  </p>
                </div>
              </div>

              {/* DASHBOARD */}

              <Link to="/dashboard">
                <Button variant="primary">
                  Dashboard
                </Button>
              </Link>

              {/* SAIR */}

              <button
                type="button"
                onClick={logout}
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-400
                  hover:text-red-400
                  transition
                  text-sm
                "
              >
                <LogOut size={18} />

                Sair
              </button>
            </>
          )}
        </div>

        {/* =====================================================
            BOTÃO MOBILE
        ====================================================== */}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            lg:hidden
            flex
            items-center
            justify-center
            w-11
            h-11
            rounded-xl
            border
            border-white/10
            bg-white/5
            text-gray-300
            hover:text-white
            hover:border-purple-500/40
            transition
          "
          aria-label={
            menuOpen
              ? "Fechar menu"
              : "Abrir menu"
          }
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* =====================================================
          MENU MOBILE
      ====================================================== */}

      {menuOpen && (
        <div
          className="
            lg:hidden
            border-t
            border-white/10
            bg-[#080a14]/95
            backdrop-blur-xl
            shadow-2xl
          "
        >
          <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8">

            {/* LINKS */}

            <nav className="flex flex-col gap-2">

              <Link
                to="/professores"
                onClick={fecharMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-gray-300
                  hover:bg-white/5
                  hover:text-purple-400
                  transition
                "
              >
                Professores
              </Link>

              <a
                href="#"
                onClick={fecharMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-gray-300
                  hover:bg-white/5
                  hover:text-purple-400
                  transition
                "
              >
                Eventos
              </a>

              <a
                href="#"
                onClick={fecharMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-gray-300
                  hover:bg-white/5
                  hover:text-purple-400
                  transition
                "
              >
                Blog
              </a>

              <a
                href="#"
                onClick={fecharMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-gray-300
                  hover:bg-white/5
                  hover:text-purple-400
                  transition
                "
              >
                Como Funciona
              </a>
            </nav>

            {/* SEPARADOR */}

            <div className="my-5 h-px bg-white/10" />

            {/* USUÁRIO */}

            {!logado ? (
              <div className="flex flex-col gap-3">

                <Link
                  to="/login"
                  onClick={fecharMenu}
                  className="w-full"
                >
                  <Button
                    variant="ghost"
                    className="w-full"
                  >
                    Entrar
                  </Button>
                </Link>

                <Link
                  to="/cadastro"
                  onClick={fecharMenu}
                  className="w-full"
                >
                  <Button
                    variant="primary"
                    className="w-full"
                  >
                    Começar Agora
                  </Button>
                </Link>

              </div>
            ) : (
              <div className="flex flex-col gap-4">

                {/* USUÁRIO */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                >
                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-gradient-to-br
                      from-purple-500
                      to-violet-700
                      flex
                      items-center
                      justify-center
                      text-white
                      font-bold
                    "
                  >
                    {user?.username
                      ?.charAt(0)
                      .toUpperCase() || (
                      <User size={18} />
                    )}
                  </div>

                  <div>
                    <p className="text-white text-sm font-semibold">
                      {user?.username || "Usuário"}
                    </p>

                    <p className="text-gray-500 text-xs capitalize">
                      {user?.tipo_usuario || ""}
                    </p>
                  </div>
                </div>

                {/* DASHBOARD */}

                <Link
                  to="/dashboard"
                  onClick={fecharMenu}
                  className="w-full"
                >
                  <Button
                    variant="primary"
                    className="w-full"
                  >
                    Dashboard
                  </Button>
                </Link>

                {/* SAIR */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    px-4
                    py-3
                    text-sm
                    text-gray-400
                    hover:border-red-500/30
                    hover:bg-red-500/5
                    hover:text-red-400
                    transition
                  "
                >
                  <LogOut size={18} />

                  Sair
                </button>

              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
}