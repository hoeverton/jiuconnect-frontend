import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await login(username, password);

    setLoading(false);

    if (result.success) {
      // Professor sem perfil profissional
      if (result.needsProfessorProfile) {
        navigate("/cadastro-professor");
        return;
      }

      // Aluno ou professor com perfil
      navigate("/dashboard");

    } else {
      setError("Usuário ou senha inválidos.");
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6">

      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-transparent"></div>

      <div className="relative w-full max-w-md">

        <div className="bg-[#111114] border border-zinc-800 rounded-3xl shadow-2xl p-8">

          <div className="text-center mb-10">

            <h1 className="text-4xl font-bold text-white">
              Jiu<span className="text-violet-500">Connect</span>
            </h1>

            <p className="text-zinc-400 mt-3">
              Faça login para continuar.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="text-zinc-300 text-sm mb-2 block">
                Usuário
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-3.5 text-zinc-500"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-violet-500"
                  placeholder="Digite seu usuário"
                />

              </div>

            </div>

            <div>

              <label className="text-zinc-300 text-sm mb-2 block">
                Senha
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-3.5 text-zinc-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-11 pr-12 py-3 text-white outline-none focus:border-violet-500"
                  placeholder="Digite sua senha"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-zinc-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {/* ESQUECEU A SENHA */}

              <div className="flex justify-end mt-2">

                <button
                  type="button"
                  onClick={() => navigate("/recuperar-senha")}
                  className="text-sm text-violet-400 hover:text-violet-300 transition"
                >
                  Esqueceu sua senha?
                </button>

              </div>

            </div>

            {error && (
              <div className="text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 transition rounded-xl py-3 font-semibold text-white"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

          </form>

          {/* CADASTRO */}

          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">

            <p className="text-zinc-500 text-sm">
              Ainda não possui uma conta?
            </p>

            <button
              type="button"
              onClick={() => navigate("/cadastro")}
              className="mt-2 text-violet-400 hover:text-violet-300 font-semibold transition"
            >
              Criar minha conta
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}