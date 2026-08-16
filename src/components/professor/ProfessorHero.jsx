import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import Button from "../ui/Button";

export default function ProfessorHero() {

  const { id } = useParams();

  const [professor, setProfessor] = useState(null);

  useEffect(() => {

    async function carregarProfessor() {

      try {

        const response = await api.get(`professores/${id}/`);

        setProfessor(response.data);

      } catch (err) {

        console.log(err);

      }

    }

    carregarProfessor();

  }, [id]);

  if (!professor) {

    return (

      <section className="max-w-7xl mx-auto px-8 py-24">

        <p className="text-gray-400">
          Carregando professor...
        </p>

      </section>

    );

  }

  const foto =
    professor.foto ||
    "https://ui-avatars.com/api/?name=Professor&background=7B2EFF&color=fff&size=600";

  return (

    <section className="max-w-7xl mx-auto px-8 py-20">

      <div className="grid lg:grid-cols-2 gap-14 items-center">

        {/* FOTO */}

        <div>

          <img
            src={foto}
            alt={professor.nome}
            className="
              w-full
              rounded-3xl
              shadow-2xl
              object-cover
              h-[620px]
            "
          />

        </div>

        {/* INFORMAÇÕES */}

        <div>

          <span
            className="
              inline-flex
              bg-purple-600
              px-4
              py-2
              rounded-full
              font-semibold
            "
          >
            🥋 {professor.faixa}
          </span>

          <h1
            className="
              mt-4
              text-5xl
              font-black
              leading-tight
            "
          >
            {professor.nome}
          </h1>

          <div className="mt-6 flex flex-wrap gap-6 text-lg text-gray-300">

            <span>
              ⭐ {professor.media_avaliacoes}
            </span>

            <span>
              📍 {professor.cidade}
            </span>

            <span>
              🎯 {professor.especialidade}
            </span>

          </div>

          <div className="mt-10">

            <p className="text-gray-500 uppercase tracking-wider">

              Valor da Aula

            </p>

            <p
              className="
                text-5xl
                font-black
                text-green-400
              "
            >

              R$ {professor.preco_hora}

              <span
                className="
                  text-2xl
                  text-gray-400
                  font-medium
                "
              >
                /hora
              </span>

            </p>

          </div>

          <div className="mt-8">

            <Button
              variant="primary"
              size="lg"
            >

              Agendar Aula

            </Button>

          </div>

        </div>

      </div>

    </section>

  );

}