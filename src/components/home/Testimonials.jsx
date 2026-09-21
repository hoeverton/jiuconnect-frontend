import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api";

const fallbackTestimonials = [
  {
    name: "Carlos Almeida",
    role: "Praticante de Jiu-Jitsu",
    text: "Encontrei um professor que realmente combina com meus objetivos. O JiuConnect tornou a busca muito mais simples.",
    rating: 5,
  },
  {
    name: "Mariana Souza",
    role: "Praticante de Jiu-Jitsu",
    text: "A plataforma facilita muito encontrar profissionais e comparar as opções antes de começar a treinar.",
    rating: 5,
  },
  {
    name: "Rafael Martins",
    role: "Atleta",
    text: "Gostei da proposta. Foi muito mais fácil encontrar um professor especializado no estilo de treino que eu procurava.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const response = await fetch(`${API_URL}/avaliacoes/`);

        if (!response.ok) return;

        const data = await response.json();

        const results = Array.isArray(data)
          ? data
          : data.results || data.avaliacoes || [];

        if (!results.length) return;

        const formatted = results
          .slice(0, 3)
          .map((item) => ({
            name:
              item.nome ||
              item.usuario_nome ||
              item.paciente_nome ||
              item.usuario?.first_name ||
              "Aluno JiuConnect",
            role: item.profissao || item.role || "Praticante de Jiu-Jitsu",
            text:
              item.comentario ||
              item.comentario_texto ||
              item.texto ||
              item.avaliacao ||
              "",
            rating: Number(item.nota || item.rating || 5),
          }))
          .filter((item) => item.text);

        if (formatted.length) {
          setTestimonials(formatted);
        }
      } catch (error) {
        console.log("Avaliações não disponíveis. Usando conteúdo padrão.");
      }
    }

    loadTestimonials();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#08080d] py-24 sm:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2 text-sm font-medium text-purple-300">
            Comunidade JiuConnect
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Quem treina{" "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              recomenda
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
            Experiências de quem está encontrando novos caminhos para evoluir
            no Jiu-Jitsu.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.045]"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-purple-600/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex h-full flex-col">
                {/* Quote icon */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                    <Quote size={20} />
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={16}
                        className={
                          starIndex < testimonial.rating
                            ? "fill-purple-400 text-purple-400"
                            : "text-gray-700"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Text */}
                <p className="flex-1 text-[15px] leading-7 text-gray-300">
                  “{testimonial.text}”
                </p>

                {/* User */}
                <div className="mt-8 border-t border-white/[0.06] pt-5">
                  <p className="font-semibold text-white">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

