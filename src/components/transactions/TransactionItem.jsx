import React from 'react';
import { formatMoney, getCategoryIcon } from '../../utils/formatters';

export function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === 'ingreso';
  const iconName = getCategoryIcon(transaction.category, transaction.type);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-4 sm:py-3.5 rounded-xl bg-surface-container-low/30 hover:bg-surface-container-low transition-all gap-2.5 sm:gap-4 group">
      {/* Fila principal en Móvil / Lado Izquierdo en Desktop */}
      <div className="flex items-center justify-between sm:justify-start gap-3 min-w-0 flex-1">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Icono de Categoría */}
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isIncome
                ? 'bg-secondary-fixed/50 text-secondary'
                : 'bg-tertiary-fixed/60 text-tertiary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
              {iconName}
            </span>
          </div>

          {/* Descripción y Metadatos Desktop */}
          <div className="flex flex-col min-w-0 flex-1">
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

            {/* Metadatos visibles en Desktop (>= sm) */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-on-surface-variant mt-0.5">
              <span className="material-symbols-outlined text-[14px]">event</span>
              <span>{transaction.date}</span>
              <span className="text-outline-variant">•</span>
              <span>{isIncome ? 'Ingreso acreditado' : 'Gasto registrado'}</span>
            </div>
          </div>
        </div>

        {/* Monto visible en la fila superior solo en Móvil (< sm) */}
        <div className="sm:hidden text-right shrink-0">
          <span
            className={`text-sm font-bold tracking-tight block ${
              isIncome ? 'text-secondary' : 'text-tertiary'
            }`}
          >
            {isIncome ? '+' : '-'}
            {formatMoney(transaction.amount)}
          </span>
        </div>
      </div>

      {/* Sub-fila exclusiva para Móvil: Categoría + Fecha + Botón Eliminar */}
      <div className="flex sm:hidden items-center justify-between pt-1.5 border-t border-surface-container-high/40 pl-12">
        <div className="flex items-center gap-2 text-[11px] text-on-surface-variant flex-wrap">
          <span
            className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
              isIncome
                ? 'bg-secondary-container/50 text-on-secondary-container'
                : 'bg-tertiary-fixed text-on-tertiary-fixed'
            }`}
          >
            {transaction.category}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">event</span>
            <span>{transaction.date}</span>
          </span>
        </div>

        <button
          onClick={() => onDelete(transaction.id)}
          type="button"
          className="p-1 rounded-lg text-on-surface-variant/40 hover:text-error hover:bg-error-container/50 transition-colors"
          title="Eliminar registro"
        >
          <span className="material-symbols-outlined text-[16px]">delete</span>
        </button>
      </div>

      {/* Bloque Derecho exclusivo para Desktop (>= sm): Monto y Botón Eliminar */}
      <div className="hidden sm:flex items-center gap-4 shrink-0 pl-3">
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
            className={`text-[11px] font-medium block ${
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
