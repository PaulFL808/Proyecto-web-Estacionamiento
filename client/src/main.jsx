import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Car,
  CheckCircle2,
  CircleParking,
  Edit3,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Trash2,
  UserPlus
} from "lucide-react";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
const sessionKey = "estacionamiento_session";

const emptyAuthForm = {
  name: "",
  email: "",
  password: ""
};

const emptySpotForm = {
  code: "",
  floor: 1,
  sector: "general",
  type: "standard",
  status: "available",
  hourlyRate: 1500,
  notes: ""
};

const spotStatuses = {
  available: "Disponible",
  occupied: "Ocupada",
  maintenance: "Mantencion",
  reserved: "Reservada"
};

const spotTypes = {
  standard: "Normal",
  disabled: "Accesible",
  electric: "Electrica",
  motorcycle: "Moto"
};

function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(sessionKey));
  } catch {
    return null;
  }
}

async function apiRequest(path, { method = "GET", body, token } = {}) {
  const response = await fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || "No se pudo completar la operacion.");
    error.status = response.status;
    error.details = payload.details;
    throw error;
  }

  return payload.data;
}

function App() {
  const [session, setSession] = useState(getStoredSession);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState(emptyAuthForm);
  const [spots, setSpots] = useState([]);
  const [spotForm, setSpotForm] = useState(emptySpotForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const total = spots.length;
    const available = spots.filter((spot) => spot.status === "available").length;
    const occupied = spots.filter((spot) => spot.status === "occupied").length;
    return { total, available, occupied };
  }, [spots]);

  async function loadSpots() {
    if (!session?.token) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/plazas", { token: session.token });
      setSpots(data);
    } catch (requestError) {
      if (requestError.status === 401) {
        handleLogout();
      }
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSpots();
  }, [session?.token]);

  function handleAuthInput(event) {
    const { name, value } = event.target;
    setAuthForm((current) => ({ ...current, [name]: value }));
  }

  function handleSpotInput(event) {
    const { name, value } = event.target;
    setSpotForm((current) => ({
      ...current,
      [name]: name === "floor" || name === "hourlyRate" ? Number(value) : value
    }));
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const payload =
      authMode === "register"
        ? authForm
        : {
            email: authForm.email,
            password: authForm.password
          };

    try {
      const data = await apiRequest(`/auth/${authMode === "register" ? "register" : "login"}`, {
        method: "POST",
        body: payload
      });

      localStorage.setItem(sessionKey, JSON.stringify(data));
      setSession(data);
      setAuthForm(emptyAuthForm);
      setMessage(authMode === "register" ? "Cuenta creada." : "Sesion iniciada.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSpotSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await apiRequest(editingId ? `/plazas/${editingId}` : "/plazas", {
        method: editingId ? "PUT" : "POST",
        token: session.token,
        body: {
          ...spotForm,
          code: spotForm.code.trim().toUpperCase(),
          sector: spotForm.sector.trim(),
          notes: spotForm.notes.trim() || null
        }
      });

      setSpots((current) =>
        editingId ? current.map((spot) => (spot.id === data.id ? data : spot)) : [...current, data]
      );
      setSpotForm(emptySpotForm);
      setEditingId(null);
      setMessage(editingId ? "Plaza actualizada." : "Plaza creada.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(spot) {
    setEditingId(spot.id);
    setSpotForm({
      code: spot.code,
      floor: spot.floor,
      sector: spot.sector,
      type: spot.type,
      status: spot.status,
      hourlyRate: Number(spot.hourlyRate),
      notes: spot.notes || ""
    });
    setMessage("");
    setError("");
  }

  async function handleDelete(spot) {
    if (!window.confirm(`Eliminar plaza ${spot.code}?`)) {
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await apiRequest(`/plazas/${spot.id}`, {
        method: "DELETE",
        token: session.token
      });
      setSpots((current) => current.filter((item) => item.id !== spot.id));
      setMessage("Plaza eliminada.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setSpotForm(emptySpotForm);
  }

  function handleLogout() {
    localStorage.removeItem(sessionKey);
    setSession(null);
    setSpots([]);
    setMessage("");
    setError("");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Hito 2</span>
          <h1>Control de estacionamiento</h1>
        </div>

        {session && (
          <div className="session-pill">
            <span>{session.user.name}</span>
            <button type="button" onClick={handleLogout} title="Cerrar sesion" aria-label="Cerrar sesion">
              <LogOut aria-hidden="true" />
            </button>
          </div>
        )}
      </header>

      {!session ? (
        <section className="auth-layout">
          <div className="auth-copy">
            <CircleParking aria-hidden="true" />
            <h2>Acceso operativo</h2>
            <p>Registro y autenticacion JWT para proteger las rutas de plazas.</p>
          </div>

          <form className="auth-form" onSubmit={handleAuthSubmit}>
            <div className="segmented" aria-label="Modo de acceso">
              <button
                type="button"
                className={authMode === "login" ? "active" : ""}
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={authMode === "register" ? "active" : ""}
                onClick={() => setAuthMode("register")}
              >
                Registro
              </button>
            </div>

            {authMode === "register" && (
              <label>
                Nombre
                <input name="name" value={authForm.name} onChange={handleAuthInput} autoComplete="name" />
              </label>
            )}

            <label>
              Email
              <input
                name="email"
                type="email"
                value={authForm.email}
                onChange={handleAuthInput}
                autoComplete="email"
              />
            </label>

            <label>
              Contrasena
              <input
                name="password"
                type="password"
                value={authForm.password}
                onChange={handleAuthInput}
                autoComplete={authMode === "register" ? "new-password" : "current-password"}
              />
            </label>

            <button className="primary-action" type="submit" disabled={loading}>
              {loading ? <Loader2 className="spin" aria-hidden="true" /> : <UserPlus aria-hidden="true" />}
              {authMode === "register" ? "Crear cuenta" : "Iniciar sesion"}
            </button>

            {error && <p className="feedback error">{error}</p>}
            {message && <p className="feedback ok">{message}</p>}
          </form>
        </section>
      ) : (
        <section className="workspace">
          <div className="stats-grid" aria-label="Resumen de plazas">
            <div className="stat">
              <strong>{stats.total}</strong>
              <span>Total plazas</span>
            </div>
            <div className="stat success">
              <strong>{stats.available}</strong>
              <span>Disponibles</span>
            </div>
            <div className="stat warning">
              <strong>{stats.occupied}</strong>
              <span>Ocupadas</span>
            </div>
          </div>

          <form className="spot-form" onSubmit={handleSpotSubmit}>
            <div className="form-heading">
              <h2>{editingId ? "Editar plaza" : "Nueva plaza"}</h2>
              {editingId && (
                <button type="button" className="ghost-action" onClick={handleCancelEdit}>
                  Cancelar
                </button>
              )}
            </div>

            <label>
              Codigo
              <input name="code" value={spotForm.code} onChange={handleSpotInput} required maxLength={20} />
            </label>

            <div className="form-row">
              <label>
                Piso
                <input name="floor" type="number" min="1" value={spotForm.floor} onChange={handleSpotInput} />
              </label>
              <label>
                Tarifa
                <input
                  name="hourlyRate"
                  type="number"
                  min="0"
                  step="100"
                  value={spotForm.hourlyRate}
                  onChange={handleSpotInput}
                />
              </label>
            </div>

            <label>
              Sector
              <input name="sector" value={spotForm.sector} onChange={handleSpotInput} required maxLength={60} />
            </label>

            <div className="form-row">
              <label>
                Tipo
                <select name="type" value={spotForm.type} onChange={handleSpotInput}>
                  {Object.entries(spotTypes).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Estado
                <select name="status" value={spotForm.status} onChange={handleSpotInput}>
                  {Object.entries(spotStatuses).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Notas
              <textarea name="notes" value={spotForm.notes} onChange={handleSpotInput} rows="3" />
            </label>

            <button className="primary-action" type="submit" disabled={loading}>
              {editingId ? <CheckCircle2 aria-hidden="true" /> : <Plus aria-hidden="true" />}
              {editingId ? "Guardar cambios" : "Crear plaza"}
            </button>
          </form>

          <div className="list-region">
            <div className="list-heading">
              <h2>Plazas</h2>
              <button type="button" onClick={loadSpots} title="Actualizar listado" aria-label="Actualizar listado">
                <RefreshCw className={loading ? "spin" : ""} aria-hidden="true" />
              </button>
            </div>

            {error && <p className="feedback error">{error}</p>}
            {message && <p className="feedback ok">{message}</p>}

            <div className="spot-list">
              {spots.map((spot) => (
                <article key={spot.id} className={`spot-item ${spot.status}`}>
                  <div className="spot-main">
                    <Car aria-hidden="true" />
                    <div>
                      <h3>{spot.code}</h3>
                      <p>
                        Piso {spot.floor} · {spot.sector} · {spotTypes[spot.type]}
                      </p>
                    </div>
                  </div>
                  <div className="spot-meta">
                    <span>{spotStatuses[spot.status]}</span>
                    <strong>${Number(spot.hourlyRate).toLocaleString("es-CL")}</strong>
                  </div>
                  <div className="spot-actions">
                    <button type="button" onClick={() => handleEdit(spot)} title="Editar plaza" aria-label="Editar plaza">
                      <Edit3 aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(spot)}
                      title="Eliminar plaza"
                      aria-label="Eliminar plaza"
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}

              {!spots.length && !loading && <p className="empty-state">Sin plazas registradas.</p>}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
