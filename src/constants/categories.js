export const TRANSACTION_TYPES = [
  { value: 'ingreso', label: 'Ingreso', icon: 'arrow_upward' },
  { value: 'gasto', label: 'Gasto', icon: 'arrow_downward' },
];

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
  { id: 'ingreso', label: 'Ingresos' },
  { id: 'gasto', label: 'Gastos' },
];
