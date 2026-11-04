/**
 * Formatea un número a moneda en Pesos Argentinos (ARS X.XXX,XX).
 */
export const formatMoney = (amount) => {
  const numeric = Number(amount) || 0;
  const formatted = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(numeric));

  return `ARS ${formatted}`;
};

/**
 * Obtiene la fecha actual en formato ISO (YYYY-MM-DD).
 */
export const getTodayISODate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formatea una fecha ISO (YYYY-MM-DD) a formato legible en español (ej: "03 nov 2026").
 */
export const formatDisplayDate = (isoOrTextDate) => {
  if (!isoOrTextDate) return '';
  if (isoOrTextDate.includes('-') && isoOrTextDate.length === 10) {
    const [y, m, d] = isoOrTextDate.split('-');
    const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
    return dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
  return isoOrTextDate;
};

/**
 * Obtiene el nombre del mes y año actual (ej: "Noviembre 2026").
 */
export const getCurrentMonthYear = () => {
  const now = new Date();
  const month = now.toLocaleDateString('es-ES', { month: 'long' });
  const capitalized = month.charAt(0).toUpperCase() + month.slice(1);
  return `${capitalized} ${now.getFullYear()}`;
};

/**
 * Devuelve el icono de Material Symbols según la categoría y tipo.
 */
export const getCategoryIcon = (category, type) => {
  const map = {
    'Sueldo/Trabajo': 'work',
    'Ocio': 'movie',
    'Ocio & Entretenimiento': 'movie',
    'Alimentación': 'restaurant',
    'Servicios': 'receipt_long',
    'Servicios Básicos': 'receipt_long',
    'Vivienda': 'home',
    'Transporte': 'directions_car',
    'Inversiones': 'trending_up',
    'Salud': 'medical_services',
    'General': type === 'ingreso' ? 'payments' : 'receipt',
  };
  return map[category] || (type === 'ingreso' ? 'payments' : 'receipt_long');
};

/**
 * Exporta un arreglo de transacciones a un archivo CSV descargable.
 */
export const exportTransactionsToCSV = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert('No hay movimientos registrados para exportar.');
    return;
  }

  let csv = 'ID,Tipo,Descripcion,Monto,Categoria,Fecha\n';
  transactions.forEach((t) => {
    const cleanDesc = String(t.description || '').replace(/"/g, '""');
    csv += `${t.id},"${t.type}","${cleanDesc}",${t.amount},"${t.category}","${t.date}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `finanzas_reporte_${new Date().toISOString().slice(0, 10)}.csv`
  );
  link.click();
  URL.revokeObjectURL(link);
};
