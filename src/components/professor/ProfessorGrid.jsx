import ProfessorCard from "./ProfessorCard";
import ResultsHeader from "../search/ResultsHeader";

export default function ProfessorGrid({
  professores = [],
  title = "Destaques da Semana",
  subtitle = "Professores",
  showSort = false,
  onSortChange,
}) {

  return (

    <section className="max-w-7xl mx-auto py-8 px-8">

      <div className="flex items-end justify-between mb-8">

        <div>

          <p className="text-purple-400 font-semibold">

            {subtitle}

          </p>

          <h2 className="text-5xl font-black mt-2">

            {title}

          </h2>

        </div>

        {showSort && (

          <div className="w-72">

            <ResultsHeader
              onSortChange={onSortChange}
            />

          </div>

        )}

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