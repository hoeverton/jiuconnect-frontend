import { useEffect, useState } from "react";
import api from "../../services/api";

import ProfessorCard from "./ProfessorCard";

export default function ProfessorGrid() {

  const [professores, setProfessores] = useState([]);

  useEffect(() => {

    async function carregar() {

      const response = await api.get("/professores/");

      setProfessores(response.data.results);

    }

    carregar();

  }, []);

  return (

    <section className="max-w-7xl mx-auto py-24 px-8">

      <div className="flex items-center justify-between mb-12">

        <div>

          <p className="text-purple-400 font-semibold">
            Professores
          </p>

          <h2 className="text-5xl font-black">
            Destaques da Semana
          </h2>

        </div>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {professores.map((professor) => (

          <ProfessorCard
            key={professor.id}
            professor={professor}
          />

        ))}

      </div>

    </section>

  );

}