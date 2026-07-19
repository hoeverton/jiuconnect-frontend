import hero from "../../assets/images/search-hero.png";

import SearchBar from "../ui/SearchBar";

export default function SearchPageHero() {
  return (
    <section className="relative h-[380px] overflow-hidden">

      {/* Background */}

      <img
        src={hero}
        alt="Buscar Professores"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent" />

      {/* Content */}

      <div className="relative z-10 h-full flex items-center">

        <div className="max-w-7xl mx-auto w-full px-6">

          <div className="max-w-3xl">

            <h1 className="text-5xl lg:text-6xl font-black leading-tight">

              Encontre seu

              <span className="text-purple-500">
                {" "}próximo professor
              </span>

            </h1>

            <p className="mt-5 text-lg text-gray-300 max-w-2xl">

              Pesquise entre centenas de professores de
              Brazilian Jiu-Jitsu em todo o Brasil.

            </p>

            <div className="mt-8 max-w-4xl">

              <SearchBar />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}