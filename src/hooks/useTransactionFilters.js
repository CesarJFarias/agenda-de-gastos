import { useState, useMemo } from 'react';

export function useTransactionFilters(transactions) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredTransactions,
  };
}
