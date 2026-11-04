import React from 'react';
import { formatMoney } from '../../utils/formatters';

export function SummaryCards({ metrics }) {
  const {
    balance,
    income,
    expense,
    incomeCount,
    expenseCount,
    savingsRate,
    expenseRatio,
  } = metrics;

  const isHealthyBalance = balance >= 0;

  const savingsStatus =
    savingsRate >= 70
      ? 'Excelente'
      : savingsRate >= 40
      ? 'Óptimo'
      : savingsRate > 0
      ? 'Moderado'
      : 'En observación';

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Balance Total */}
      <div className="flex flex-col justify-between p-6 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-on-surface-variant font-semibold tracking-wider uppercase">
              BALANCE TOTAL
            </span>
            <div className="w-8 h-8 rounded-lg bg-primary-container/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">
                account_balance
              </span>
            </div>
          </div>
          <div
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isHealthyBalance ? 'text-on-surface' : 'text-tertiary'
            }`}
          >
            {formatMoney(balance)}
          </div>
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between text-secondary">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">
              {isHealthyBalance ? 'trending_up' : 'trending_down'}
            </span>
            <span className="text-xs font-semibold">
              {isHealthyBalance ? '+12.4%' : '-5.2%'}
            </span>
            <span className="text-[11px] text-on-surface-variant ml-1 font-normal">
              vs ciclo anterior
            </span>
          </div>
          {/* Micro Sparkline SVG */}
          <svg
            className="w-16 h-5 text-secondary overflow-visible"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 60 20"
          >
            <path
              d={
                isHealthyBalance
                  ? 'M1 16L15 12L28 15L42 7L59 2'
                  : 'M1 4L15 8L28 6L42 14L59 18'
              }
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Card 2: Total Ingresos */}
      <div className="flex flex-col justify-between p-6 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary-fixed/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-on-surface-variant font-semibold tracking-wider uppercase">
              TOTAL INGRESOS
            </span>
            <div className="w-8 h-8 rounded-lg bg-secondary-container/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                arrow_upward
              </span>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl text-secondary font-bold tracking-tight">
            {formatMoney(income)}
          </div>
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex w-2 h-2 rounded-full bg-secondary"></span>
            <span className="text-xs text-on-surface-variant">
              {incomeCount} {incomeCount === 1 ? 'abono computado' : 'abonos computados'}
            </span>
          </div>
          <span className="inline-flex items-center justify-center text-center text-[11px] px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-semibold leading-normal">
            100% cobrado
          </span>
        </div>
      </div>

      {/* Card 3: Total Gastos */}
      <div className="flex flex-col justify-between p-6 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-tertiary-fixed/40 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-on-surface-variant font-semibold tracking-wider uppercase">
              TOTAL GASTOS
            </span>
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed/60 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[20px]">
                arrow_downward
              </span>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl text-tertiary font-bold tracking-tight">
            {formatMoney(expense)}
          </div>
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary text-[16px]">
              pie_chart
            </span>
            <span className="text-xs text-on-surface-variant">
              {expenseRatio.toFixed(1)}% del total ingresado
            </span>
          </div>
          <span className="inline-flex items-center justify-center text-center text-[11px] px-2.5 py-0.5 rounded-full bg-tertiary-fixed/40 text-tertiary font-semibold leading-normal">
            {expenseCount} {expenseCount === 1 ? 'transacción' : 'transacciones'}
          </span>
        </div>
      </div>

      {/* Card 4: Retención & Salud Financiera */}
      <div className="flex flex-col justify-between p-6 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-fixed/40 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-on-surface-variant font-semibold tracking-wider uppercase">
              TASA DE AHORRO
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">
                savings
              </span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
              {savingsRate.toFixed(1)}%
            </span>
            <span className="inline-flex items-center justify-center text-center text-[11px] px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary font-semibold leading-normal">
              {savingsStatus}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 flex flex-col gap-1.5">
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.max(0, Math.min(100, savingsRate))}%` }}
            ></div>
          </div>
          <span className="text-[11px] text-on-surface-variant">
            Presupuesto restante protegido
          </span>
        </div>
      </div>
    </section>
  );
}
