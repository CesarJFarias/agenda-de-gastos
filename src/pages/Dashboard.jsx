import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { ExpenseDistribution } from '../components/dashboard/ExpenseDistribution';
import { BudgetSection } from '../components/dashboard/BudgetSection';
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
    searchQuery,
    setSearchQuery,
    loading,
    error,
    metrics,
    isCloudActive,
    addTransaction,
    deleteTransaction,
  } = useTransactions();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Header Fijo con Blur y Navegación Dinámica */}
      <Header
        onExportCSV={() => exportTransactionsToCSV(transactions)}
        isCloudActive={isCloudActive}
      />

      {/* Contenido Principal con padding-top para compensar el header fijo */}
      <main className="w-full pt-32 sm:pt-36 pb-12 bg-gradient-to-b from-surface via-surface-container-low/40 to-surface flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Mensaje de Error si ocurre */}
          {error && (
            <div className="p-4 rounded-xl bg-error-container text-on-error-container text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  error
                </span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* 1. SECCIÓN: Panel General (KPIs y Resumen Consolidado) */}
          <div
            id="seccion-panel-general"
            className="scroll-mt-32 sm:scroll-mt-36 space-y-6"
          >
            {/* Sub-header context & Quick KPIs row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-primary font-bold">
                    Resumen Financiero Consolidado
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-secondary-container/40 text-on-secondary-container font-semibold">
                    Tiempo real
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant">
                  Gestión inteligente de flujos, ingresos declarados y reservas del ciclo corriente.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    verified_user
                  </span>
                  <span className="text-xs font-semibold text-on-surface">
                    {isCloudActive ? 'Supabase Cloud Sync' : 'Almacenamiento Local'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => exportTransactionsToCSV(transactions)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface text-xs font-semibold hover:bg-surface-container-low transition-all shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    insights
                  </span>
                  <span>Exportar Reporte</span>
                </button>
              </div>
            </div>

            {/* KPI Grid (4 Cards Modern Fintech) */}
            <SummaryCards metrics={metrics} />
          </div>

          {/* Main Workspace Bento Layout: Formulario + 2. SECCIÓN: Análisis & Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Columna Izquierda: Formulario de Registro (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <TransactionForm onAdd={addTransaction} />
            </div>

            {/* Columna Derecha: Análisis de Gastos vs Flujo (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <ExpenseDistribution metrics={metrics} />
            </div>
          </div>

          {/* 3. SECCIÓN: Gestión de Presupuestos Mensuales */}
          <BudgetSection metrics={metrics} />

          {/* 4. SECCIÓN: Historial de Transacciones Completo */}
          <TransactionList
            transactions={filteredTransactions}
            loading={loading}
            currentFilter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onDelete={deleteTransaction}
            onExportCSV={() => exportTransactionsToCSV(filteredTransactions)}
            isCloudActive={isCloudActive}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
