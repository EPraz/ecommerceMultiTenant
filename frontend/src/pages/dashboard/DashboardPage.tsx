import Button from "@mui/material/Button";

const DashboardPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Ruta protegida visible solo si estás logueado.</p>
      <Button variant="contained">Boton de MUI</Button>
    </div>
  );
};

export default DashboardPage;
