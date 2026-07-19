import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function ProfessorDetalhe() {
  const { id } = useParams();

  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    async function carregarProfessor() {
      try {
        const response = await api.get(`/professores/${id}/`);
        setProfessor(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    carregarProfessor();
  }, [id]);

  if (!professor) {
    return <p>Carregando...</p>;
  }
  console.log(professor.foto);
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-4xl font-bold mb-4">
        {professor.nome}
        
      </h1>
      <img
        src={professor.foto}
        alt={professor.nome}
        className="w-64 h-64 object-cover rounded-xl mb-6"
        />
      

      <p className="mb-2">
        🥋 Faixa: {professor.faixa}
      </p>

      <p className="mb-2">
        📍 Cidade: {professor.cidade}
      </p>

      <p className="mb-2">
        🎯 Especialidade: {professor.especialidade}
      </p>

      <p className="mb-4">
        💰 R$ {professor.preco_hora}/hora
      </p>

      <h2 className="text-xl font-bold mb-2">
        Biografia
      </h2>

      <p>{professor.biografia}</p>
    </div>
  );
}

export default ProfessorDetalhe;