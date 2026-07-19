import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

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

      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xl">

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

        {/* Menu */}

        <nav className="hidden lg:flex gap-10 text-gray-300">

          <Link
            to="/"
            className="hover:text-purple-400 transition"
          >
            Professores
          </Link>

          <a
            href="#"
            className="hover:text-purple-400 transition"
          >
            Eventos
          </a>

          <a
            href="#"
            className="hover:text-purple-400 transition"
          >
            Blog
          </a>

          <a
            href="#"
            className="hover:text-purple-400 transition"
          >
            Como Funciona
          </a>

        </nav>

        {/* Botões */}

        <div className="hidden lg:flex gap-4">

          <Button variant="ghost">
              Entrar
          </Button>

          <Button variant="primary">
    Começar Agora
</Button>

        </div>

      </div>

    </header>

  );

}