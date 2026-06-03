#!/usr/bin/env python3
"""Genera lista-requerimientos.md y rq-01..10 por proyecto."""
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
PROYECTOS_DIR = BASE / "proyectos"

# (num, slug, titulo, ent1, ent2, recurso_a, recurso_b, regla1, regla2, busqueda, panel, flujo, v3, notas_rq05, notas_rq09)
PROJECTS = [
    ("01", "pokedex", "Pokédex", "Pokémon en colección", "Tipo o etiqueta",
     "pokémon de la colección", "tipos o categorías",
     "El nivel debe estar entre 1 y 100 inclusive",
     "Un mismo usuario no puede registrar dos veces la misma especie con el mismo apodo",
     "filtrar la colección por tipo, favorito o nombre",
     "vista principal de la colección con tarjetas o tabla",
     "marcar o editar un Pokémon de la colección (favorito, notas, nivel)",
     "consultar PokeAPI al registrar para completar datos (imagen, tipos); cachear respuesta en BD o mostrar sin persistir todo",
     "Validar rango de nivel en API y formulario", "Formulario de alta con búsqueda opcional en PokeAPI"),
    ("02", "recetario", "Recetario", "Receta", "Ingrediente o línea de ingrediente",
     "recetas", "ingredientes",
     "Los tiempos de cocción deben ser mayores a 0",
     "No eliminar ingrediente si está referenciado en recetas activas (o cascada documentada)",
     "buscar recetas por nombre, etiqueta dietética o tiempo máximo",
     "listado de recetas con acceso al detalle",
     "crear o editar receta con lista dinámica de ingredientes",
     "generar menú semanal o lista de compras agregada desde recetas seleccionadas",
     "Validar porciones mínimas", "Editor de receta con ingredientes"),
    ("03", "boletos-cine", "Compra boletos cine", "Película", "Función o sala",
     "películas", "funciones",
     "No vender el mismo asiento dos veces para una función",
     "No reservar asientos en función ya iniciada o cancelada",
     "buscar funciones por película y fecha",
     "cartelera o listado de funciones",
     "selección de asientos y confirmación de compra",
     "aplicar promoción o cerrar carrito simulado con total",
     "HTTP 409 si asiento ocupado", "Mapa o lista de asientos en UI"),
    ("04", "reserva-hotel", "Reserva de hotel", "Habitación", "Reserva",
     "habitaciones", "reservas",
     "fecha_salida debe ser posterior a fecha_entrada",
     "no solapar reservas activas para la misma habitación",
     "consultar disponibilidad por rango de fechas",
     "panel de habitaciones y ocupación",
     "crear reserva con validación de fechas",
     "temporadas o precio por noche con extras opcionales",
     "409 en solapamiento", "Calendario o formulario de reserva"),
    ("05", "clinica-veterinaria", "Clínica veterinaria", "Mascota", "Turno o cita",
     "mascotas", "turnos",
     "No agendar turno en horario ya ocupado para el mismo veterinario o box",
     "Solo mascotas con tutor asociado al usuario o registro global según diseño",
     "listar turnos por fecha o mascota",
     "ficha de mascotas del tutor",
     "agendar turno con validación de horario",
     "historial de visitas o registro de vacunas",
     "Validar solapamiento", "Formulario de cita"),
    ("06", "biblioteca", "Biblioteca / préstamos", "Libro", "Préstamo",
     "libros", "préstamos",
     "No prestar libro con estado prestado",
     "Calcular multa ficticia si fecha_devolución supera la pactada",
     "buscar libros por autor, título o ISBN",
     "catálogo de libros y préstamos activos",
     "registrar préstamo y devolución",
     "consulta opcional API externa por ISBN para metadata",
     "409 si no disponible", "Flujo préstamo/devolución"),
    ("07", "tickets-soporte", "Tickets de soporte", "Ticket", "Comentario de ticket",
     "tickets", "comentarios",
     "Prioridad y estado deben ser valores permitidos",
     "Solo tickets cerrados pueden registrar tiempo_resolucion",
     "filtrar por estado, prioridad o agente",
     "bandeja de tickets",
     "crear ticket y cambiar estado",
     "métricas: abiertos por prioridad o SLA vencido",
     "Validar transiciones de estado", "Detalle de ticket con comentarios"),
    ("08", "cafeteria", "Ventas de cafetería", "Producto", "Venta o línea de venta",
     "productos", "ventas",
     "No vender si stock es 0 cuando se controla stock",
     "Total de venta coherente con suma de líneas",
     "ventas del día por rango de fechas",
     "mostrador: catálogo y registro rápido de venta",
     "registrar venta con ítems y método de pago simulado",
     "cierre de caja o producto más vendido",
     "Descontar stock", "Pantalla de venta tipo POS"),
    ("09", "agenda-eventos", "Agenda de eventos", "Evento", "Participante o categoría",
     "eventos", "categorías",
     "fecha_fin posterior a fecha_inicio",
     "detectar conflicto de horario para mismo recurso o sala si aplica",
     "eventos por mes o categoría",
     "calendario o listado semanal",
     "crear o editar evento",
     "exportar JSON/CSV o recordatorio documentado",
     "Validar rango horario", "Formulario evento"),
    ("10", "restaurante", "Sistema para restaurante", "Mesa", "Comanda",
     "mesas", "ítems del menú o comandas",
     "No cerrar mesa con comanda abierta",
     "Estados de ítem de cocina en secuencia válida",
     "mesas por estado libre/ocupada",
     "vista de salón y comandas activas",
     "armar comanda por mesa",
     "cuenta, propina opcional o platos más pedidos",
     "Estados mesa/comanda", "UI comanda por mesa"),
    ("11", "reserva-canchas", "Reserva de canchas", "Cancha", "Reserva de slot",
     "canchas", "reservas",
     "No solapar reserva en mismo horario para la misma cancha",
     "Respetar capacidad máxima si aplica",
     "reservas por fecha y cancha",
     "disponibilidad de canchas",
     "reservar franja horaria",
     "lista de espera o membresía opcional",
     "409 solapamiento", "Selector de horario"),
    ("12", "cursos-talleres", "Inscripción a cursos", "Curso", "Inscripción",
     "cursos", "inscripciones",
     "No inscribir si cupo lleno",
     "Un alumno no puede tener dos inscripciones activas solapadas en horario",
     "cursos con cupos disponibles",
     "oferta de cursos",
     "inscribir alumno a curso",
     "lista de espera o certificado emitido",
     "409 cupo lleno", "Formulario inscripción"),
    ("13", "estacionamiento", "Control de estacionamiento", "Plaza", "Estacionamiento activo",
     "plazas", "registros de entrada/salida",
     "Una plaza no puede tener dos vehículos activos",
     "Calcular tarifa al salir según tiempo estacionado",
     "ocupación por zona",
     "mapa o listado de plazas",
     "registrar entrada y salida con patente",
     "abono mensual o reporte por zona",
     "Tarifa por hora documentada", "Registro entrada/salida"),
    ("14", "farmacia", "Farmacia / dispensario", "Medicamento", "Venta",
     "medicamentos", "ventas",
     "No vender medicamento con receta_obligatoria sin número de receta",
     "Alertar o bloquear venta si stock bajo umbral",
     "medicamentos por nombre o stock",
     "inventario y ventas",
     "venta con líneas y validación de receta",
     "lotes, vencimiento o reporte de ventas",
     "Validación receta", "Formulario venta"),
    ("15", "delivery", "Pedidos delivery", "Local o restaurante", "Pedido",
     "locales", "pedidos",
     "No cancelar pedido en estado en_camino o entregado",
     "Total coherente con ítems",
     "pedidos por estado o cliente",
     "seguimiento de pedidos activos",
     "crear pedido con dirección e ítems",
     "asignar repartidor y ETA simulado",
     "Estados del pedido", "Tracking en UI"),
    ("16", "clinica-medica", "Clínica médica", "Paciente", "Turno médico",
     "pacientes", "turnos",
     "No solapar turno para el mismo médico",
     "Estados: programado, atendido, cancelado",
     "turnos del día por médico",
     "agenda de pacientes",
     "agendar consulta",
     "historial de consultas o recordatorio de control",
     "409 horario médico", "Formulario turno"),
    ("17", "rent-a-car", "Rent-a-car", "Vehículo", "Reserva de arriendo",
     "vehículos", "reservas",
     "No arrendar vehículo con reserva solapada",
     "Kilometraje al devolver >= al entregar",
     "disponibilidad por fechas",
     "flota y reservas",
     "crear reserva por rango de fechas",
     "extras, multa por atraso en devolución",
     "409 conflicto fechas", "Formulario reserva"),
    ("18", "encuestas", "Encuestas y evaluaciones", "Encuesta", "Respuesta",
     "encuestas", "preguntas o respuestas",
     "No responder encuesta cerrada",
     "Un respondente no puede enviar dos respuestas a la misma encuesta si política es única",
     "encuestas activas",
     "listado de encuestas",
     "responder encuesta desde UI",
     "resultados agregados por pregunta",
     "Validar opciones", "UI responder encuesta"),
    ("19", "gimnasio", "Gestión de gimnasio", "Socio", "Membresía o clase grupal",
     "planes o socios", "clases",
     "No registrar ingreso si membresía vencida",
     "No inscribir a clase si cupo lleno",
     "socios activos o clases del día",
     "panel de socios y membresías",
     "renovar membresía o inscribir a clase",
     "asistencia a clases o reporte de ocupación",
     "Validar vigencia", "Check-in o inscripción clase"),
    ("20", "barberia", "Barbería / salón", "Servicio", "Cita",
     "servicios", "citas",
     "No solapar cita para el mismo profesional",
     "Cancelación libera slot",
     "citas por día o profesional",
     "agenda del salón",
     "reservar cita",
     "combos, lista de espera o cliente frecuente",
     "409 solapamiento", "Reserva de cita UI"),
    ("21", "lavanderia", "Lavandería / tintorería", "Cliente", "Orden de trabajo",
     "órdenes", "prendas en detalle",
     "Flujo de estados: recibido → en proceso → listo → entregado",
     "No entregar si estado no es listo",
     "órdenes pendientes o retrasadas",
     "tablero de órdenes",
     "recepción de prenda con fecha prometida",
     "recargo urgente o cliente frecuente",
     "Estados orden", "Cambio de estado en UI"),
    ("22", "pasajes-bus", "Pasajes de bus", "Ruta o viaje", "Pasaje",
     "viajes o servicios", "pasajes",
     "No vender mismo asiento en mismo viaje",
     "Cancelación según política temporal",
     "viajes por origen, destino y fecha",
     "búsqueda de viajes",
     "compra de pasaje con asiento",
     "paradas intermedias o equipaje",
     "409 asiento", "Selector asiento"),
    ("23", "food-truck", "Food truck", "Food truck", "Ubicación del día o pedido",
     "food trucks", "pedidos",
     "Solo pedir si hay ubicación activa ese día",
     "Stock diario por ítem si aplica",
     "menú del día por truck",
     "trucks y ubicación actual",
     "pedido contra truck activo",
     "ranking de ventas por truck",
     "Validar ubicación activa", "Pedido móvil"),
    ("24", "ferreteria", "Ferretería", "Producto", "Venta o cotización",
     "productos", "cotizaciones",
     "No vender por encima del stock",
     "Cotización confirmada descuenta stock; borrador no",
     "stock bajo o por categoría",
     "inventario",
     "venta o cotización multi-línea",
     "alerta stock bajo o proveedor",
     "Stock en transacción", "POS o cotización"),
    ("25", "guarderia", "Guardería / jardín infantil", "Niño", "Registro entrada/salida",
     "niños o salas", "matrículas",
     "Solo tutor autorizado puede registrar retiro",
     "Cupo máximo por sala en matrícula",
     "asistencia mensual",
     "salas y niños matriculados",
     "registro diario entrada/salida",
     "incidentes del día o avisos",
     "Validar tutor autorizado", "Registro retiro UI"),
    ("26", "pasajes-aereos", "Venta de pasajes aéreos", "Vuelo", "Reserva o pasaje",
     "vuelos", "reservas",
     "No vender mismo asiento en mismo vuelo",
     "Cancelación solo antes de X horas del vuelo (política documentada)",
     "vuelos por origen, destino y fecha",
     "búsqueda de vuelos",
     "selección de asiento o clase y compra",
     "tarifa por clase, equipaje o manifiesto",
     "409 asiento; política cancelación", "Selector asiento/clase"),
]

WEB_MAP = {
    1: "No", 2: "No", 3: "Sí", 4: "Sí", 5: "Parcial", 6: "Parcial",
    7: "Sí", 8: "Sí", 9: "Sí", 10: "Parcial",
}

RQ_TITLES = [
    ("Modelar entidad principal del dominio", "ent1", False),
    ("Modelar entidad secundaria o relación", "ent2", False),
    ("CRUD del recurso principal de gestión", "recurso_a", True),
    ("CRUD del recurso secundario", "recurso_b", True),
    ("Regla de negocio principal", "regla1", False),
    ("Regla de negocio complementaria", "regla2", False),
    ("Consultas con filtros y búsqueda", "busqueda", True),
    ("Panel o listado principal del dominio", "panel", True),
    ("Flujo transaccional clave del dominio", "flujo", True),
    ("Funcionalidad avanzada del dominio", "v3", False),
]


def web_field(n, explicit_partial=False):
    w = WEB_MAP[n]
    if n in (5, 6):
        return "Parcial — la UI debe reflejar errores HTTP (409/422) cuando aplique"
    if n == 10:
        return "Parcial — pantalla de reporte, integración externa o cierre según el caso"
    return {"Sí": "Sí", "No": "No", "Parcial": "Parcial"}[w]


def gen_rq(num, slug, title, pdata, rq_n):
    idx = rq_n - 1
    rtitle, field, _ = RQ_TITLES[idx]
    vals = pdata[3:13]
    detail = vals[idx]
    web = web_field(rq_n, rq_n == 10)

    extras = ""
    if rq_n == 5 and len(pdata) > 13:
        extras = f"\n\nNota: {pdata[13]}"
    if rq_n == 9 and len(pdata) > 14:
        extras = f"\n\nNota: {pdata[14]}"

    actor = "Usuario autenticado"
    if rq_n in (1, 2):
        actor = "Desarrollador / sistema (migraciones y modelos Sequelize)"

    pre = "Proyecto con estructura base y GEN-03 cumplido." if rq_n <= 2 else "Usuario autenticado salvo diseño explícito de rutas públicas."
    if rq_n >= 3:
        pre = "Login operativo (GEN-05) y modelos del dominio definidos."

    post = f"El dominio **{title}** soporta: {detail}."
    if rq_n in (3, 4, 7, 8, 9) and "Sí" in web or "Parcial" in web:
        post += " Evidencia en UI y API."

    criteria = [
        f"- [ ] Implementado en API según necesidad del dominio",
    ]
    if "Sí" in web or rq_n in (5, 6, 10):
        criteria.append("- [ ] Pantalla web asociada operativa contra API desplegada o local")
    if rq_n == 5:
        criteria.append("- [ ] Respuesta 409/422 con mensaje claro cuando se viola la regla")
    criteria.append("- [ ] Documentado en README o matriz de avance")

    return f"""# rq-{rq_n:02d}: {rtitle} — {title}

## Actor

{actor}

## Precondiciones

{pre}

## Postcondiciones

{post}

## Descripción detallada

{detail.capitalize() if detail[0].islower() else detail}.

El alumno define nombres de tablas, campos y rutas REST. La necesidad de negocio debe quedar cubierta sin copiar esquemas de otras evaluaciones del curso.{extras}

## Requiere página web integrada

{web}

## Criterios de aceptación (checklist)

{chr(10).join(criteria)}

## Libertad de diseño (qué decide el alumno)

- Nombre de modelos Sequelize y migraciones
- Campos opcionales y relaciones (1:N, N:M)
- Diseño de pantallas y navegación
- Textos, colores y layout del front

## Referencias

- Requisitos generales: [lista-requerimientos.md](../../../requerimientos-generales/lista-requerimientos.md)
"""


def gen_lista(num, slug, title, pdata):
    rows = []
    for i in range(1, 11):
        w = WEB_MAP[i]
        rtitle = RQ_TITLES[i - 1][0]
        rows.append(
            f"| [rq-{i:02d}](requerimientos/rq-{i:02d}.md) | {rtitle} | {w} |"
        )
    rows_txt = "\n".join(rows)
    return f"""# Requisitos — {title}

Proyecto **#{int(num)}** · `{slug}`

## Requisitos generales (todos obligatorios)

Cumplir **GEN-01 … GEN-13** documentados en:

- [lista-requerimientos.md](../../requerimientos-generales/lista-requerimientos.md)

## Requisitos del dominio

| ID | Título | [WEB] |
|----|--------|-------|
{rows_txt}

**Total proyecto:** 13 GEN + 10 rq = **23 requisitos**.

## Entidades orientativas

- Principal: {pdata[3]}
- Secundaria: {pdata[4]}
"""


def main():
    for p in PROJECTS:
        num, slug, title = p[0], p[1], p[2]
        folder = PROYECTOS_DIR / f"{num}-{slug}"
        req_dir = folder / "requerimientos"
        req_dir.mkdir(parents=True, exist_ok=True)
        (folder / "lista-requerimientos.md").write_text(
            gen_lista(num, slug, title, p), encoding="utf-8"
        )
        for n in range(1, 11):
            (req_dir / f"rq-{n:02d}.md").write_text(
                gen_rq(num, slug, title, p, n), encoding="utf-8"
            )
    print(f"Generados {len(PROJECTS)} proyectos × 11 archivos")


if __name__ == "__main__":
    main()
