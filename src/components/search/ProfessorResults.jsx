import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../../services/api";

import ProfessorGrid from "../professor/ProfessorGrid";
import ResultsHeader from "./ResultsHeader";

export default function ProfessorResults() {

  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {

    async function carregarProfessores() {

      setLoading(true);

      try {

        const response = await api.get("professores/", {
          params: {
            cidade: searchParams.get("cidade") || undefined,
            faixa: searchParams.get("faixa") || undefined,
            especialidade: searchParams.get("especialidade") || undefined,
            search: searchParams.get("busca") || undefined,
          },
        });

        setProfessores(response.data.results);

      } catch (err) {

        console.error(err);

        setErro("Erro ao carregar professores.");

      } finally {

        setLoading(false);

      }

    }

    carregarProfessores();

  }, [searchParams]);

  if (loading) {
    return (
      <p className="text-center text-gray-400 py-20">
        Carregando professores...
      </p>
    );
  }

  if (erro) {
    return (
      <p className="text-center text-red-500 py-20">
        {erro}
      </p>
    );
  }

  return (
    <>
      

      <ProfessorGrid
        professores={professores}
        title="Todos os Professores"
        subtitle="Resultados"
        showSort
      />
    </>
  );
}