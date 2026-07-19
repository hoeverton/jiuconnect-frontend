export default function Features() {

  const items = [
    {
      icon: "🏆",
      title: "Professores Verificados",
      description:
        "Encontre professores experientes e avaliados pela comunidade."
    },
    {
      icon: "⭐",
      title: "Avaliações Reais",
      description:
        "Veja opiniões de alunos antes de agendar sua aula."
    },
    {
      icon: "📅",
      title: "Agenda Online",
      description:
        "Escolha o melhor horário e agende em poucos cliques."
    },
    {
      icon: "📍",
      title: "Perto de Você",
      description:
        "Encontre professores na sua cidade ou região."
    },
    {
      icon: "🔒",
      title: "Segurança",
      description:
        "Sua experiência é protegida com pagamentos e perfis confiáveis."
    },
    {
      icon: "🎥",
      title: "Conteúdo Exclusivo",
      description:
        "Vídeos, eventos e materiais para acelerar sua evolução."
    }
  ];

  return (
    <section className="py-28 bg-[#0A0F1F]">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <span className="text-purple-400 font-semibold uppercase tracking-widest">
            Diferenciais
          </span>

          <h2 className="text-5xl font-black text-white mt-4">
            Tudo o que você precisa para evoluir no tatame.
          </h2>

          <p className="text-gray-400 text-xl mt-6 max-w-3xl mx-auto">
            Muito mais que uma plataforma de professores.
            Criamos um ecossistema completo para quem deseja evoluir no Jiu-Jitsu.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {items.map((item, index) => (

            <div
              key={index}
              className="
                bg-[#111827]
                rounded-3xl
                border
                border-gray-800
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-purple-500
                hover:shadow-xl
                hover:shadow-purple-900/30
              "
            >

              <div className="text-5xl mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}