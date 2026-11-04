import React from 'react';
import { TransactionItem } from './TransactionItem';
import { FILTER_OPTIONS } from '../../constants/categories';

export function TransactionList({
  transactions,
  loading,
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onDelete,
  onExportCSV,
  isCloudActive,
}) {
  return (
    <section
      id="seccion-historial"
      className="flex flex-col p-4 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm gap-5 sm:gap-6"
    >
      {/* Table Header & Controls Bar */}
      <div className="flex flex-col gap-4 pb-3 sm:pb-4 border-b border-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">
              history
            </span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
              Historial de Movimientos
            </h2>
            <p className="text-xs text-on-surface-variant">
              Registro cronológico de entradas y salidas procesadas
            </p>
          </div>
        </div>

        {/* Search + Segmented Tabs (Responsive Stack on Mobile) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative flex items-center w-full sm:max-w-xs">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por concepto o categoría..."
              className="w-full pl-9 pr-3 py-2 sm:py-1.5 rounded-xl bg-surface-container-low/70 focus:bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 text-xs outline-none shadow-[0_0_0_1px_rgba(0,0,0,0.06)] focus:shadow-[0_0_0_2px_rgba(79,70,229,0.5)] transition-all"
            />
          </div>

          {/* Filter Tabs + Download Button */}
          <div className="flex items-center gap-2 justify-between sm:justify-end">
            <div className="inline-flex p-1 rounded-xl bg-surface-container-low flex-1 sm:flex-initial justify-center">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onFilterChange(opt.id)}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 sm:py-1 rounded-lg text-xs transition-all cursor-pointer font-medium text-center ${
                    currentFilter === opt.id
                      ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Download CSV Icon Button */}
            <button
              type="button"
              onClick={onExportCSV}
              title="Descargar CSV de la vista actual"
              className="p-2 sm:p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant transition-colors flex items-center justify-center shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                file_download
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List Container */}
      <div className="flex flex-col gap-2.5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-primary text-[28px] animate-spin mb-2">
              sync
            </span>
            <p className="text-xs">Cargando registros contables...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                search_off
              </span>
            </div>
            <p className="text-sm font-semibold text-on-surface">
              No se encontraron movimientos
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Prueba ajustando los filtros de búsqueda o categoría.
            </p>
          </div>
        ) : (
          transactions.map((t) => (
            <TransactionItem
              key={t.id}
              transaction={t}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      {/* Footer Audit Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 bg-surface-container-low/40 -mx-4 sm:-mx-6 px-4 sm:px-6 -mb-4 sm:-mb-6 py-3 rounded-b-2xl border-t border-surface-container-low text-center sm:text-left">
        <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-secondary">
            cloud_done
          </span>
          <span>
            {isCloudActive
              ? 'Sincronizado con Supabase PostgreSQL • SSL'
              : 'Almacenamiento local activo'}
          </span>
        </div>
        <div className="text-xs font-semibold text-on-surface">
          <span className="text-on-surface-variant font-normal">Total: </span>
          <strong>{transactions.length} movimientos</strong>
        </div>
      </div>
    </section>
  );
}
