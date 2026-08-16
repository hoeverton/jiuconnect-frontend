import Card from "../ui/Card";

export default function DashboardCard({
  titulo,
  valor,
  descricao,
  icone,
}) {
  return (
    <Card className="p-6 h-full">

      <div className="flex items-center justify-between">

        <p className="text-zinc-400 text-sm font-medium">
          {titulo}
        </p>

        {icone && (
          <div className="text-violet-400">
            {icone}
          </div>
        )}

      </div>

      <h2 className="text-4xl font-bold text-white mt-5">
        {valor}
      </h2>

      {descricao && (
        <p className="text-zinc-500 text-sm mt-2">
          {descricao}
        </p>
      )}

    </Card>
  );
}