import React from 'react';
import { TransactionFilter } from './TransactionFilter';
import { TransactionItem } from './TransactionItem';

export function TransactionList({
  transactions,
  loading,
  currentFilter,
  onFilterChange,
  onDelete,
}) {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="fa-solid fa-list-ul text-slate-600"></i>
          <span>Historial</span>
        </h2>

        <TransactionFilter
          currentFilter={currentFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <i className="fa-solid fa-circle-notch fa-spin text-2xl mb-3 text-indigo-500"></i>
          <p className="text-sm">Cargando movimientos...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <i className="fa-solid fa-receipt text-4xl mb-3 text-slate-300"></i>
          <p className="text-sm">No hay movimientos registrados.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {transactions.map((t) => (
            <TransactionItem
              key={t.id}
              transaction={t}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

