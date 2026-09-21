import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Cadastro() {
  const navigate = useNavigate();

  const [tipoUsuario, setTipoUsuario] = useState("aluno");

  const [form, setForm] = useState({
    username: "",
    email: "",
    telefone: "",
    password: "",
    passwordConfirm: "",
    website: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function formatarTelefone(value) {
    let numeros = value.replace(/\D/g, "");

    // Remove 55 caso o usuário tente digitá-lo
    if (numeros.startsWith("55")) {
      numeros = numeros.substring(2);
    }

    // Limita a DDD + 9 dígitos
    numeros = numeros.substring(0, 11);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 7) {
      return `(${numeros.substring(0, 2)}) ${numeros.substring(2)}`;
    }

    return `(${numeros.substring(0, 2)}) ${numeros.substring(
      2,
      7
    )}-${numeros.substring(7)}`;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "telefone") {
      setForm((prev) => ({
        ...prev,
        telefone: formatarTelefone(value),
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Proteção honeypot
    if (form.website) {
      setError("Não foi possível realizar o cadastro.");
      return;
    }

    // Validação dos campos
    if (
      !form.username.trim() ||
      !form.email.trim() ||
      !form.telefone.trim() ||
      !form.password ||
      !form.passwordConfirm
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    // Validação do usuário
    if (form.username.trim().length < 3) {
      setError("O usuário deve ter pelo menos 3 caracteres.");
      return;
    }

    // Validação do telefone
    const telefoneNumeros = form.telefone.replace(/\D/g, "");

    if (telefoneNumeros.length !== 11) {
      setError("Digite um WhatsApp válido com DDD.");
      return;
    }

    if (!telefoneNumeros.startsWith("9", 2)) {
      setError("Digite um número de celular válido.");
      return;
    }

    // Validação das senhas
    if (form.password !== form.passwordConfirm) {
      setError("As senhas não coincidem.");
      return;
    }

    if (form.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (/^\d+$/.test(form.password)) {
      setError("A senha não pode conter apenas números.");
      return;
    }

    setLoading(true);

    try {
      await api.post("register/", {
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),

        // Backend adiciona o 55
        telefone: telefoneNumeros,

        password: form.password,
        tipo_usuario: tipoUsuario,
        website: form.website,
      });

      setSuccess(
        "Conta criada com sucesso! Redirecionando para o login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error("Erro no cadastro:", err.response?.data);

      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 429) {
        setError(
          "Muitas tentativas de cadastro. Aguarde um pouco e tente novamente."
        );
      } else if (data?.username) {
        setError(
          Array.isArray(data.username)
            ? data.username[0]
            : data.username
        );
      } else if (data?.email) {
        setError(
          Array.isArray(data.email)
            ? data.email[0]
            : data.email
        );
      } else if (data?.telefone) {
        setError(
          Array.isArray(data.telefone)
            ? data.telefone[0]
            : data.telefone
        );
      } else if (data?.password) {
        setError(
          Array.isArray(data.password)
            ? data.password[0]
            : data.password
        );
      } else if (data?.tipo_usuario) {
        setError(
          Array.isArray(data.tipo_usuario)
            ? data.tipo_usuario[0]
            : data.tipo_usuario
        );
      } else if (data?.website) {
        setError("Não foi possível realizar o cadastro.");
      } else if (data?.detail) {
        setError(data.detail);
      } else {
        setError(
          "Não foi possível criar a conta. Verifique os dados e tente novamente."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-6 py-12">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-transparent" />

      <div className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative w-full max-w-md">

        <div className="rounded-3xl border border-zinc-800 bg-[#111114] p-8 shadow-2xl sm:p-10">

          {/* Header */}
          <div className="mb-8 text-center">

            <Link
              to="/"
              className="text-4xl font-bold text-white"
            >
              Jiu<span className="text-violet-500">Connect</span>
            </Link>

            <p className="mt-3 text-zinc-400">
              Crie sua conta e faça parte da comunidade.
            </p>

          </div>

          {/* Tipo de usuário */}
          <div className="mb-7">

            <p className="mb-3 text-sm font-medium text-zinc-300">
              Quero me cadastrar como
            </p>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setTipoUsuario("aluno")}
                className={`rounded-xl border px-4 py-4 text-sm font-semibold transition ${
                  tipoUsuario === "aluno"
                    ? "border-violet-500 bg-violet-500/10 text-white shadow-lg shadow-violet-500/10"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                <User className="mx-auto mb-2 h-5 w-5" />
                Aluno
              </button>

              <button
                type="button"
                onClick={() => setTipoUsuario("professor")}
                className={`rounded-xl border px-4 py-4 text-sm font-semibold transition ${
                  tipoUsuario === "professor"
                    ? "border-violet-500 bg-violet-500/10 text-white shadow-lg shadow-violet-500/10"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                <ShieldCheck className="mx-auto mb-2 h-5 w-5" />
                Professor
              </button>

            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Usuário */}
            <div>

              <label className="mb-2 block text-sm text-zinc-300">
                Usuário
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-3.5 text-zinc-500"
                />

                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Digite seu usuário"
                  autoComplete="username"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />

              </div>
            </div>

            {/* E-mail */}
            <div>

              <label className="mb-2 block text-sm text-zinc-300">
                E-mail
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-3.5 text-zinc-500"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />

              </div>
            </div>

            {/* WhatsApp */}
            <div>

              <label className="mb-2 block text-sm text-zinc-300">
                WhatsApp
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-4 top-3.5 text-zinc-500"
                />

                <div className="pointer-events-none absolute left-11 top-3.5 text-zinc-400">
                  +55
                </div>

                <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="(41) 99999-8888"
                  autoComplete="tel"
                  maxLength={15}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-20 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />

              </div>

              <p className="mt-2 text-xs text-zinc-500">
                Usaremos este número para recursos do JiuConnect via WhatsApp.
              </p>

            </div>

            {/* Senha */}
            <div>

              <label className="mb-2 block text-sm text-zinc-300">
                Senha
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-3.5 text-zinc-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Crie uma senha"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-12 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-zinc-500 transition hover:text-white"
                  aria-label={
                    showPassword
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            {/* Confirmar senha */}
            <div>

              <label className="mb-2 block text-sm text-zinc-300">
                Confirmar senha
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-3.5 text-zinc-500"
                />

                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  name="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Digite a senha novamente"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-11 pr-12 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordConfirm(!showPasswordConfirm)
                  }
                  className="absolute right-4 top-3 text-zinc-500 transition hover:text-white"
                  aria-label={
                    showPasswordConfirm
                      ? "Ocultar confirmação de senha"
                      : "Mostrar confirmação de senha"
                  }
                >
                  {showPasswordConfirm ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            {/* Honeypot anti-bot */}
            <div
              className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="website">
                Website
              </label>

              <input
                id="website"
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Mensagem de sucesso */}
            {success && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
                {success}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 py-3.5 font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Criando conta..."
                : "Criar minha conta"}
            </button>

          </form>

          {/* Login */}
          <div className="mt-7 border-t border-zinc-800 pt-6 text-center">

            <p className="text-sm text-zinc-500">

              Já possui uma conta?{" "}

              <Link
                to="/login"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Entrar
              </Link>

            </p>

          </div>

        </div>
      </div>
    </div>
  );
}