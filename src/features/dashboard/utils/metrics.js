import { TRANSACTION_TYPES } from '@/shared/constants/categories';

export const calculateMetrics = (transactions) => {
  const incomeItems = transactions.filter((t) => t.type === TRANSACTION_TYPES.INCOME);
  const expenseItems = transactions.filter((t) => t.type === TRANSACTION_TYPES.EXPENSE);

  const income = incomeItems.reduce((acc, t) => acc + Number(t.amount), 0);
  const expense = expenseItems.reduce((acc, t) => acc + Number(t.amount), 0);
  const balance = income - expense;

  const savingsRate =
    income > 0 ? Math.max(0, Math.min(100, ((income - expense) / income) * 100)) : 0;
  const expenseRatio =
    income > 0 ? Math.min(100, (expense / income) * 100) : expense > 0 ? 100 : 0;

  const categoryTotals = {};
  transactions.forEach((t) => {
    const key = `${t.type}_${t.category}`;
    if (!categoryTotals[key]) {
      categoryTotals[key] = { type: t.type, category: t.category, amount: 0, count: 0 };
    }
    categoryTotals[key].amount += Number(t.amount);
    categoryTotals[key].count += 1;
  });

  return {
    income,
    expense,
    balance,
    incomeCount: incomeItems.length,
    expenseCount: expenseItems.length,
    savingsRate,
    expenseRatio,
    categoryList: Object.values(categoryTotals),
  };
};
