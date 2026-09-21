import { useEffect, useState } from "react";
import { Users, MapPin, Star, Trophy } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api";

export default function Stats() {
  const [stats, setStats] = useState({
    professores: 0,
    cidades: 0,
    avaliacao: "5.0",
    aulas: "0+",
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch(`${API_URL}/professores/`);

        if (!response.ok) return;

        const data = await response.json();

        const professors = Array.isArray(data)
          ? data
          : data.results || data.professores || [];

        if (!professors.length) return;

        // Professores
        const professores = professors.length;

        // Cidades únicas
        const cidadesUnicas = new Set(
          professors
            .map(
              (professor) =>
                professor.cidade ||
                professor.city ||
                professor.localizacao?.cidade ||
                professor.endereco?.cidade
            )
            .filter(Boolean)
        );

        // Média das avaliações
        const ratings = professors
          .map(
            (professor) =>
              Number(
                professor.media_avaliacoes ||
                  professor.media_avaliacao ||
                  professor.rating ||
                  professor.nota_media ||
                  0
              )
          )
          .filter((rating) => rating > 0);

        const media =
          ratings.length > 0
            ? (
                ratings.reduce((sum, rating) => sum + rating, 0) /
                ratings.length
              ).toFixed(1)
            : "5.0";

        // Estimativa visual de aulas/conexões
        const aulas = Math.max(professores * 10, 10);

        setStats({
          professores: `${professores}+`,
          cidades: cidadesUnicas.size ? `${cidadesUnicas.size}+` : "1+",
          avaliacao: media,
          aulas: `${aulas}+`,
        });
      } catch (error) {
        console.log("Estatísticas não disponíveis.");
      }
    }

    loadStats();
  }, []);

  const items = [
    {
      icon: Users,
      value: stats.professores,
      label: "Professores cadastrados",
    },
    {
      icon: MapPin,
      value: stats.cidades,
      label: "Cidades alcançadas",
    },
    {
      icon: Star,
      value: stats.avaliacao,
      label: "Avaliação média",
    },
    {
      icon: Trophy,
      value: stats.aulas,
      label: "Conexões realizadas",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#08080d] py-20 sm:py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`group relative px-6 py-10 text-center transition-all duration-300 hover:bg-white/[0.025] sm:px-8 ${
                  index < 2 ? "border-b border-white/[0.06]" : ""
                } ${
                  index % 2 === 0 ? "border-r border-white/[0.06]" : ""
                } lg:border-b-0 lg:border-r lg:last:border-r-0`}
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400 transition-all duration-300 group-hover:border-purple-400/30 group-hover:bg-purple-500/15 group-hover:text-purple-300">
                  <Icon size={22} />
                </div>

                <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {item.value}
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

