import { supabase, isSupabaseConfigured } from '../config/supabase';

const LOCAL_STORAGE_KEY = 'finances_data';

const getLocalTransactions = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Error leyendo LocalStorage:', error);
    return [];
  }
};

const saveLocalTransactions = (transactions) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error guardando en LocalStorage:', error);
  }
};

/**
 * Capa de servicio para gestionar transacciones.
 * Si Supabase está configurado en `.env`, sincroniza con la base de datos en la nube.
 * De lo contrario, funciona de manera transparente usando LocalStorage.
 */
export const transactionService = {
  isCloudActive: isSupabaseConfigured,

  async getAll() {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map((item) => ({
        ...item,
        amount: Number(item.amount),
      }));
    }

    return getLocalTransactions();
  },

  async create(transactionData) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transactionData])
        .select()
        .single();

      if (error) throw error;
      return {
        ...data,
        amount: Number(data.amount),
      };
    }

    const newTx = {
      id: Date.now(),
      ...transactionData,
      created_at: new Date().toISOString(),
    };
    const current = getLocalTransactions();
    const updated = [newTx, ...current];
    saveLocalTransactions(updated);
    return newTx;
  },

  async remove(id) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    }

    const current = getLocalTransactions();
    const updated = current.filter((t) => t.id !== id);
    saveLocalTransactions(updated);
    return true;
  },
};

