import React from 'react';
import { Header } from '../components/layout/Header';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { TransactionList } from '../components/transactions/TransactionList';
import { useTransactions } from '../hooks/useTransactions';
import { exportTransactionsToCSV } from '../utils/formatters';

export function Dashboard() {
  const {
    transactions,
    filteredTransactions,
    filter,
    setFilter,
    loading,
    error,
    metrics,
    isCloudActive,
    addTransaction,
    deleteTransaction,
  } = useTransactions();

  return (
    <div className="min-h-screen pb-12">
      <Header
        onExportCSV={() => exportTransactionsToCSV(transactions)}
        isCloudActive={isCloudActive}
      />

      <main className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        <SummaryCards metrics={metrics} />

        <TransactionForm onAdd={addTransaction} />

        <TransactionList
          transactions={filteredTransactions}
          loading={loading}
          currentFilter={filter}
          onFilterChange={setFilter}
          onDelete={deleteTransaction}
        />
      </main>
    </div>
  );
}

