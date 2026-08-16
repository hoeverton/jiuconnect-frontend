import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function PersonalDataCard() {
  const { user, updateUser } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!username.trim() || !email.trim()) {
      setError("Username e e-mail são obrigatórios.");
      return;
    }

    setSaving(true);

    const result = await updateUser({
      username: username.trim(),
      email: email.trim(),
    });

    setSaving(false);

    if (result.success) {
      setMessage("Dados atualizados com sucesso.");
    } else {
      setError("Não foi possível atualizar seus dados.");
    }
  }

  return (
    <Card className="p-6">

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white">
          Dados Pessoais
        </h2>

        <p className="text-zinc-500 text-sm mt-1">
          Atualize suas informações pessoais.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Username */}

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="
              w-full
              h-12
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/60
              px-4
              text-white
              outline-none
              transition
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
            "
            placeholder="Seu username"
          />
        </div>

        {/* E-mail */}

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            E-mail
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="
              w-full
              h-12
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/60
              px-4
              text-white
              outline-none
              transition
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
            "
            placeholder="seu@email.com"
          />
        </div>

        {/* Mensagem de sucesso */}

        {message && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {message}
          </div>
        )}

        {/* Mensagem de erro */}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Botão */}

        <div className="flex justify-end">

          <Button
            type="submit"
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </Button>

        </div>

      </form>

    </Card>
  );
}