import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterTenant } from "../../../features/auth/hooks";

const RegisterPage = () => {
  const { registerTenant, loading, error } = useRegisterTenant();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantSlug, setTenantSlug] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await registerTenant({
      email,
      password,
      tenantName,
      tenantSlug,
    });
    if (result?.accessToken) {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Crear tu Tienda
        </h2>

        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "0.5rem 0.75rem",
              borderRadius: "4px",
              marginBottom: "1rem",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            padding: "0.5rem",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            padding: "0.5rem",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        />

        <input
          type="text"
          placeholder="Nombre de tu tienda"
          value={tenantName}
          required
          onChange={(e) => setTenantName(e.target.value)}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            padding: "0.5rem",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        />

        <input
          type="text"
          placeholder="Slug (ej: mi-tienda)"
          value={tenantSlug}
          required
          onChange={(e) => setTenantSlug(e.target.value)}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            padding: "0.5rem",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.5rem",
            border: "none",
            borderRadius: "4px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Registrando..." : "Crear Tienda"}
        </button>
      </form>
    </div>
  );
};
export default RegisterPage;
