import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { getMyProfessorProfile, updateProfessorProfile } from "../../services/professorService";

export default function ProfileCard() {
  const [profile, setProfile] = useState(null);

  const [faixa, setFaixa] = useState("");
  const [biografia, setBiografia] = useState("");
  const [precoHora, setPrecoHora] = useState("");
  const [cidade, setCidade] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getMyProfessorProfile();

        setProfile(data);

        setFaixa(data.faixa || "");
        setBiografia(data.biografia || "");
        setPrecoHora(data.preco_hora || "");
        setCidade(data.cidade || "");
        setEspecialidade(data.especialidade || "");

      } catch (error) {
        console.error("Erro ao carregar perfil:", error);

        setError(
          "Não foi possível carregar seu perfil profissional."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!faixa.trim()) {
      setError("Informe sua faixa.");
      return;
    }

    if (!cidade.trim()) {
      setError("Informe sua cidade.");
      return;
    }

    if (!especialidade.trim()) {
      setError("Informe sua especialidade.");
      return;
    }

    if (!precoHora) {
      setError("Informe o valor da aula.");
      return;
    }

    setSaving(true);

    try {
      const data = await updateProfessorProfile({
        faixa: faixa.trim(),
        biografia: biografia.trim(),
        preco_hora: precoHora,
        cidade: cidade.trim(),
        especialidade: especialidade.trim(),
      });

      setProfile(data);

      setFaixa(data.faixa || "");
      setBiografia(data.biografia || "");
      setPrecoHora(data.preco_hora || "");
      setCidade(data.cidade || "");
      setEspecialidade(data.especialidade || "");

      setMessage("Perfil profissional atualizado com sucesso.");

    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);

      setError(
        "Não foi possível atualizar seu perfil profissional."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-zinc-400">
          Carregando perfil...
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white">
          Perfil Profissional
        </h2>

        <p className="text-zinc-500 text-sm mt-1">
          Essas informações serão exibidas no seu perfil público.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Faixa */}

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Faixa
          </label>

          <select
            value={faixa}
            onChange={(event) => setFaixa(event.target.value)}
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
          >
            <option value="">
              Selecione sua faixa
            </option>

            <option value="Branca">
              Branca
            </option>

            <option value="Azul">
              Azul
            </option>

            <option value="Roxa">
              Roxa
            </option>

            <option value="Marrom">
              Marrom
            </option>

            <option value="Preta">
              Preta
            </option>

            <option value="Coral">
              Coral
            </option>

            <option value="Vermelha">
              Vermelha
            </option>

          </select>
        </div>

        {/* Especialidade */}

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Especialidade
          </label>

          <input
            type="text"
            value={especialidade}
            onChange={(event) =>
              setEspecialidade(event.target.value)
            }
            placeholder="Ex.: Jiu-Jitsu, No-Gi, Defesa Pessoal..."
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
          />
        </div>

        {/* Cidade */}

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Cidade
          </label>

          <input
            type="text"
            value={cidade}
            onChange={(event) =>
              setCidade(event.target.value)
            }
            placeholder="Ex.: Curitiba"
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
          />
        </div>

        {/* Valor */}

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Valor da aula
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
              R$
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              value={precoHora}
              onChange={(event) =>
                setPrecoHora(event.target.value)
              }
              placeholder="100.00"
              className="
                w-full
                h-12
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900/60
                pl-12
                pr-4
                text-white
                outline-none
                transition
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/20
              "
            />

          </div>
        </div>

        {/* Biografia */}

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Biografia
          </label>

          <textarea
            value={biografia}
            onChange={(event) =>
              setBiografia(event.target.value)
            }
            rows={5}
            placeholder="Conte um pouco sobre sua experiência como professor..."
            className="
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/60
              px-4
              py-3
              text-white
              outline-none
              resize-none
              transition
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
            "
          />

          <p className="text-xs text-zinc-600 mt-2">
            Uma boa biografia ajuda os alunos a conhecerem melhor seu trabalho.
          </p>
        </div>

        {/* Mensagem de sucesso */}

        {message && (
          <div className="
            rounded-xl
            border
            border-green-500/20
            bg-green-500/10
            px-4
            py-3
            text-sm
            text-green-400
          ">
            {message}
          </div>
        )}

        {/* Mensagem de erro */}

        {error && (
          <div className="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-400
          ">
            {error}
          </div>
        )}

        {/* Botão */}

        <div className="flex justify-end pt-2">

          <Button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Salvando..."
              : "Salvar alterações"}
          </Button>

        </div>

      </form>

    </Card>
  );
}