import {
  GiBrazil,
  GiKimono,
  GiTrophyCup,
  GiKidSlide,
  GiWeightLiftingUp,
  GiMuscleUp,
} from "react-icons/gi";

const categories = [
  {
    title: "Jiu-Jitsu",
    description: "Encontre professores de Jiu-Jitsu perto de você.",
    icon: GiKimono,
  },
  {
    title: "No-Gi",
    description: "Treine sem kimono e evolua seu jogo.",
    icon: GiMuscleUp,
  },
  {
    title: "Competição",
    description: "Professores focados em preparação competitiva.",
    icon: GiTrophyCup,
  },
  {
    title: "Kids",
    description: "Jiu-Jitsu para crianças com segurança e disciplina.",
    icon: GiKidSlide,
  },
  {
    title: "Defesa Pessoal",
    description: "Aprenda técnicas para situações reais.",
    icon: GiBrazil,
  },
  {
    title: "Condicionamento",
    description: "Melhore força, resistência e performance.",
    icon: GiWeightLiftingUp,
  },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-[#08080d] py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="mb-4 inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2 text-sm font-medium text-purple-300">
            Encontre seu estilo
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Encontre o{" "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              professor ideal
            </span>{" "}
            para você
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
            Explore diferentes modalidades e encontre profissionais preparados
            para ajudar você a evoluir dentro e fora do tatame.
          </p>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.045]"
              >

                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-purple-600/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400 transition-all duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-500/15 group-hover:text-purple-300">
                    <Icon className="text-3xl" />
                  </div>

                  <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-purple-300">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {category.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}