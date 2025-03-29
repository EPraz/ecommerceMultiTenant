import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../../../constants";
import { getTenantSlugById } from "../../tenants/services";

interface Props {
  roles: Role[];
  tenantId: string | null;
  onClose: () => void;
}

const LoginRedirectModal = ({ roles, tenantId, onClose }: Props) => {
  const navigate = useNavigate();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    if (roles.includes(Role.VENDOR) && tenantId) {
      getTenantSlugById(tenantId).then(setSlug);
    }
  }, [roles, tenantId]);

  const goTo = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "320px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>¿A dónde quieres ir?</h2>

        {roles.includes(Role.ADMIN) && (
          <button
            onClick={() => goTo("/admin")}
            style={{
              display: "block",
              margin: "1rem auto",
              padding: "0.5rem 1rem",
            }}
          >
            Ir al Panel de Admin
          </button>
        )}

        {roles.includes(Role.VENDOR) && slug && (
          <button
            onClick={() => goTo(`/${slug}/admin`)}
            style={{
              display: "block",
              margin: "1rem auto",
              padding: "0.5rem 1rem",
            }}
          >
            Ir a tu Tienda
          </button>
        )}

        <button
          onClick={() => {
            if (location.pathname === "/login") {
              goTo("/dashboard");
            }
            return;
          }}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "transparent",
            border: "1px solid #ccc",
          }}
        >
          Seguir donde estoy
        </button>
      </div>
    </div>
  );
};
export default LoginRedirectModal;
