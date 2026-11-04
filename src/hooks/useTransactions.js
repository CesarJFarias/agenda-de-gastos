import { useState, useEffect, useMemo, useCallback } from 'react';
import { transactionService } from '../services/transactionService';
import { formatDisplayDate } from '../utils/formatters';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      console.error('Error cargando movimientos:', err);
      setError(
        'No se pudieron cargar los movimientos desde la nube. Verifica tu conexión o configuración de Supabase.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async ({ type, description, amount, category, date }) => {
    const cleanDesc = description.trim();
    const numericAmount = parseFloat(amount);

    if (!cleanDesc || isNaN(numericAmount) || numericAmount <= 0) {
      return false;
    }

    const payload = {
      type,
      description: cleanDesc,
      amount: numericAmount,
      category: category || 'General',
      date: formatDisplayDate(date),
    };

    try {
      setError(null);
      const created = await transactionService.create(payload);
      setTransactions((prev) => [created, ...prev]);
      return true;
    } catch (err) {
      console.error('Error al guardar movimiento:', err);
      setError('Ocurrió un error al guardar el movimiento en la base de datos.');
      return false;
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm('¿Deseas eliminar este registro de tus movimientos?')) return;

    try {
      setError(null);
      await transactionService.remove(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error al eliminar movimiento:', err);
      setError('No se pudo eliminar el registro.');
    }
  };

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return transactions.filter((t) => {
      const matchesType = filter === 'all' || t.type === filter;
      const desc = String(t.description || '').toLowerCase();
      const cat = String(t.category || '').toLowerCase();
      const matchesQuery = !query || desc.includes(query) || cat.includes(query);
      return matchesType && matchesQuery;
    });
  }, [transactions, filter, searchQuery]);

  const metrics = useMemo(() => {
    const incomeItems = transactions.filter((t) => t.type === 'ingreso');
    const expenseItems = transactions.filter((t) => t.type === 'gasto');

    const income = incomeItems.reduce((acc, t) => acc + Number(t.amount), 0);
    const expense = expenseItems.reduce((acc, t) => acc + Number(t.amount), 0);
    const balance = income - expense;

    const savingsRate =
      income > 0 ? Math.max(0, Math.min(100, ((income - expense) / income) * 100)) : 0;
    const expenseRatio =
      income > 0 ? Math.min(100, (expense / income) * 100) : expense > 0 ? 100 : 0;

    // Agrupación por categorías
    const categoryTotals = {};
    transactions.forEach((t) => {
      const key = `${t.type}_${t.category}`;
      if (!categoryTotals[key]) {
        categoryTotals[key] = {
          type: t.type,
          category: t.category,
          amount: 0,
          count: 0,
        };
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
  }, [transactions]);

  return {
    transactions,
    filteredTransactions,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    metrics,
    isCloudActive: transactionService.isCloudActive,
    addTransaction,
    deleteTransaction,
    refresh: fetchTransactions,
  };
}
