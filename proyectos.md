# Proyecto final web — Catálogo de temas (individual)

## Información general

| Aspecto | Detalle |
|---------|---------|
| **Modalidad** | Individual — un alumno, un repositorio, un tema |
| **Producto** | Sistema **web** full-stack (navegador + API + BD), no solo API |
| **Stack** | Node, Express, Sequelize, PostgreSQL (recomendado), JWT, cliente web (`client/`) |
| **Deploy** | API + PostgreSQL en **Railway**; front en **Railway, Vercel o Netlify** (elección del alumno) |
| **Prerrequisito** | Evaluación práctica API (Parte 1 / Parte 2) completada o en paralelo |

Documentación técnica: [arquitectura.md](arquitectura.md) · Planificación: [planificacion.md](planificacion.md) · Requisitos comunes: [requerimientos-generales/lista-requerimientos.md](requerimientos-generales/lista-requerimientos.md)

**Calendario:** hito 0 = inicio (sin nota) · hito 1 = 20% · hito 2 = 40% · hito 3 = 100% + deploy. Ver [planificacion.md](planificacion.md).

### Entregables

- Aplicación web integrada con API REST
- Migraciones Sequelize y colección Postman
- README con instrucciones locales y **URLs de producción**
- Matriz de avance e informes por hito ([plantillas/](plantillas/))

### Forma de entrega

- **GitHub obligatorio:** tags `entrega-hito-0`, `entrega-hito-1`, `entrega-hito-2`, `entrega-hito-3`
- **ZIP opcional** como respaldo en la plataforma del curso, si el docente lo habilita

### Reglas de elección de tema

1. **Libre por orden de inscripción:** el primer alumno que confirma un número de proyecto se queda con ese tema.
2. **Un alumno por tema** — no se repite el mismo # en la sección.
3. El docente mantiene actualizada la tabla **Disponibilidad** (abajo).
4. Si quedan opciones, evitar temas muy parecidos cuando ya hay uno tomado en el grupo:
   - Clínica: #5 veterinaria vs #16 médica
   - Asientos/cupo: #3 cine, #22 bus, #26 aéreos
   - Gimnasio: #11 canchas vs #19 gestión de gimnasio
   - Comida: #8 cafetería, #10 restaurante, #15 delivery, #23 food truck

### Relación con evaluación API

El requisito **GEN-12** (evolución de esquema) se inspira en los tipos AC/EC/AV/MT de [evaluacion_api_alumnos_parte2_modificaciones_seccion2.md](../evaluacion_api_alumnos_parte2_modificaciones_seccion2.md), aplicado a **tus propias tablas** del proyecto final — no copies tablas del catálogo de 50.

---

## Disponibilidad de proyectos

> Actualizar columna **Estado** y **Alumno** según inscripción.

| # | Título | Estado | Alumno | Requisitos |
|---|--------|--------|--------|------------|
| 1 | Pokédex | Libre | — | [01-pokedex](proyectos/01-pokedex/lista-requerimientos.md) |
| 2 | Recetario | Libre | — | [02-recetario](proyectos/02-recetario/lista-requerimientos.md) |
| 3 | Compra boletos cine | Libre | — | [03-boletos-cine](proyectos/03-boletos-cine/lista-requerimientos.md) |
| 4 | Reserva de hotel | Libre | — | [04-reserva-hotel](proyectos/04-reserva-hotel/lista-requerimientos.md) |
| 5 | Clínica veterinaria | Libre | — | [05-clinica-veterinaria](proyectos/05-clinica-veterinaria/lista-requerimientos.md) |
| 6 | Biblioteca / préstamos | Libre | — | [06-biblioteca](proyectos/06-biblioteca/lista-requerimientos.md) |
| 7 | Tickets de soporte | Libre | — | [07-tickets-soporte](proyectos/07-tickets-soporte/lista-requerimientos.md) |
| 8 | Ventas de cafetería | Libre | — | [08-cafeteria](proyectos/08-cafeteria/lista-requerimientos.md) |
| 9 | Agenda de eventos | Libre | — | [09-agenda-eventos](proyectos/09-agenda-eventos/lista-requerimientos.md) |
| 10 | Sistema para restaurante | Libre | — | [10-restaurante](proyectos/10-restaurante/lista-requerimientos.md) |
| 11 | Reserva de canchas | Libre | — | [11-reserva-canchas](proyectos/11-reserva-canchas/lista-requerimientos.md) |
| 12 | Inscripción a cursos | Libre | — | [12-cursos-talleres](proyectos/12-cursos-talleres/lista-requerimientos.md) |
| 13 | Control de estacionamiento | Libre | — | [13-estacionamiento](proyectos/13-estacionamiento/lista-requerimientos.md) |
| 14 | Farmacia / dispensario | Libre | — | [14-farmacia](proyectos/14-farmacia/lista-requerimientos.md) |
| 15 | Pedidos delivery | Libre | — | [15-delivery](proyectos/15-delivery/lista-requerimientos.md) |
| 16 | Clínica médica | Libre | — | [16-clinica-medica](proyectos/16-clinica-medica/lista-requerimientos.md) |
| 17 | Rent-a-car | Libre | — | [17-rent-a-car](proyectos/17-rent-a-car/lista-requerimientos.md) |
| 18 | Encuestas y evaluaciones | Libre | — | [18-encuestas](proyectos/18-encuestas/lista-requerimientos.md) |
| 19 | Gestión de gimnasio | Libre | — | [19-gimnasio](proyectos/19-gimnasio/lista-requerimientos.md) |
| 20 | Barbería / salón | Libre | — | [20-barberia](proyectos/20-barberia/lista-requerimientos.md) |
| 21 | Lavandería / tintorería | Libre | — | [21-lavanderia](proyectos/21-lavanderia/lista-requerimientos.md) |
| 22 | Pasajes de bus | Libre | — | [22-pasajes-bus](proyectos/22-pasajes-bus/lista-requerimientos.md) |
| 23 | Food truck | Libre | — | [23-food-truck](proyectos/23-food-truck/lista-requerimientos.md) |
| 24 | Ferretería | Libre | — | [24-ferreteria](proyectos/24-ferreteria/lista-requerimientos.md) |
| 25 | Guardería / jardín infantil | Libre | — | [25-guarderia](proyectos/25-guarderia/lista-requerimientos.md) |
| 26 | Venta de pasajes aéreos | Libre | — | [26-pasajes-aereos](proyectos/26-pasajes-aereos/lista-requerimientos.md) |

---

## Resumen por tema

| # | Descripción breve | Entidades orientativas |
|---|-------------------|----------------------|
| 1 | Colección personal de Pokémon; opcional enriquecimiento con API externa | Capturas, tipos |
| 2 | Recetas e ingredientes; menú o lista de compras | Recetas, ingredientes |
| 3 | Películas, funciones, venta de butacas | Películas, funciones, pasajes |
| 4 | Habitaciones y reservas con fechas | Habitaciones, reservas |
| 5 | Mascotas, tutores y turnos veterinarios | Mascotas, citas |
| 6 | Libros y préstamos con devolución | Libros, préstamos |
| 7 | Tickets de soporte y comentarios | Tickets, comentarios |
| 8 | Productos y ventas de mostrador | Productos, ventas |
| 9 | Eventos y calendario | Eventos, categorías |
| 10 | Mesas, menú y comandas | Mesas, comandas |
| 11 | Canchas y reservas por horario | Canchas, reservas |
| 12 | Cursos, cupos e inscripciones | Cursos, inscripciones |
| 13 | Plazas, entradas/salidas y tarifas | Plazas, estacionamientos |
| 14 | Medicamentos, recetas y ventas | Medicamentos, ventas |
| 15 | Locales, pedidos y estados de entrega | Locales, pedidos |
| 16 | Pacientes y turnos médicos | Pacientes, turnos |
| 17 | Vehículos y arriendos por fechas | Vehículos, reservas |
| 18 | Encuestas, preguntas y respuestas | Encuestas, respuestas |
| 19 | Socios, membresías y clases | Socios, clases |
| 20 | Servicios, profesionales y citas | Servicios, citas |
| 21 | Órdenes de lavado y prendas | Órdenes, prendas |
| 22 | Viajes, rutas y pasajes con asiento | Viajes, pasajes |
| 23 | Trucks, ubicación del día y pedidos | Trucks, pedidos |
| 24 | Productos, stock, ventas y cotizaciones | Productos, cotizaciones |
| 25 | Niños, salas, matrícula y asistencia | Niños, registros |
| 26 | Vuelos, clases y reserva de asientos | Vuelos, reservas |
