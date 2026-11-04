# 💰 Control de Finanzas Personales

Aplicación web moderna para el control de ingresos, gastos y balance en tiempo real, estructurada con **React + Vite + Tailwind CSS** y preparada para sincronizar datos en la nube con **Supabase (PostgreSQL)**.

---

## 📂 Estructura Escalable del Proyecto

```text
├── supabase/
│   └── schema.sql                 # Script SQL para crear la tabla en Supabase
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── SummaryCards.jsx   # Tarjetas de Balance, Ingresos y Gastos
│   │   ├── layout/
│   │   │   └── Header.jsx         # Barra superior con estado de conexión y exportar CSV
│   │   └── transactions/
│   │       ├── TransactionFilter.jsx # Filtros (Todos, Ingresos, Gastos)
│   │       ├── TransactionForm.jsx   # Formulario de registro de movimientos
│   │       ├── TransactionItem.jsx   # Fila individual de movimiento
│   │       └── TransactionList.jsx   # Lista de movimientos con estados de carga y vacío
│   ├── config/
│   │   └── supabase.js            # Inicialización del cliente de Supabase
│   ├── constants/
│   │   └── categories.js          # Categorías y tipos centralizados
│   ├── hooks/
│   │   └── useTransactions.js     # Lógica de estado y métricas financieras
│   ├── pages/
│   │   └── Dashboard.jsx          # Vista principal del panel financiero
│   ├── services/
│   │   └── transactionService.js  # Capa de datos híbrida (Supabase Cloud + respaldo LocalStorage)
│   ├── utils/
│   │   └── formatters.js          # Formateo de moneda, fechas y exportación CSV
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example                   # Plantilla de variables de entorno
├── vercel.json                    # Configuración lista para desplegar en Vercel
└── package.json
```

---

## 🚀 Cómo ejecutar en tu computadora

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   > **Nota:** Si aún no has configurado tus credenciales de Supabase en `.env`, la aplicación funcionará automáticamente en **Modo Local** (`LocalStorage`) sin errores.

---

## ☁️ Cómo conectar la Base de Datos en la Nube (Supabase)

1. Crea una cuenta gratuita y un proyecto en [supabase.com](https://supabase.com/).
2. En el menú lateral de Supabase, entra a **SQL Editor**, pega el contenido del archivo [`supabase/schema.sql`](./supabase/schema.sql) y presiona **Run**.
3. Ve a **Project Settings → API** y copia tu **Project URL** y tu clave **anon / public**.
4. Duplica el archivo `.env.example`, renómbralo a `.env` y pega tus datos:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```
5. Reinicia `npm run dev` y verás que el indicador del encabezado cambia a **Nube (Supabase)**.

---

## 🌐 Cómo subir el proyecto a un Host en Línea (Vercel / Netlify)

1. Sube este repositorio a **GitHub**.
2. Entra a [Vercel](https://vercel.com/) o [Netlify](https://www.netlify.com/) e importa tu repositorio de GitHub.
3. En la sección **Environment Variables** del host, agrega:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Haz clic en **Deploy**. El comando de compilación (`npm run build`) y el directorio de salida (`dist`) se detectarán automáticamente.

