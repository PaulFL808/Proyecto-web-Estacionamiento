import React from "react";
import { createRoot } from "react-dom/client";
import { Car, Database, FileCheck2, Server } from "lucide-react";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Hito 1 · Proyecto #13</span>
          <h1>Control de estacionamiento</h1>
          <p>
            Base tecnica lista para modelar plazas, estacionamientos activos y
            avanzar hacia autenticacion, CRUD completo y panel web.
          </p>
        </div>
        <div className="status-panel" aria-label="Resumen del hito 1">
          <div className="metric">
            <FileCheck2 aria-hidden="true" />
            <strong>5 / 23</strong>
            <span>requisitos desarrollados</span>
          </div>
          <div className="metric">
            <Database aria-hidden="true" />
            <strong>3</strong>
            <span>migraciones iniciales</span>
          </div>
          <div className="metric">
            <Server aria-hidden="true" />
            <strong>API</strong>
            <span>{apiUrl}</span>
          </div>
        </div>
      </section>

      <section className="domain-strip" aria-label="Dominio inicial">
        <article>
          <Car aria-hidden="true" />
          <h2>Plazas</h2>
          <p>Entidad principal del dominio con codigo, sector, estado y tarifa.</p>
        </article>
        <article>
          <Car aria-hidden="true" />
          <h2>Estacionamientos activos</h2>
          <p>Entidad secundaria vinculada a una plaza y a un vehiculo ingresado.</p>
        </article>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
