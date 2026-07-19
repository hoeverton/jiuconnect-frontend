import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function FeaturedTeachers() {

  const [professores, setProfessores] = useState([]);

  useEffect(() => {

    async function carregar() {

      try {

        const response = await api.get("/professores/");

        setProfessores(response.data.results.slice(0, 3));

      } catch (err) {

        console.log(err);

      }

    }

    carregar();

  }, []);

  return (

    <section className="py-28 bg-[#050816]">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-white text-center">

          Professores em Destaque

        </h2>

        <p className="text-gray-400 text-center mt-5 mb-16 text-lg">

          Conheça alguns dos melhores professores cadastrados.

        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {professores.map((professor) => (

            <div
              key={professor.id}
              className="
                bg-[#111827]
                rounded-3xl
                overflow-hidden
                shadow-xl
                hover:-translate-y-3
                hover:shadow-purple-900/40
                transition
                duration-300
              "
            >

              <img
                src={professor.foto}
                alt={professor.nome}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white">

                  {professor.nome}

                </h3>

                <p className="text-purple-400 mt-2">

                  🥋 {professor.faixa}

                </p>

                <p className="text-gray-400">

                  📍 {professor.cidade}

                </p>

                <p className="text-yellow-400 mt-3">

                  ⭐ {professor.media_avaliacoes}

                </p>

                <p className="text-green-400 text-2xl font-bold mt-4">

                  R$ {professor.preco_hora}

                </p>

                <Link

                  to={`/professor/${professor.id}`}

                  className="
                    mt-6
                    inline-block
                    bg-purple-600
                    hover:bg-purple-700
                    px-6
                    py-3
                    rounded-xl
                    text-white
                    font-semibold
                    transition
                  "

                >

                  Ver Perfil

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}