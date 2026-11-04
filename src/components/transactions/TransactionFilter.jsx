import React from 'react';
import { FILTER_OPTIONS } from '../../constants/categories';

export function TransactionFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
      {FILTER_OPTIONS.map((option) => {
        const isActive = currentFilter === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onFilterChange(option.id)}
            className={`px-3 py-1.5 rounded-lg transition ${
              isActive
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

