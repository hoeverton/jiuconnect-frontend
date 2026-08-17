import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";

import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    function handleScroll() {
      setScrolled(
        window.scrollY > 20
      );
    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const logado = !!user;

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
          scrolled
            ? "bg-[#050816]/80 backdrop-blur-xl shadow-xl"
            : "bg-transparent"
        }
      `}
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-8
          h-24
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
          className="flex items-center gap-3"
        >

          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-purple-600
              flex
              items-center
              justify-center
              text-white
              text-xl
            "
          >
            🥋
          </div>

          <div>

            <h1 className="font-bold text-white text-2xl">
              JiuConnect
            </h1>

            <p className="text-xs text-gray-400">
              Connect • Train • Evolve
            </p>

          </div>

        </Link>

        {/* =====================================================
            MENU
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
            to="/"
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
            USUÁRIO / LOGIN
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

              <Link to="/register">

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
                    {user?.username ||
                      "Usuário"}
                  </p>

                  <p className="text-gray-500 text-xs capitalize">
                    {user?.tipo_usuario ||
                      ""}
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

      </div>

    </header>
  );
}