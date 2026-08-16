import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ProfessorCard({ professor }) {

  const foto =
    professor.foto ||
    "https://ui-avatars.com/api/?name=Professor&background=7B2EFF&color=fff&size=600";

  return (
    <Card>

      {/* FOTO */}

      <div className="relative overflow-hidden">

        <img
          src={foto}
          alt={professor.nome}
          className="
            w-full
            h-56
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-transparent to-transparent"></div>

        {/* Badge */}

        <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">

          🥋 {professor.faixa}

        </div>

        {/* Avaliação */}

        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-yellow-400 text-sm font-bold">

          ⭐ {professor.media_avaliacoes ?? "Novo"}

        </div>

      </div>

      {/* Conteúdo */}

      <div className="p-5">

        <h2 className="text-xl font-bold text-white">

          {professor.nome}

        </h2>

        <p className="text-gray-400 mt-2">

          📍 {professor.cidade}
          {" • "}
          🥋 {professor.faixa}

        </p>

        <p className="text-gray-500 text-sm mt-2">

          Especialista em {professor.especialidade}

        </p>

        {/* Preço */}

        <div className="mt-6 mb-5">

          <p className="text-gray-500 text-xs uppercase tracking-wider">

            Aula Particular

          </p>

          <p className="text-2xl font-black text-green-400">

            R$ {professor.preco_hora}
            <span className="text-base text-gray-400 font-medium">
              /hora
            </span>

          </p>

        </div>

        <Link to={`/professor/${professor.id}`}>

          <Button
            variant="primary"
            fullWidth
          >

            Ver Perfil →

          </Button>

        </Link>

      </div>

    </Card>
  );

}