import { describe, expect, it } from 'vitest';
import { formatDisplayDate, formatMoney, getTodayISODate } from './formatters';
import { getCategoryIcon } from '@/shared/constants/categories';

describe('formatMoney', () => {
  it('formatea en pesos argentinos con dos decimales', () => {
    expect(formatMoney(1234.5)).toBe('ARS 1.234,50');
  });

  it('usa valor absoluto y cero para entradas inválidas', () => {
    expect(formatMoney(-100)).toBe('ARS 100,00');
    expect(formatMoney('no es número')).toBe('ARS 0,00');
  });
});

describe('getTodayISODate', () => {
  it('devuelve la fecha local en formato YYYY-MM-DD', () => {
    expect(getTodayISODate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('formatDisplayDate', () => {
  it('devuelve vacío si no hay fecha', () => {
    expect(formatDisplayDate('')).toBe('');
  });

  it('devuelve el texto tal cual si no es ISO', () => {
    expect(formatDisplayDate('03 nov 2026')).toBe('03 nov 2026');
  });

  it('convierte una fecha ISO a texto legible', () => {
    expect(formatDisplayDate('2026-11-03')).toMatch(/2026/);
  });
});

describe('getCategoryIcon', () => {
  it('devuelve el icono de la categoría conocida', () => {
    expect(getCategoryIcon('Transporte', 'gasto')).toBe('directions_car');
  });

  it('usa un icono por defecto según el tipo cuando la categoría no existe', () => {
    expect(getCategoryIcon('Inexistente', 'ingreso')).toBe('payments');
    expect(getCategoryIcon('Inexistente', 'gasto')).toBe('receipt_long');
  });
});
