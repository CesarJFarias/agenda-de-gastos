import React from 'react';
import { formatMoney } from '../../utils/formatters';

export function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === 'ingreso';

  return (
    <div className="py-3.5 flex items-center justify-between hover:bg-slate-50 transition px-2 rounded-xl">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isIncome
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-rose-100 text-rose-600'
          }`}
        >
          <i
            className={`fa-solid ${
              isIncome ? 'fa-arrow-up' : 'fa-arrow-down'
            } text-sm`}
          ></i>
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm sm:text-base">
            {transaction.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
              {transaction.category}
            </span>
            <span>•</span>
            <span>{transaction.date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`font-bold text-sm sm:text-base ${
            isIncome ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {isIncome ? '+' : '-'}
          {formatMoney(transaction.amount)}
        </span>
        <button
          onClick={() => onDelete(transaction.id)}
          className="text-slate-300 hover:text-rose-500 transition p-1"
          title="Eliminar"
        >
          <i className="fa-solid fa-trash-can text-sm"></i>
        </button>
      </div>
    </div>
  );
}

