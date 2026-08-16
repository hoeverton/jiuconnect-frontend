import { useAuth } from "../../../context/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();

  const hora = new Date().getHours();

  let saudacao = "Olá";

  if (hora >= 5 && hora < 12) {
    saudacao = "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }

  return (
    <div className="flex flex-col gap-2">

      <h1 className="text-3xl md:text-4xl font-bold text-white">
        {saudacao}, {user?.username || "Professor"} 👋
      </h1>

      <p className="text-zinc-400">
        Bem-vindo novamente ao JiuConnect.
      </p>

    </div>
  );
}