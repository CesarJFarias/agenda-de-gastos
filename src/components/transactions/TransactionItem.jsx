import React from 'react';
import { formatMoney, getCategoryIcon } from '../../utils/formatters';

export function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === 'ingreso';
  const iconName = getCategoryIcon(transaction.category, transaction.type);

  return (
    <div className="flex items-center justify-between p-3.5 sm:px-4 sm:py-3.5 rounded-xl bg-surface-container-low/30 hover:bg-surface-container-low transition-all group">
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Icon Indicator */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isIncome
              ? 'bg-secondary-fixed/50 text-secondary'
              : 'bg-tertiary-fixed/60 text-tertiary'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">{iconName}</span>
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base text-on-surface truncate">
              {transaction.description}
            </span>
            <span
              className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                isIncome
                  ? 'bg-secondary-container/50 text-on-secondary-container'
                  : 'bg-tertiary-fixed text-on-tertiary-fixed'
              }`}
            >
              {transaction.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5">
            <span
              className={`sm:hidden text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                isIncome
                  ? 'bg-secondary-container/50 text-on-secondary-container'
                  : 'bg-tertiary-fixed text-on-tertiary-fixed'
              }`}
            >
              {transaction.category}
            </span>
            <span className="material-symbols-outlined text-[14px]">event</span>
            <span>{transaction.date}</span>
            <span className="text-outline-variant">•</span>
            <span>{isIncome ? 'Ingreso acreditado' : 'Gasto registrado'}</span>
          </div>
        </div>
      </div>

      {/* Amount & Inline Delete Action */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-3">
        <div className="text-right">
          <span
            className={`text-sm sm:text-base font-bold tracking-tight block ${
              isIncome ? 'text-secondary' : 'text-tertiary'
            }`}
          >
            {isIncome ? '+' : '-'}
            {formatMoney(transaction.amount)}
          </span>
          <span
            className={`text-[11px] font-medium hidden sm:block ${
              isIncome ? 'text-secondary' : 'text-tertiary'
            }`}
          >
            {isIncome ? 'Ingreso acreditado' : 'Gasto registrado'}
          </span>
        </div>

        <button
          onClick={() => onDelete(transaction.id)}
          type="button"
          className="p-1.5 rounded-lg text-on-surface-variant/40 hover:text-error hover:bg-error-container/50 transition-colors cursor-pointer"
          title="Eliminar registro"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  );
}
