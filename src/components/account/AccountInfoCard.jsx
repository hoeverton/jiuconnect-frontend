import Card from "../ui/Card";
import { useAuth } from "../../context/AuthContext";

export default function AccountInfoCard() {
  const { user } = useAuth();

  return (
    <Card className="p-6">

      <div className="flex items-center gap-5 mb-8">

        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-2xl font-bold text-white">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <div>

          <h2 className="text-2xl font-semibold text-white">
            {user?.username}
          </h2>

          <p className="text-zinc-400 capitalize">
            {user?.tipo_usuario}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>

          <p className="text-sm text-zinc-500 mb-1">
            Username
          </p>

          <p className="text-white">
            {user?.username}
          </p>

        </div>

        <div>

          <p className="text-sm text-zinc-500 mb-1">
            E-mail
          </p>

          <p className="text-white">
            {user?.email}
          </p>

        </div>

        <div>

          <p className="text-sm text-zinc-500 mb-1">
            Tipo de usuário
          </p>

          <p className="text-white capitalize">
            {user?.tipo_usuario}
          </p>

        </div>

        <div>

          <p className="text-sm text-zinc-500 mb-1">
            ID
          </p>

          <p className="text-white">
            #{user?.id}
          </p>

        </div>

      </div>

    </Card>
  );
}