import { useState, useEffect, useMemo, useCallback } from 'react';
import { transactionService } from '../services/transactionService';
import { getFormattedToday } from '../utils/formatters';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('todos');
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

  const addTransaction = async ({ type, description, amount, category }) => {
    const cleanDesc = description.trim();
    const numericAmount = parseFloat(amount);

    if (!cleanDesc || isNaN(numericAmount) || numericAmount <= 0) {
      return false;
    }

    const payload = {
      type,
      description: cleanDesc,
      amount: numericAmount,
      category,
      date: getFormattedToday(),
    };

    try {
      setError(null);
      const created = await transactionService.create(payload);
      setTransactions((prev) => [created, ...prev]);
      return true;
    } catch (err) {
      console.error('Error al guardar movimiento:', err);
      setError('Ocurrió un error al guardar el movimiento.');
      return false;
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm('¿Deseas eliminar este registro?')) return;

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
    if (filter === 'todos') return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  const metrics = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'ingreso')
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === 'gasto')
      .reduce((acc, t) => acc + Number(t.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  return {
    transactions,
    filteredTransactions,
    filter,
    setFilter,
    loading,
    error,
    metrics,
    isCloudActive: transactionService.isCloudActive,
    addTransaction,
    deleteTransaction,
    refresh: fetchTransactions,
  };
}

