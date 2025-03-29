import { useState } from "react";
import { api } from "../../../services";

interface RegisterTenantDto {
  email: string;
  password: string;
  tenantName: string;
  tenantSlug: string;
}

export const useRegisterTenant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerTenant = async (data: RegisterTenantDto) => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/auth/register-tenant", data);
      return res.data; // devuelve tokens (access + refresh)
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { registerTenant, loading, error };
};
