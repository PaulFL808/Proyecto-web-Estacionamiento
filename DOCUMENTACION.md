# Proyecto: Control de Estacionamiento

## Finalidad del Proyecto
El sistema "Control de Estacionamiento" es una aplicación web integral diseñada para administrar de manera eficiente las operaciones diarias de un recinto de estacionamientos. Su principal objetivo es reemplazar procesos manuales (como el uso de libretas o planillas de cálculo) por una plataforma centralizada que permita hacer seguimiento en tiempo real de la disponibilidad de las plazas, registrar la entrada y salida de vehículos, y calcular automáticamente las tarifas a cobrar.

##Funcionalidades Principales

### 1. Autenticación y Seguridad
- **Registro y Login:** El sistema requiere que los operadores se registren e inicien sesión de forma segura utilizando JSON Web Tokens (JWT).
- **Recuperación de Contraseña:** Los usuarios pueden solicitar un cambio de contraseña en caso de olvido mediante la generación de un token temporal.
- **Rutas Protegidas:** Solo el personal autorizado (usuarios logueados) puede acceder al panel principal, modificar plazas o registrar vehículos.

### 2. Gestión de Plazas (CRUD)
- **Creación y Edición:** Permite registrar nuevos espacios de estacionamiento definiendo su código, piso, sector (ej. VIP, Subterráneo 1), tarifa por hora y tipo de plaza (Normal, Accesible, Eléctrica, Moto).
- **Control de Estado:** Visualización inmediata del estado de cada plaza (Disponible, Ocupada, en Mantención o Reservada).
- **Filtros Inteligentes:** Búsqueda rápida de plazas por código, sector o disponibilidad a través de la barra superior.

### 3. Control de Ingresos y Salidas (Flujo Transaccional)
- **Registro de Entrada:** El operador asigna rápidamente una plaza disponible a un vehículo ingresando la patente, el tipo de vehículo y, opcionalmente, el nombre del conductor.
- **Cierre de Ciclo (Salida):** Al momento de que el vehículo se retira, el sistema calcula automáticamente el total a pagar basándose en la tarifa por hora de la plaza ocupada y el tiempo exacto que duró la estadía.
- **Cancelaciones:** En caso de error, los ingresos pueden ser anulados para liberar la plaza y mantener la coherencia de los datos.

### 4. Panel de Control y Reportes (Dashboard)
- **Estadísticas en Tiempo Real:** El panel principal (Dashboard) muestra métricas clave como el total de plazas, cuántas están disponibles, cuántas ocupadas, la cantidad de vehículos activos y los ingresos totales recaudados.
- **Ocupación por Zona:** Gráficos de barras horizontales que indican de un simple vistazo qué tan lleno está cada sector del estacionamiento (ej. Norte al 80%, VIP al 20%).

## Arquitectura y Tecnologías
La aplicación está construida sobre una arquitectura moderna basada en el "Stack PERN/MERN":
- **Frontend (Cliente):** Desarrollado con **React** y **Vite**, utilizando CSS puro (Responsive Design) para las interfaces y *Lucide React* para la iconografía gráfica. Está alojado en **Netlify**.
- **Backend (Servidor):** API RESTful desarrollada con **Node.js** y **Express.js**, encargada de procesar las reglas de negocio, validaciones y la autenticación. Alojado en **Railway**.
- **Base de Datos:** Motor relacional gestionado a través del ORM **Sequelize**. Operando en un servidor de producción **PostgreSQL / MySQL** en Railway.
