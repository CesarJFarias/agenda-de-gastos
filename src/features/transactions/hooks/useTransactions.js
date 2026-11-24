import { useState, useEffect, useMemo, useCallback } from 'react';
import { transactionService } from '@/features/transactions/services/transactionService';
import { formatDisplayDate } from '@/shared/utils/formatters';
import { calculateMetrics } from '@/features/dashboard/utils/metrics';

const CLOUD_ERROR =
  'No se pudieron cargar los movimientos desde la nube. Verifica tu conexión o configuración de Supabase.';
const LOCAL_ERROR = 'No se pudieron cargar los movimientos guardados en este navegador.';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isCloudActive = transactionService.isCloudActive;

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setTransactions(await transactionService.getAll());
    } catch (err) {
      console.error('Error cargando movimientos:', err);
      setError(isCloudActive ? CLOUD_ERROR : LOCAL_ERROR);
    } finally {
      setLoading(false);
    }
  }, [isCloudActive]);

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
      setError('Ocurrió un error al guardar el movimiento.');
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

  const metrics = useMemo(() => calculateMetrics(transactions), [transactions]);

  return {
    transactions,
    loading,
    error,
    metrics,
    isCloudActive,
    addTransaction,
    deleteTransaction,
    refresh: fetchTransactions,
  };
}
