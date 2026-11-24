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

const isCloud = () => isSupabaseConfigured && Boolean(supabase);

export const transactionService = {
  isCloudActive: isSupabaseConfigured,

  async getAll() {
    if (isCloud()) {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map((item) => ({ ...item, amount: Number(item.amount) }));
    }

    return getLocalTransactions();
  },

  async create(transactionData) {
    if (isCloud()) {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transactionData])
        .select()
        .single();

      if (error) throw error;
      return { ...data, amount: Number(data.amount) };
    }

    const newTx = {
      id: Date.now(),
      ...transactionData,
      created_at: new Date().toISOString(),
    };
    saveLocalTransactions([newTx, ...getLocalTransactions()]);
    return newTx;
  },

  async remove(id) {
    if (isCloud()) {
      const { error } = await supabase.from('transactions').delete().eq('id', id);
      if (error) throw error;
      return true;
    }

    saveLocalTransactions(getLocalTransactions().filter((t) => t.id !== id));
    return true;
  },
};
