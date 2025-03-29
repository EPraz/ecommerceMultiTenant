import { useState } from "react";
import { Role } from "../../constants";
import { useLogin } from "../../features/auth/hooks";
import { LoginRedirectModal } from "../../features/auth/components";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { loginUser, loading, error, user } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRedirect, setShowRedirect] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser(email, password);
    if (user?.roles.length === 1) {
      const only = user.roles[0];

      if (only === Role.ADMIN) window.location.href = "/admin";
      else if (only === Role.CUSTOMER) {
        if (location.pathname === "/login") {
          navigate("/dashboard");
        }
        return;
      } else if (only === Role.VENDOR && user.tenantId) {
        setShowRedirect(true);
      }
    } else if (user?.roles && user?.roles?.length > 1) {
      setShowRedirect(true);
    }
  };

  return (
    <>
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
            Login
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
            placeholder="Email"
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
            placeholder="Password"
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
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>

      {showRedirect && user && (
        <LoginRedirectModal
          roles={user.roles}
          tenantId={user.tenantId}
          onClose={() => setShowRedirect(false)}
        />
      )}
    </>
  );
}
