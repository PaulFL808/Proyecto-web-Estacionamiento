import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart3,
  Car,
  CheckCircle2,
  CircleParking,
  Edit3,
  KeyRound,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Trash2
} from "lucide-react";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
const sessionKey = "estacionamiento_session";

const emptyAuthForm = { name: "", email: "", password: "" };
const emptyResetForm = { email: "", token: "", password: "" };
const emptySpotForm = {
  code: "",
  floor: 1,
  sector: "general",
  type: "standard",
  status: "available",
  hourlyRate: 1500,
  notes: ""
};
const emptyParkingForm = {
  parkingSpotId: "",
  plate: "",
  driverName: "",
  vehicleType: "car",
  expectedExitAt: ""
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

const parkingStatuses = {
  active: "Activo",
  finished: "Finalizado",
  cancelled: "Cancelado"
};

const vehicleTypes = {
  car: "Auto",
  motorcycle: "Moto",
  truck: "Camioneta"
};

const predefinedSectors = ["Norte", "Sur", "Oriente", "Poniente", "VIP", "Subterraneo 1", "Subterraneo 2"];

function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(sessionKey));
  } catch {
    return null;
  }
}

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString("es-CL")}`;
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("es-CL", {
    dateStyle: "short",
    timeStyle: "short"
  });
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
  const [view, setView] = useState("dashboard");
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState(emptyAuthForm);
  const [resetForm, setResetForm] = useState(emptyResetForm);
  const [spots, setSpots] = useState([]);
  const [parkings, setParkings] = useState([]);
  const [report, setReport] = useState([]);
  const [spotForm, setSpotForm] = useState(emptySpotForm);
  const [parkingForm, setParkingForm] = useState(emptyParkingForm);
  const [filters, setFilters] = useState({ search: "", sector: "", status: "", parkingStatus: "active" });
  const [editingSpotId, setEditingSpotId] = useState(null);
  const [editingParkingId, setEditingParkingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const availableSpots = useMemo(
    () => spots.filter((spot) => spot.status === "available" || spot.id === parkingForm.parkingSpotId),
    [parkingForm.parkingSpotId, spots]
  );

  const stats = useMemo(() => {
    const total = spots.length;
    const available = spots.filter((spot) => spot.status === "available").length;
    const occupied = spots.filter((spot) => spot.status === "occupied").length;
    const active = parkings.filter((parking) => parking.status === "active").length;
    const revenue = parkings.reduce((sum, parking) => sum + Number(parking.totalAmount || 0), 0);
    return { total, available, occupied, active, revenue };
  }, [parkings, spots]);

  async function loadAll() {
    if (!session?.token) return;
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.sector) params.set("sector", filters.sector);
      if (filters.status) params.set("status", filters.status);

      const parkingParams = new URLSearchParams();
      parkingParams.set("status", filters.parkingStatus || "active");
      if (filters.sector) parkingParams.set("sector", filters.sector);
      if (filters.search) parkingParams.set("plate", filters.search);

      const [spotData, parkingData, reportData] = await Promise.all([
        apiRequest(`/plazas${params.toString() ? `?${params}` : ""}`, { token: session.token }),
        apiRequest(`/estacionamientos-activos?${parkingParams}`, { token: session.token }),
        apiRequest("/reportes/ocupacion-zona", { token: session.token })
      ]);

      setSpots(spotData);
      setParkings(parkingData);
      setReport(reportData);
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
    loadAll();
  }, [session?.token]);

  function handleLogout() {
    localStorage.removeItem(sessionKey);
    setSession(null);
    setSpots([]);
    setParkings([]);
    setReport([]);
    setMessage("");
    setError("");
  }

  function clearFeedback() {
    setError("");
    setMessage("");
  }

  function handleInput(setter) {
    return (event) => {
      const { name, value } = event.target;
      setter((current) => ({
        ...current,
        [name]: name === "floor" || name === "hourlyRate" ? Number(value) : value
      }));
    };
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setLoading(true);
    clearFeedback();

    try {
      const data = await apiRequest(`/auth/${authMode === "register" ? "register" : "login"}`, {
        method: "POST",
        body:
          authMode === "register"
            ? authForm
            : {
                email: authForm.email,
                password: authForm.password
              }
      });

      localStorage.setItem(sessionKey, JSON.stringify(data));
      setSession(data);
      setAuthForm(emptyAuthForm);
      setView("dashboard");
      setMessage(authMode === "register" ? "Cuenta creada." : "Sesion iniciada.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRequestReset(event) {
    event.preventDefault();
    setLoading(true);
    clearFeedback();

    try {
      const data = await apiRequest("/auth/password-reset/request", {
        method: "POST",
        body: { email: resetForm.email }
      });
      setResetForm((current) => ({ ...current, token: data.resetToken || "" }));
      setMessage(data.resetToken ? `Token generado: ${data.resetToken}` : data.message);
      setAuthMode("reset");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();
    setLoading(true);
    clearFeedback();

    try {
      const data = await apiRequest("/auth/password-reset/confirm", {
        method: "POST",
        body: {
          token: resetForm.token,
          password: resetForm.password
        }
      });
      setResetForm(emptyResetForm);
      setMessage(data.message);
      setAuthMode("login");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSpotSubmit(event) {
    event.preventDefault();
    setLoading(true);
    clearFeedback();

    try {
      await apiRequest(editingSpotId ? `/plazas/${editingSpotId}` : "/plazas", {
        method: editingSpotId ? "PUT" : "POST",
        token: session.token,
        body: {
          ...spotForm,
          code: spotForm.code.trim().toUpperCase(),
          sector: spotForm.sector.trim().toLowerCase(),
          notes: spotForm.notes.trim() || null
        }
      });
      setSpotForm(emptySpotForm);
      setEditingSpotId(null);
      setMessage(editingSpotId ? "Plaza actualizada." : "Plaza creada.");
      await loadAll();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function editSpot(spot) {
    setEditingSpotId(spot.id);
    setSpotForm({
      code: spot.code,
      floor: spot.floor,
      sector: spot.sector,
      type: spot.type,
      status: spot.status,
      hourlyRate: Number(spot.hourlyRate),
      notes: spot.notes || ""
    });
    setView("spots");
    clearFeedback();
  }

  async function deleteSpot(spot) {
    if (!window.confirm(`Eliminar plaza ${spot.code}?`)) return;
    setLoading(true);
    clearFeedback();

    try {
      await apiRequest(`/plazas/${spot.id}`, { method: "DELETE", token: session.token });
      setMessage("Plaza eliminada.");
      await loadAll();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleParkingSubmit(event) {
    event.preventDefault();
    setLoading(true);
    clearFeedback();

    try {
      const body = {
        ...parkingForm,
        plate: parkingForm.plate.trim().toUpperCase(),
        driverName: parkingForm.driverName.trim() || null,
        expectedExitAt: parkingForm.expectedExitAt || null
      };
      await apiRequest(
        editingParkingId ? `/estacionamientos-activos/${editingParkingId}` : "/estacionamientos-activos",
        {
          method: editingParkingId ? "PUT" : "POST",
          token: session.token,
          body
        }
      );
      setParkingForm(emptyParkingForm);
      setEditingParkingId(null);
      setMessage(editingParkingId ? "Registro actualizado." : "Entrada registrada.");
      await loadAll();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function editParking(parking) {
    setEditingParkingId(parking.id);
    setParkingForm({
      parkingSpotId: parking.parkingSpotId,
      plate: parking.plate,
      driverName: parking.driverName || "",
      vehicleType: parking.vehicleType,
      expectedExitAt: parking.expectedExitAt ? parking.expectedExitAt.slice(0, 16) : ""
    });
    setView("parkings");
    clearFeedback();
  }

  async function finishParking(parking) {
    setLoading(true);
    clearFeedback();
    try {
      const data = await apiRequest(`/estacionamientos-activos/${parking.id}/salida`, {
        method: "PATCH",
        token: session.token
      });
      setMessage(`Salida registrada. Total a pagar: ${formatMoney(data.totalAmount)}.`);
      await loadAll();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function cancelParking(parking) {
    if (!window.confirm(`Cancelar registro ${parking.plate}?`)) return;
    setLoading(true);
    clearFeedback();
    try {
      await apiRequest(`/estacionamientos-activos/${parking.id}/cancelar`, {
        method: "PATCH",
        token: session.token
      });
      setMessage("Registro cancelado.");
      await loadAll();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <main className="app-shell auth-page">
        <section className="auth-layout">
          <div className="auth-copy">
            <CircleParking aria-hidden="true" />
            <span className="eyebrow">Hito 3</span>
            <h1>Control de estacionamiento</h1>
            <p>Aplicacion completa con auth JWT, plazas, entradas, salidas, tarifas y reportes por zona.</p>
          </div>

          <div className="auth-card">
            <div className="segmented" aria-label="Modo de acceso">
              <button type="button" className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")}>
                Login
              </button>
              <button
                type="button"
                className={authMode === "register" ? "active" : ""}
                onClick={() => setAuthMode("register")}
              >
                Registro
              </button>
              <button
                type="button"
                className={authMode === "forgot" || authMode === "reset" ? "active" : ""}
                onClick={() => setAuthMode("forgot")}
              >
                Recuperar
              </button>
            </div>

            {(authMode === "login" || authMode === "register") && (
              <form className="form-grid" onSubmit={handleAuthSubmit}>
                {authMode === "register" && (
                  <label>
                    Nombre
                    <input name="name" value={authForm.name} onChange={handleInput(setAuthForm)} autoComplete="name" />
                  </label>
                )}
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    value={authForm.email}
                    onChange={handleInput(setAuthForm)}
                    autoComplete="email"
                  />
                </label>
                <label>
                  Contrasena
                  <input
                    name="password"
                    type="password"
                    value={authForm.password}
                    onChange={handleInput(setAuthForm)}
                    autoComplete={authMode === "register" ? "new-password" : "current-password"}
                  />
                </label>
                <button className="primary-action" type="submit" disabled={loading}>
                  {loading ? <Loader2 className="spin" aria-hidden="true" /> : <KeyRound aria-hidden="true" />}
                  {authMode === "register" ? "Crear cuenta" : "Iniciar sesion"}
                </button>
              </form>
            )}

            {authMode === "forgot" && (
              <form className="form-grid" onSubmit={handleRequestReset}>
                <label>
                  Email registrado
                  <input name="email" type="email" value={resetForm.email} onChange={handleInput(setResetForm)} />
                </label>
                <button className="primary-action" type="submit" disabled={loading}>
                  <KeyRound aria-hidden="true" />
                  Generar token
                </button>
              </form>
            )}

            {authMode === "reset" && (
              <form className="form-grid" onSubmit={handleResetPassword}>
                <label>
                  Token
                  <input name="token" value={resetForm.token} onChange={handleInput(setResetForm)} />
                </label>
                <label>
                  Nueva contrasena
                  <input name="password" type="password" value={resetForm.password} onChange={handleInput(setResetForm)} />
                </label>
                <button className="primary-action" type="submit" disabled={loading}>
                  <CheckCircle2 aria-hidden="true" />
                  Cambiar contrasena
                </button>
              </form>
            )}

            {error && <p className="feedback error">{error}</p>}
            {message && <p className="feedback ok">{message}</p>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Hito 3</span>
          <h1>Control de estacionamiento</h1>
        </div>
        <div className="session-pill">
          <span>{session.user.name}</span>
          <button type="button" onClick={handleLogout} title="Cerrar sesion" aria-label="Cerrar sesion">
            <LogOut aria-hidden="true" />
          </button>
        </div>
      </header>

      <nav className="tabs" aria-label="Navegacion principal">
        {[
          ["dashboard", "Panel"],
          ["spots", "Plazas"],
          ["parkings", "Entradas y salidas"],
          ["reports", "Reportes"]
        ].map(([key, label]) => (
          <button key={key} type="button" className={view === key ? "active" : ""} onClick={() => setView(key)}>
            {label}
          </button>
        ))}
      </nav>

      <section className="toolbar">
        <label>
          Buscar
          <div className="input-icon">
            <Search aria-hidden="true" />
            <input
              name="search"
              value={filters.search}
              onChange={handleInput(setFilters)}
              placeholder="Codigo o patente"
            />
          </div>
        </label>
        <label>
          Sector
          <select name="sector" value={filters.sector} onChange={handleInput(setFilters)}>
            <option value="">Todos los sectores</option>
            {predefinedSectors.map((s) => (
              <option key={s} value={s.toLowerCase()}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Estado plaza
          <select name="status" value={filters.status} onChange={handleInput(setFilters)}>
            <option value="">Todos</option>
            {Object.entries(spotStatuses).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Registros
          <select name="parkingStatus" value={filters.parkingStatus} onChange={handleInput(setFilters)}>
            <option value="active">Activos</option>
            <option value="finished">Finalizados</option>
            <option value="cancelled">Cancelados</option>
            <option value="all">Todos</option>
          </select>
        </label>
        <button className="icon-action" type="button" onClick={loadAll} title="Actualizar datos" aria-label="Actualizar datos">
          <RefreshCw className={loading ? "spin" : ""} aria-hidden="true" />
        </button>
      </section>

      {error && <p className="feedback error">{error}</p>}
      {message && <p className="feedback ok">{message}</p>}

      {view === "dashboard" && (
        <section className="workspace">
          <div className="stats-grid">
            <Stat label="Total plazas" value={stats.total} />
            <Stat label="Disponibles" value={stats.available} tone="success" />
            <Stat label="Ocupadas" value={stats.occupied} tone="warning" />
            <Stat label="Vehiculos activos" value={stats.active} />
            <Stat label="Ingresos cerrados" value={formatMoney(stats.revenue)} />
          </div>
          <div className="panel">
            <h2>Ocupacion por zona</h2>
            <ZoneReport report={report} />
          </div>
        </section>
      )}

      {view === "spots" && (
        <section className="workspace two-columns">
          <SpotForm
            editingSpotId={editingSpotId}
            form={spotForm}
            onChange={handleInput(setSpotForm)}
            onCancel={() => {
              setEditingSpotId(null);
              setSpotForm(emptySpotForm);
            }}
            onSubmit={handleSpotSubmit}
            loading={loading}
          />
          <SpotList spots={spots} onEdit={editSpot} onDelete={deleteSpot} />
        </section>
      )}

      {view === "parkings" && (
        <section className="workspace two-columns">
          <ParkingForm
            editingParkingId={editingParkingId}
            form={parkingForm}
            spots={availableSpots}
            onChange={handleInput(setParkingForm)}
            onCancel={() => {
              setEditingParkingId(null);
              setParkingForm(emptyParkingForm);
            }}
            onSubmit={handleParkingSubmit}
            loading={loading}
          />
          <ParkingList
            parkings={parkings}
            onEdit={editParking}
            onFinish={finishParking}
            onCancel={cancelParking}
          />
        </section>
      )}

      {view === "reports" && (
        <section className="workspace">
          <div className="panel">
            <h2>Reporte por zona</h2>
            <ZoneReport report={report} detailed />
          </div>
        </section>
      )}
    </main>
  );
}

function Stat({ label, value, tone = "" }) {
  return (
    <article className={`stat ${tone}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function SpotForm({ editingSpotId, form, onChange, onCancel, onSubmit, loading }) {
  return (
    <form className="panel form-grid" onSubmit={onSubmit}>
      <div className="section-heading">
        <h2>{editingSpotId ? "Editar plaza" : "Nueva plaza"}</h2>
        {editingSpotId && (
          <button type="button" className="ghost-action" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
      <label>
        Codigo
        <input name="code" value={form.code} onChange={onChange} required maxLength={20} />
      </label>
      <div className="form-row">
        <label>
          Piso
          <input name="floor" type="number" min="1" value={form.floor} onChange={onChange} />
        </label>
        <label>
          Tarifa hora
          <input name="hourlyRate" type="number" min="1" step="100" value={form.hourlyRate} onChange={onChange} />
        </label>
      </div>
      <label>
        Sector
        <select name="sector" value={form.sector} onChange={onChange} required>
          <option value="">Seleccionar sector</option>
          {predefinedSectors.map((s) => (
            <option key={s} value={s.toLowerCase()}>{s}</option>
          ))}
        </select>
      </label>
      <div className="form-row">
        <label>
          Tipo
          <select name="type" value={form.type} onChange={onChange}>
            {Object.entries(spotTypes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Estado
          <select name="status" value={form.status} onChange={onChange}>
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
        <textarea name="notes" value={form.notes} onChange={onChange} rows="3" />
      </label>
      <button className="primary-action" type="submit" disabled={loading}>
        {editingSpotId ? <CheckCircle2 aria-hidden="true" /> : <Plus aria-hidden="true" />}
        {editingSpotId ? "Guardar cambios" : "Crear plaza"}
      </button>
    </form>
  );
}

function ParkingForm({ editingParkingId, form, spots, onChange, onCancel, onSubmit, loading }) {
  return (
    <form className="panel form-grid" onSubmit={onSubmit}>
      <div className="section-heading">
        <h2>{editingParkingId ? "Editar registro" : "Registrar entrada"}</h2>
        {editingParkingId && (
          <button type="button" className="ghost-action" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
      <label>
        Plaza
        <select name="parkingSpotId" value={form.parkingSpotId} onChange={onChange} required>
          <option value="">Seleccionar plaza</option>
          {spots.map((spot) => (
            <option key={spot.id} value={spot.id}>
              {spot.code} - {spot.sector} - {spotTypes[spot.type]}
            </option>
          ))}
        </select>
      </label>
      <label>
        Patente
        <input name="plate" value={form.plate} onChange={onChange} required maxLength={12} />
      </label>
      <label>
        Conductor
        <input name="driverName" value={form.driverName} onChange={onChange} maxLength={120} />
      </label>
      <div className="form-row">
        <label>
          Vehiculo
          <select name="vehicleType" value={form.vehicleType} onChange={onChange}>
            {Object.entries(vehicleTypes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Salida esperada
          <input name="expectedExitAt" type="datetime-local" value={form.expectedExitAt} onChange={onChange} />
        </label>
      </div>
      <button className="primary-action" type="submit" disabled={loading || !spots.length}>
        <Car aria-hidden="true" />
        {editingParkingId ? "Guardar registro" : "Registrar entrada"}
      </button>
    </form>
  );
}

function SpotList({ spots, onEdit, onDelete }) {
  return (
    <div className="panel">
      <h2>Plazas</h2>
      <div className="item-list">
        {spots.map((spot) => (
          <article key={spot.id} className={`item-row ${spot.status}`}>
            <div className="item-main">
              <CircleParking aria-hidden="true" />
              <div>
                <h3>{spot.code}</h3>
                <p>
                  Piso {spot.floor} · {spot.sector} · {spotTypes[spot.type]}
                </p>
              </div>
            </div>
            <div className="item-meta">
              <span>{spotStatuses[spot.status]}</span>
              <strong>{formatMoney(spot.hourlyRate)}</strong>
            </div>
            <div className="item-actions">
              <button type="button" onClick={() => onEdit(spot)} title="Editar plaza" aria-label="Editar plaza">
                <Edit3 aria-hidden="true" />
              </button>
              <button type="button" onClick={() => onDelete(spot)} title="Eliminar plaza" aria-label="Eliminar plaza">
                <Trash2 aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
        {!spots.length && <p className="empty-state">Sin plazas para mostrar.</p>}
      </div>
    </div>
  );
}

function ParkingList({ parkings, onEdit, onFinish, onCancel }) {
  return (
    <div className="panel">
      <h2>Registros de entrada/salida</h2>
      <div className="item-list">
        {parkings.map((parking) => (
          <article key={parking.id} className={`item-row ${parking.status}`}>
            <div className="item-main">
              <Car aria-hidden="true" />
              <div>
                <h3>{parking.plate}</h3>
                <p>
                  {parking.parkingSpot?.code || "Sin plaza"} · {vehicleTypes[parking.vehicleType]} ·{" "}
                  {parking.driverName || "Sin conductor"}
                </p>
                <p>
                  Entrada {formatDate(parking.checkInAt)} · Salida {formatDate(parking.checkOutAt)}
                </p>
              </div>
            </div>
            <div className="item-meta">
              <span>{parkingStatuses[parking.status]}</span>
              <strong>{formatMoney(parking.totalAmount)}</strong>
            </div>
            {parking.status === "active" && (
              <div className="item-actions">
                <button type="button" onClick={() => onEdit(parking)} title="Editar registro" aria-label="Editar registro">
                  <Edit3 aria-hidden="true" />
                </button>
                <button type="button" onClick={() => onFinish(parking)} title="Registrar salida" aria-label="Registrar salida">
                  <CheckCircle2 aria-hidden="true" />
                </button>
                <button type="button" onClick={() => onCancel(parking)} title="Cancelar registro" aria-label="Cancelar registro">
                  <Trash2 aria-hidden="true" />
                </button>
              </div>
            )}
          </article>
        ))}
        {!parkings.length && <p className="empty-state">Sin registros para mostrar.</p>}
      </div>
    </div>
  );
}

function ZoneReport({ report, detailed = false }) {
  if (!report.length) {
    return <p className="empty-state">No hay plazas para reportar.</p>;
  }

  return (
    <div className="report-grid">
      {report.map((zone) => (
        <article key={zone.sector} className="zone-card">
          <div className="zone-head">
            <BarChart3 aria-hidden="true" />
            <div>
              <h3>{zone.sector}</h3>
              <p>{zone.occupancyRate}% ocupacion</p>
            </div>
          </div>
          <div className="meter" aria-label={`Ocupacion ${zone.occupancyRate}%`}>
            <span style={{ width: `${zone.occupancyRate}%` }} />
          </div>
          <dl>
            <div>
              <dt>Total</dt>
              <dd>{zone.total}</dd>
            </div>
            <div>
              <dt>Disponibles</dt>
              <dd>{zone.available}</dd>
            </div>
            <div>
              <dt>Ocupadas</dt>
              <dd>{zone.occupied}</dd>
            </div>
            {detailed && (
              <>
                <div>
                  <dt>Mantencion</dt>
                  <dd>{zone.maintenance}</dd>
                </div>
                <div>
                  <dt>Reservadas</dt>
                  <dd>{zone.reserved}</dd>
                </div>
                <div>
                  <dt>Vehiculos activos</dt>
                  <dd>{zone.activeVehicles}</dd>
                </div>
              </>
            )}
          </dl>
        </article>
      ))}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
