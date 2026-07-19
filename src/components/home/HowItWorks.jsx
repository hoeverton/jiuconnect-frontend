export default function HowItWorks() {

  const steps = [

    {
      numero: "01",
      titulo: "Encontre",
      texto: "Pesquise professores por cidade, faixa ou especialidade."
    },

    {
      numero: "02",
      titulo: "Agende",
      texto: "Escolha um horário disponível e faça sua reserva."
    },

    {
      numero: "03",
      titulo: "Treine",
      texto: "Compareça ao treino e evolua com segurança."
    }

  ];

  return (

    <section className="bg-[#070B1D] py-28">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center text-white">

          Como funciona

        </h2>

        <p className="text-center text-gray-400 mt-5 mb-20 text-lg">

          Em poucos passos você encontra o professor ideal.

        </p>

        <div className="grid md:grid-cols-3 gap-10">

          {steps.map((step) => (

            <div
              key={step.numero}
              className="
                bg-[#111827]
                rounded-3xl
                p-10
                border border-purple-900/20
                hover:border-purple-500
                hover:-translate-y-3
                transition
              "
            >

              <div className="text-6xl font-black text-purple-600 mb-6">

                {step.numero}

              </div>

              <h3 className="text-3xl text-white font-bold mb-4">

                {step.titulo}

              </h3>

              <p className="text-gray-400 leading-8">

                {step.texto}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}