import { createContext, useContext, useEffect, useState } from "react";
import { Role } from "../constants";
import { setAccessToken } from "./tokenUtils";
import { api } from "../services";

interface UserPayload {
  userId: string;
  roles: Role[];
  tenantId: string | null;
}

interface AuthContextType {
  accessToken: string | null;
  user: UserPayload | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.accessToken;
      setToken(token);
      setAccessToken(token);
      await refresh();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAccessToken(null);
    // podrías limpiar cookies si decides implementar /logout en backend
  };

  const refresh = async () => {
    try {
      const res = await api.post("/auth/refresh", {});
      const token = res.data.accessToken;
      const user = res.data.user;

      setToken(token);
      setUser(user);
      setAccessToken(token);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const hasRole = (role: Role) => {
    return user?.roles.includes(role) || false;
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, login, logout, loading, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
