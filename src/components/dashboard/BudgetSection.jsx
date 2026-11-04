import React, { useState, useEffect } from 'react';
import { formatMoney, getCurrentMonthYear } from '../../utils/formatters';

const DEFAULT_BUDGET = 350000;

export function BudgetSection({ metrics }) {
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const saved = localStorage.getItem('user_monthly_budget');
    return saved ? Number(saved) : DEFAULT_BUDGET;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(monthlyBudget);

  const currentMonth = getCurrentMonthYear();
  const totalSpent = metrics.expense;
  const remaining = monthlyBudget - totalSpent;
  const percentageSpent = monthlyBudget > 0 ? Math.min(150, (totalSpent / monthlyBudget) * 100) : 0;

  const isExceeded = remaining < 0;
  const isWarning = !isExceeded && percentageSpent >= 80;

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = parseFloat(tempBudget);
    if (!isNaN(val) && val > 0) {
      setMonthlyBudget(val);
      localStorage.setItem('user_monthly_budget', String(val));
      setIsEditing(false);
    }
  };

  return (
    <section
      id="seccion-presupuestos"
      className="scroll-mt-32 sm:scroll-mt-36 flex flex-col p-4 sm:p-6 rounded-2xl bg-surface-container-lowest shadow-sm gap-6"
    >
      {/* Header de la Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">
              account_balance
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
                Gestión de Presupuestos
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-primary-fixed/40 text-on-primary-fixed-variant font-semibold">
                {currentMonth}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Límites de gasto proyectados y metas de control financiero
            </p>
          </div>
        </div>

        {/* Botón para editar presupuesto */}
        <button
          type="button"
          onClick={() => {
            setTempBudget(monthlyBudget);
            setIsEditing(!isEditing);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors cursor-pointer w-fit"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">
            {isEditing ? 'close' : 'tune'}
          </span>
          <span>{isEditing ? 'Cancelar' : 'Ajustar Presupuesto'}</span>
        </button>
      </div>

      {/* Formulario desplegable para ajustar el presupuesto mensual */}
      {isEditing && (
        <form
          onSubmit={handleSaveBudget}
          className="p-4 rounded-xl bg-surface-container-low/70 border border-surface-container flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 animate-fade-in"
        >
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-semibold text-on-surface">
              Definir tope de gasto mensual (ARS)
            </label>
            <input
              type="number"
              step="1000"
              min="1"
              value={tempBudget}
              onChange={(e) => setTempBudget(e.target.value)}
              placeholder="Ej. 350000"
              required
              className="w-full max-w-sm px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface text-sm font-bold outline-none border border-surface-container focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-all shadow-sm cursor-pointer self-end sm:self-auto"
          >
            Guardar Límite
          </button>
        </form>
      )}

      {/* Indicadores Principales del Presupuesto */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Presupuesto Total */}
        <div className="p-4 rounded-xl bg-surface-container-low/40 border border-surface-container-low flex flex-col justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Presupuesto Asignado
          </span>
          <p className="text-xl sm:text-2xl font-bold text-on-surface mt-2">
            {formatMoney(monthlyBudget)}
          </p>
          <span className="text-[11px] text-on-surface-variant mt-1">
            Tope mensual para gastos
          </span>
        </div>

        {/* Gasto Ejecutado */}
        <div className="p-4 rounded-xl bg-surface-container-low/40 border border-surface-container-low flex flex-col justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Gasto Ejecutado
          </span>
          <p className="text-xl sm:text-2xl font-bold text-tertiary mt-2">
            {formatMoney(totalSpent)}
          </p>
          <span className="text-[11px] text-tertiary font-medium mt-1">
            {percentageSpent.toFixed(1)}% del límite utilizado
          </span>
        </div>

        {/* Remanente Disponible */}
        <div
          className={`p-4 rounded-xl border flex flex-col justify-between ${
            isExceeded
              ? 'bg-error-container/40 border-error/20'
              : isWarning
              ? 'bg-amber-500/10 border-amber-500/20'
              : 'bg-secondary-container/20 border-secondary-container/40'
          }`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
            {isExceeded ? 'Excedente de Gasto' : 'Saldo Disponible'}
          </span>
          <p
            className={`text-xl sm:text-2xl font-bold mt-2 ${
              isExceeded
                ? 'text-error'
                : isWarning
                ? 'text-amber-700'
                : 'text-secondary'
            }`}
          >
            {formatMoney(Math.abs(remaining))}
          </p>
          <span
            className={`text-[11px] font-semibold mt-1 ${
              isExceeded
                ? 'text-error'
                : isWarning
                ? 'text-amber-700'
                : 'text-secondary'
            }`}
          >
            {isExceeded
              ? 'Has superado el límite fijado'
              : isWarning
              ? 'Atención: cerca del límite'
              : 'Gasto dentro del rango saludable'}
          </span>
        </div>
      </div>

      {/* Barra de Progreso Global */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between text-xs text-on-surface-variant">
          <span>Consumo del presupuesto mensual</span>
          <span className="font-bold text-on-surface">
            {percentageSpent.toFixed(1)}% consumido
          </span>
        </div>

        <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-700 rounded-full ${
              isExceeded
                ? 'bg-error'
                : isWarning
                ? 'bg-amber-500'
                : 'bg-secondary'
            }`}
            style={{ width: `${Math.min(100, percentageSpent)}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100% (Límite)</span>
        </div>
      </div>
    </section>
  );
}
