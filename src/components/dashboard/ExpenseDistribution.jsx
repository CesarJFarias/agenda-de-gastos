import React from 'react';
import { formatMoney, getCurrentMonthYear, getCategoryIcon } from '../../utils/formatters';

export function ExpenseDistribution({ metrics }) {
  const { income, expense, expenseRatio, categoryList } = metrics;
  const currentMonth = getCurrentMonthYear();

  // Calcular porcentaje utilizado del ingreso
  const usedRatio = Math.min(100, Math.max(0, expenseRatio));
  const remainingRatio = Math.max(0, 100 - usedRatio);

  // Ordenar categorías por monto descendente y tomar hasta 4
  const topCategories = [...categoryList]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  return (
    <section className="flex flex-col p-6 rounded-2xl bg-surface-container-lowest shadow-sm gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-on-surface">
            Distribución de Gastos vs Flujo
          </h3>
          <p className="text-xs text-on-surface-variant">
            Proporción respecto al total ingresado
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] bg-surface-container text-on-surface-variant font-semibold">
          {currentMonth}
        </span>
      </div>

      {/* Segmented Bar Visualization */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-on-surface-variant">
          <span>Capacidad financiera utilizada</span>
          <span className="font-bold text-on-surface">
            {usedRatio.toFixed(2)}% del capital
          </span>
        </div>

        <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
          <div
            className="h-full bg-tertiary transition-all duration-500"
            style={{ width: `${usedRatio}%` }}
            title={`Gastos: ${formatMoney(expense)}`}
          ></div>
          <div
            className="h-full bg-secondary-container/80 transition-all duration-500"
            style={{ width: `${remainingRatio}%` }}
            title={`Remanente: ${formatMoney(Math.max(0, income - expense))}`}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Gastos ({formatMoney(expense)})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
            Remanente ({formatMoney(Math.max(0, income - expense))})
          </span>
        </div>
      </div>

      {/* Category Mini-tiles list */}
      <div className="flex flex-col gap-2.5 pt-2">
        <span className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">
          Flujo por categorías activas
        </span>

        {topCategories.length === 0 ? (
          <div className="text-center py-6 text-on-surface-variant text-xs">
            Registra movimientos para ver la distribución por categorías.
          </div>
        ) : (
          topCategories.map((catItem, idx) => {
            const isIncome = catItem.type === 'ingreso';
            const iconName = getCategoryIcon(catItem.category, catItem.type);
            const totalForType = isIncome ? income : expense;
            const percentage =
              totalForType > 0 ? ((catItem.amount / totalForType) * 100).toFixed(0) : 100;

            return (
              <div
                key={`${catItem.type}-${catItem.category}-${idx}`}
                className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isIncome
                        ? 'bg-secondary-fixed/40 text-secondary'
                        : 'bg-tertiary-fixed/60 text-tertiary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {iconName}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-on-surface block">
                      {catItem.category}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      {catItem.count} {catItem.count === 1 ? 'registro' : 'registros'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs sm:text-sm font-bold block ${
                      isIncome ? 'text-secondary' : 'text-tertiary'
                    }`}
                  >
                    {isIncome ? '+' : '-'}
                    {formatMoney(catItem.amount)}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      isIncome ? 'text-secondary' : 'text-tertiary'
                    }`}
                  >
                    {percentage}% de {isIncome ? 'ingresos' : 'gastos'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

