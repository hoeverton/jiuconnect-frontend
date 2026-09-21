import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import {
  getCurrentUser,
  updateUser as updateUserService,
  updateUserPhoto,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================================================
  // VERIFICAR PERFIL DO PROFESSOR
  // =========================================================

  async function verificarPerfilProfessor(userData) {
    if (userData?.tipo_usuario !== "professor") {
      return true;
    }

    try {
      await api.get("professores/me/");

      return true;

    } catch (error) {

      if (error.response?.status === 404) {
        return false;
      }

      // Se houver outro erro, não bloqueamos o login.
      return true;
    }
  }

  // =========================================================
  // CARREGAR USUÁRIO
  // =========================================================

  useEffect(() => {
    async function loadUser() {
      const token =
        localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData =
          await getCurrentUser();

        setUser(userData);

      } catch (error) {

        localStorage.removeItem(
          "access_token"
        );

        localStorage.removeItem(
          "refresh_token"
        );

        setUser(null);

      } finally {
        setLoading(false);
      }
    }

    loadUser();

  }, []);

  // =========================================================
  // LOGIN
  // =========================================================

  async function login(
    username,
    password
  ) {
    try {

      const response =
        await api.post(
          "/token/",
          {
            username,
            password,
          }
        );

      const {
        access,
        refresh,
      } = response.data;

      localStorage.setItem(
        "access_token",
        access
      );

      localStorage.setItem(
        "refresh_token",
        refresh
      );

      const userData =
        await getCurrentUser();

      setUser(userData);

      // =====================================================
      // VERIFICAR PERFIL DO PROFESSOR
      // =====================================================

      let needsProfessorProfile = false;

      if (
        userData?.tipo_usuario ===
        "professor"
      ) {
        const perfilExiste =
          await verificarPerfilProfessor(
            userData
          );

        needsProfessorProfile =
          !perfilExiste;
      }

      return {
        success: true,
        user: userData,
        needsProfessorProfile,
      };

    } catch (error) {

      return {
        success: false,
        error,
      };

    }
  }

  // =========================================================
  // ATUALIZAR DADOS
  // =========================================================

  async function updateUser(data) {
    try {

      const userData =
        await updateUserService(
          data
        );

      setUser(userData);

      return {
        success: true,
        user: userData,
      };

    } catch (error) {

      return {
        success: false,
        error,
      };

    }
  }

  // =========================================================
  // ATUALIZAR FOTO
  // =========================================================

  async function updatePhoto(file) {
    try {

      const userData =
        await updateUserPhoto(
          file
        );

      setUser(userData);

      return {
        success: true,
        user: userData,
      };

    } catch (error) {

      return {
        success: false,
        error,
      };

    }
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  function logout() {

    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );

    setUser(null);
  }

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        updateUser,
        updatePhoto,
        logout,
        authenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =========================================================
// HOOK
// =========================================================

export function useAuth() {
  return useContext(
    AuthContext
  );
}