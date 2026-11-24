import { DEFAULT_MONTHLY_BUDGET } from '../constants/categories';

const BUDGET_STORAGE_KEY = 'user_monthly_budget';

export const budgetService = {
  getMonthlyBudget() {
    try {
      const saved = localStorage.getItem(BUDGET_STORAGE_KEY);
      const parsed = saved ? Number(saved) : NaN;
      return parsed > 0 ? parsed : DEFAULT_MONTHLY_BUDGET;
    } catch {
      return DEFAULT_MONTHLY_BUDGET;
    }
  },

  saveMonthlyBudget(value) {
    localStorage.setItem(BUDGET_STORAGE_KEY, String(value));
    return value;
  },
};
