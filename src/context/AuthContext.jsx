import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import {
  getCurrentUser,
  updateUser as updateUserService,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(username, password) {
    try {
      const response = await api.post("/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      const userData = await getCurrentUser();

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

  async function updateUser(data) {
    try {
      const userData = await updateUserService(data);

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

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        updateUser,
        logout,
        authenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}