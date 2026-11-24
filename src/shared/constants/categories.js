export const TRANSACTION_TYPES = {
  INCOME: 'ingreso',
  EXPENSE: 'gasto',
};

export const TRANSACTION_CATEGORIES = [
  { value: 'General', label: 'General', icon: 'payments' },
  { value: 'Sueldo/Trabajo', label: 'Sueldo / Trabajo', icon: 'work' },
  { value: 'Ocio', label: 'Ocio & Entretenimiento', icon: 'movie' },
  { value: 'Alimentación', label: 'Alimentación', icon: 'restaurant' },
  { value: 'Servicios', label: 'Servicios Básicos', icon: 'receipt_long' },
  { value: 'Vivienda', label: 'Vivienda', icon: 'home' },
  { value: 'Transporte', label: 'Transporte', icon: 'directions_car' },
  { value: 'Inversiones', label: 'Inversiones', icon: 'trending_up' },
  { value: 'Salud', label: 'Salud', icon: 'medical_services' },
];

export const FILTER_OPTIONS = [
  { id: 'all', label: 'Todos' },
  { id: TRANSACTION_TYPES.INCOME, label: 'Ingresos' },
  { id: TRANSACTION_TYPES.EXPENSE, label: 'Gastos' },
];

export const DEFAULT_MONTHLY_BUDGET = 350000;

export const getCategoryIcon = (category, type) => {
  const found = TRANSACTION_CATEGORIES.find((c) => c.value === category);
  if (found) return found.icon;
  return type === TRANSACTION_TYPES.INCOME ? 'payments' : 'receipt_long';
};
