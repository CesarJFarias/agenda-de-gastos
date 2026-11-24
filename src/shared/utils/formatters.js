export const formatMoney = (amount) => {
  const numeric = Number(amount) || 0;
  const formatted = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(numeric));

  return `ARS ${formatted}`;
};

export const getTodayISODate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

export const getCurrentMonthYear = () => {
  const now = new Date();
  const month = now.toLocaleDateString('es-ES', { month: 'long' });
  const capitalized = month.charAt(0).toUpperCase() + month.slice(1);
  return `${capitalized} ${now.getFullYear()}`;
};

const escapeCsv = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

export const exportTransactionsToCSV = (transactions) => {
  if (!transactions.length) return;

  const header = ['ID', 'Tipo', 'Descripcion', 'Monto', 'Categoria', 'Fecha'];
  const rows = transactions.map((t) =>
    [
      t.id,
      escapeCsv(t.type),
      escapeCsv(t.description),
      t.amount,
      escapeCsv(t.category),
      escapeCsv(t.date),
    ].join(',')
  );
  const csv = [header.join(','), ...rows].join('\n') + '\n';

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `finanzas_reporte_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
};
