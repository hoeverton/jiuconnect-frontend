import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useProfessorSearch() {

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    busca: "",
    cidade: "",
    faixa: "",
    especialidade: "",
  });

  function handleChange(field, value) {

    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));

  }

  function handleSearch() {

    const params = new URLSearchParams();

    if (filters.busca)
      params.set("busca", filters.busca);

    if (filters.cidade)
      params.set("cidade", filters.cidade);

    if (filters.faixa)
      params.set("faixa", filters.faixa);

    if (filters.especialidade)
      params.set("especialidade", filters.especialidade);

    navigate(`/professores?${params.toString()}`);

  }

  return {

    filters,
    handleChange,
    handleSearch,

  };

}