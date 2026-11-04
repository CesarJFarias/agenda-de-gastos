import React from 'react';
import { formatMoney } from '../../utils/formatters';

export function SummaryCards({ metrics }) {
  const { balance, income, expense } = metrics;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Balance Total */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Balance Total
          </span>
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <i className="fa-solid fa-scale-balanced text-sm"></i>
          </div>
        </div>
        <p
          className={`text-2xl sm:text-3xl font-extrabold ${
            balance >= 0 ? 'text-slate-900' : 'text-rose-600'
          }`}
        >
          {formatMoney(balance)}
        </p>
      </div>

      {/* Ingresos */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Total Ingresos
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <i className="fa-solid fa-arrow-trend-up text-sm"></i>
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
          {formatMoney(income)}
        </p>
      </div>

      {/* Gastos */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Total Gastos
          </span>
          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <i className="fa-solid fa-arrow-trend-down text-sm"></i>
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-extrabold text-rose-600">
          {formatMoney(expense)}
        </p>
      </div>
    </section>
  );
}

