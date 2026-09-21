import { useState } from "react";
import { Camera, ChevronDown, DollarSign, MapPin, Save, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const faixas = [
  "Branca",
  "Azul",
  "Roxa",
  "Marrom",
  "Preta",
  "Coral",
  "Vermelha",
];

export default function CadastroProfessor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    faixa: "",
    biografia: "",
    preco_hora: "",
    cidade: "",
    especialidade: "",
    foto: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Selecione um arquivo de imagem válido.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5 MB.");
      return;
    }

    setError("");

    setForm((prev) => ({
      ...prev,
      foto: file,
    }));

    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.faixa ||
      !form.biografia.trim() ||
      !form.preco_hora ||
      !form.cidade.trim() ||
      !form.especialidade.trim()
    ) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (Number(form.preco_hora) <= 0) {
      setError("Informe um valor de aula válido.");
      return;
    }

    if (form.biografia.trim().length < 20) {
      setError(
        "Sua biografia deve ter pelo menos 20 caracteres."
      );
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("faixa", form.faixa);
      data.append("biografia", form.biografia.trim());
      data.append("preco_hora", form.preco_hora);
      data.append("cidade", form.cidade.trim());
      data.append("especialidade", form.especialidade.trim());

      if (form.foto) {
        data.append("foto", form.foto);
      }

      await api.post("professores/create/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(
        "Perfil profissional criado com sucesso!"
      );

      setTimeout(() => {
        navigate("/professores");
      }, 1200);
    } catch (err) {
      console.error(
        "Erro ao criar perfil:",
        err.response?.data
      );

      const status = err.response?.status;
      const responseData = err.response?.data;

      if (status === 401) {
        setError(
          "Sua sessão expirou. Faça login novamente."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      if (status === 403) {
        setError(
          responseData?.detail ||
            "Apenas usuários cadastrados como professor podem criar um perfil profissional."
        );

        return;
      }

      if (status === 400) {
        if (responseData?.detail) {
          setError(responseData.detail);
        } else if (responseData) {
          const firstError = Object.values(responseData)[0];

          setError(
            Array.isArray(firstError)
              ? firstError[0]
              : firstError || "Verifique os dados informados."
          );
        } else {
          setError(
            "Verifique os dados informados."
          );
        }

        return;
      }

      setError(
        "Não foi possível criar seu perfil. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090B] px-6 py-12">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-transparent" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
            JiuConnect
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Complete seu perfil profissional
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            Conte um pouco sobre sua experiência e ajude alunos a
            encontrarem o professor ideal para seus objetivos.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-zinc-800 bg-[#111114] p-6 shadow-2xl sm:p-10">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
              {/* Foto */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-violet-500/20 bg-zinc-900 shadow-lg shadow-violet-900/10">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Prévia do perfil"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound
                        size={56}
                        className="text-zinc-700"
                      />
                    )}
                  </div>

                  <label
                    htmlFor="foto"
                    className="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-violet-400/20 bg-violet-600 text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500"
                  >
                    <Camera size={19} />

                    <input
                      id="foto"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
                  Foto de perfil
                  <br />
                  JPG, PNG ou WEBP · até 5 MB
                </p>
              </div>

              {/* Campos */}
              <div className="space-y-6">
                {/* Faixa */}
                <div>
                  <label
                    htmlFor="faixa"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Faixa
                  </label>

                  <div className="relative">
                    <select
                      id="faixa"
                      name="faixa"
                      value={form.faixa}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 pr-11 text-white outline-none transition focus:border-violet-500"
                    >
                      <option value="">
                        Selecione sua faixa
                      </option>

                      {faixas.map((faixa) => (
                        <option key={faixa} value={faixa}>
                          {faixa}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-3.5 text-zinc-500"
                    />
                  </div>
                </div>

                {/* Especialidade */}
                <div>
                  <label
                    htmlFor="especialidade"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Especialidade
                  </label>

                  <input
                    id="especialidade"
                    type="text"
                    name="especialidade"
                    value={form.especialidade}
                    onChange={handleChange}
                    placeholder="Ex.: Jiu-Jitsu, No-Gi, Competição..."
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                  />
                </div>

                {/* Cidade */}
                <div>
                  <label
                    htmlFor="cidade"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Cidade
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-3.5 text-zinc-500"
                    />

                    <input
                      id="cidade"
                      type="text"
                      name="cidade"
                      value={form.cidade}
                      onChange={handleChange}
                      placeholder="Ex.: Curitiba"
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                    />
                  </div>
                </div>

                {/* Preço */}
                <div>
                  <label
                    htmlFor="preco_hora"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Valor da aula por hora
                  </label>

                  <div className="relative">
                    <DollarSign
                      size={18}
                      className="absolute left-4 top-3.5 text-zinc-500"
                    />

                    <input
                      id="preco_hora"
                      type="number"
                      name="preco_hora"
                      value={form.preco_hora}
                      onChange={handleChange}
                      placeholder="Ex.: 100"
                      min="1"
                      step="0.01"
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                    />
                  </div>
                </div>

                {/* Biografia */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="biografia"
                      className="block text-sm font-medium text-zinc-300"
                    >
                      Sobre você
                    </label>

                    <span className="text-xs text-zinc-600">
                      {form.biografia.length}/1000
                    </span>
                  </div>

                  <textarea
                    id="biografia"
                    name="biografia"
                    value={form.biografia}
                    onChange={(e) => {
                      if (e.target.value.length <= 1000) {
                        handleChange(e);
                      }
                    }}
                    rows={6}
                    placeholder="Conte sobre sua experiência, graduação, competições, metodologia de ensino e o que torna suas aulas especiais..."
                    className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                  />
                </div>
              </div>
            </div>

            {/* Mensagens */}
            {error && (
              <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
                {success}
              </div>
            )}

            {/* Ações */}
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-zinc-800 pt-7 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />

                {loading
                  ? "Salvando perfil..."
                  : "Salvar perfil"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}