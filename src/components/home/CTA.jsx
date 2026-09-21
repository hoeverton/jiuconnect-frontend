import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#08080d] py-24 sm:py-28 lg:py-32">
      {/* Glow central */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
        {/* Badge */}
        <span className="mb-6 inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2 text-sm font-medium text-purple-300">
          Comece sua evolução
        </span>

        {/* Título */}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Pronto para evoluir no{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Jiu-Jitsu?
          </span>
        </h2>

        {/* Descrição */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
          Encontre professores qualificados, descubra novas oportunidades
          para treinar e dê o próximo passo na sua evolução.
        </p>

        {/* Botões */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <button
            type="button"
            onClick={() => navigate("/professores")}
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/20 sm:w-auto"
          >
            Encontrar um Professor
          </button>

          <button
            type="button"
            onClick={() => navigate("/cadastro")}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
          >
            Quero ser Professor
          </button>

        </div>
      </div>
    </section>
  );
}