import { describe, expect, it } from 'vitest';
import { calculateMetrics } from './metrics';

const sample = [
  { type: 'ingreso', category: 'Sueldo/Trabajo', amount: 1000 },
  { type: 'gasto', category: 'Alimentación', amount: 250 },
  { type: 'gasto', category: 'Alimentación', amount: 150 },
];

describe('calculateMetrics', () => {
  it('calcula totales, balance y cantidades', () => {
    const m = calculateMetrics(sample);
    expect(m.income).toBe(1000);
    expect(m.expense).toBe(400);
    expect(m.balance).toBe(600);
    expect(m.incomeCount).toBe(1);
    expect(m.expenseCount).toBe(2);
  });

  it('calcula tasa de ahorro y ratio de gasto', () => {
    const m = calculateMetrics(sample);
    expect(m.savingsRate).toBeCloseTo(60);
    expect(m.expenseRatio).toBeCloseTo(40);
  });

  it('agrupa por tipo y categoría', () => {
    const m = calculateMetrics(sample);
    const food = m.categoryList.find((c) => c.category === 'Alimentación');
    expect(food).toEqual({ type: 'gasto', category: 'Alimentación', amount: 400, count: 2 });
  });

  it('no divide por cero sin ingresos', () => {
    const m = calculateMetrics([{ type: 'gasto', category: 'General', amount: 50 }]);
    expect(m.savingsRate).toBe(0);
    expect(m.expenseRatio).toBe(100);
  });

  it('devuelve ceros con lista vacía', () => {
    const m = calculateMetrics([]);
    expect(m).toMatchObject({ income: 0, expense: 0, balance: 0, categoryList: [] });
  });
});
