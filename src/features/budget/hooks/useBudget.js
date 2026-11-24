import { useState, useCallback } from 'react';
import { budgetService } from '@/features/budget/services/budgetService';

export function useBudget() {
  const [monthlyBudget, setMonthlyBudget] = useState(() => budgetService.getMonthlyBudget());

  const updateBudget = useCallback((value) => {
    const numeric = parseFloat(value);
    if (isNaN(numeric) || numeric <= 0) return false;
    setMonthlyBudget(budgetService.saveMonthlyBudget(numeric));
    return true;
  }, []);

  return { monthlyBudget, updateBudget };
}
