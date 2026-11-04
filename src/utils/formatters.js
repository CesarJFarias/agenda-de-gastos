/**
 * Formatea un número a moneda (USD con formato regional).
 */
export const formatMoney = (amount) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Obtiene la fecha actual formateada en español (ej: "03 nov 2026").
 */
export const getFormattedToday = () => {
  const now = new Date();
  return now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Exporta un arreglo de transacciones a un archivo CSV descargable.
 */
export const exportTransactionsToCSV = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert('No hay datos para exportar.');
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
    `mis_finanzas_${new Date().toISOString().slice(0, 10)}.csv`
  );
  link.click();
  URL.revokeObjectURL(url);
};

