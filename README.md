# Control de Finanzas Personales

Aplicación web para la gestión, registro y monitoreo en tiempo real de ingresos, egresos y balance financiero personal. El sistema implementa una arquitectura modular desacoplada orientada a la mantenibilidad y escalabilidad, conectada a una base de datos relacional en la nube con soporte de contingencia local.

---

## 1. Stack Tecnológico

El proyecto utiliza tecnologías modernas optimizadas para rendimiento, seguridad y experiencia de usuario:

### Frontend

- **React 18**: Biblioteca base orientada a componentes modulares, hooks personalizados y renderizado declarativo.
- **Vite 6**: Herramienta de compilación y empaquetado de alta velocidad para entornos modernos de JavaScript.
- **Tailwind CSS 3**: Framework de diseño utilitario para interfaces consistentes, responsivas y accesibles.
- **Material Symbols (Google Fonts)**: Sistema iconográfico para categorización visual de transacciones.

### Backend y Persistencia

- **Supabase (PostgreSQL 15+)**: Plataforma de base de datos relacional administrada con soporte para operaciones CRUD seguras.
- **Row Level Security (RLS)**: Políticas de seguridad a nivel de fila configuradas en el motor PostgreSQL para el control de acceso a datos.
- **Capa de Abstracción de Datos (Data Service Layer)**: Patrón de diseño que desacopla la lógica de negocio de la fuente de persistencia, conmutando dinámicamente entre la nube y almacenamiento local de contingencia (`LocalStorage`).

### Infraestructura y Despliegue

- **Vercel**: Plataforma de alojamiento en el borde (Edge Network) con integración continua y despliegue automático desde el repositorio.

---

## 2. Arquitectura y Funcionamiento del Sistema

La solución adopta una separación clara de responsabilidades:

```text
├── .github/workflows/    # CI: ping periódico a Supabase (keep-alive)
├── src/
│   ├── features/         # Módulos por funcionalidad (cada uno con sus componentes, hooks y servicios)
│   │   ├── budget/       # Presupuesto mensual
│   │   ├── dashboard/    # Métricas y gráficos de resumen
│   │   └── transactions/ # Alta, listado, filtros y persistencia de movimientos
│   ├── pages/            # Vistas principales que componen las features
│   ├── shared/           # Código reutilizable entre features
│   │   ├── components/   # Layout (encabezado y pie)
│   │   ├── constants/    # Categorías y tipos de movimiento
│   │   ├── lib/          # Cliente de Supabase
│   │   └── utils/        # Formateo de moneda y fechas, exportación CSV
│   ├── App.jsx           # Raíz de la aplicación
│   └── main.jsx          # Punto de entrada de React
├── supabase/             # Esquema SQL de la base de datos
├── .env.example          # Variables de entorno necesarias (copiar a .env)
└── vercel.json           # Reglas de reescritura para producción
```

### Flujo de Datos

1. **Captura y Validación**: Los formularios capturan montos numéricos estrictamente positivos, clasificaciones contables predefinidas y descripciones sanitizadas.
2. **Procesamiento de Métricas**: El hook centralizador calcula de manera reactiva el balance acumulado, total de ingresos y total de egresos en memoria, evitando lecturas redundantes a la base de datos.
3. **Persistencia Híbrida**: Las peticiones de lectura, escritura y eliminación se canalizan a través del servicio de transacciones. Si la conexión a Supabase se encuentra activa, las operaciones se sincronizan con PostgreSQL; en caso de falta de conectividad o ausencia de configuración remota, el sistema opera de manera ininterrumpida mediante persistencia local del cliente.
4. **Exportación de Datos**: Mecanismo de generación dinámica de reportes en formato CSV estándar codificado en UTF-8 para auditoría y análisis en hojas de cálculo externas.

---

## 3. Seguridad e Integridad

- Las credenciales sensibles de administración (`service_role`) se encuentran estrictamente excluidas de la aplicación cliente.
- La comunicación con la base de datos se realiza a través de la clave pública anonimizada (`anon key`), sujeta a políticas RLS activas en PostgreSQL.
- El repositorio mantiene exclusión estricta de variables de entorno mediante `.gitignore`.

---

## 4. Hoja de Ruta y Próximas Mejoras (Roadmap)

El diseño actual prevé la integración incremental de los siguientes módulos:

- **Módulo de Autenticación de Usuarios**: Implementación de Supabase Auth (correo/contraseña y proveedores OAuth) con aislamiento estricto de transacciones por `user_id`.
- **Visualización Gráfica Avanzada**: Integración de gráficos de barras y sectores (Recharts / Chart.js) para análisis de distribución de gastos por categoría y tendencias temporales.
- **Presupuestos y Alertas**: Configuración de topes de gasto mensuales con indicadores de alerta temprana.
- **Soporte Multi-moneda**: Conversión y visualización en diferentes divisas con soporte de cotizaciones de referencia.
