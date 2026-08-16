import hero from "../../assets/images/hero.png";
import SearchBar from "../ui/SearchBar";

import useProfessorSearch from "../../hooks/useProfessorSearch";

export default function Hero() {

  const {
    filters,
    handleChange,
    handleSearch,
  } = useProfessorSearch();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816]">

      <img
        src={hero}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex items-center px-8 pt-24">

        <div className="max-w-3xl">

          <h1 className="text-7xl font-black leading-tight">

            Encontre o

            <br />

            professor ideal

            <br />

            para

            <span className="text-purple-500">
              {" "}evoluir no tatame.
            </span>

          </h1>

          <p className="mt-8 text-xl text-gray-300">
            Conecte-se aos melhores professores de Jiu-Jitsu do Brasil.
          </p>

          <div className="mt-8 max-w-2xl">

            <SearchBar
              filters={filters}
              onChange={handleChange}
              onSearch={handleSearch}
            />

          </div>

        </div>

      </div>

    </section>
  );
}