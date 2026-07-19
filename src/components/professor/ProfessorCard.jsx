import { Link } from "react-router-dom";

export default function ProfessorCard({ professor }) {
  const foto =
    professor.foto ||
    "https://ui-avatars.com/api/?name=Professor&background=7B2EFF&color=fff&size=600";

  return (
    <div
      className="
        bg-[#101828]
        rounded-3xl
        overflow-hidden
        border
        border-gray-800
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-purple-500
        hover:shadow-purple-900/40
      "
    >
      {/* FOTO */}
      <div className="relative overflow-hidden">
        <img
          src={foto}
          alt={professor.nome}
          className="
            w-full
            h-72
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-transparent to-transparent"></div>

        {/* Badge Faixa */}
        <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          🥋 {professor.faixa}
        </div>

        {/* Avaliação */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-yellow-400 text-sm font-bold">
          ⭐ {professor.media_avaliacoes ?? "Novo"}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {professor.nome}
        </h2>

        <p className="text-gray-400 mb-1">
          📍 {professor.cidade}
        </p>

        <p className="text-gray-400 mb-6">
          🎯 {professor.especialidade}
        </p>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#161F2F] rounded-xl p-3 text-center">
            <p className="text-xl">👥</p>

            <p className="text-white font-bold">
              {professor.total_alunos ?? 0}
            </p>

            <p className="text-xs text-gray-400">
              Alunos
            </p>
          </div>

          <div className="bg-[#161F2F] rounded-xl p-3 text-center">
            <p className="text-xl">📚</p>

            <p className="text-white font-bold">
              {professor.total_aulas_concluidas ?? 0}
            </p>

            <p className="text-xs text-gray-400">
              Aulas
            </p>
          </div>
        </div>

        {/* Preço */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500 text-sm">
              Valor da aula
            </p>

            <p className="text-3xl font-black text-green-400">
              R$ {professor.preco_hora}
            </p>
          </div>
        </div>

        {/* Botão */}
        <Link
          to={`/professor/${professor.id}`}
          className="
            block
            w-full
            text-center
            bg-gradient-to-r
            from-purple-600
            to-fuchsia-600
            hover:from-purple-500
            hover:to-fuchsia-500
            transition
            py-4
            rounded-xl
            font-bold
            text-white
          "
        >
          Ver Perfil →
        </Link>
      </div>
    </div>
  );
}