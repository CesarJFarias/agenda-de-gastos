import React, { useState } from 'react';
import { TRANSACTION_CATEGORIES } from '../../constants/categories';
import { getTodayISODate } from '../../utils/formatters';

export function TransactionForm({ onAdd }) {
  const [type, setType] = useState('ingreso');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [date, setDate] = useState(getTodayISODate());
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    const success = await onAdd({
      type,
      description,
      amount,
      category,
      date,
    });
    setSubmitting(false);

    if (success) {
      setFeedback(
        `Registrado con éxito: ${description} (${
          type === 'ingreso' ? '+' : '-'
        }ARS ${parseFloat(amount).toLocaleString('es-AR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })})`
      );
      setDescription('');
      setAmount('');
      setCategory('General');
      setDate(getTodayISODate());

      setTimeout(() => {
        setFeedback(null);
      }, 4500);
    }
  };

  return (
    <section className="flex flex-col p-6 rounded-2xl bg-surface-container-lowest shadow-sm">
      {/* Top Header of Form */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 bg-surface-container-low/30 -mx-6 px-6 -mt-6 pt-6 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center shadow-[0_2px_8px_rgba(79,70,229,0.2)]">
            <span className="material-symbols-outlined text-on-primary text-[20px]">
              add_circle
            </span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
              Registrar nuevo movimiento
            </h2>
            <p className="text-xs text-on-surface-variant">
              Ingresa los datos para actualizar el balance al instante.
            </p>
          </div>
        </div>

        {/* Segmented Control for Type (Ingreso / Gasto) */}
        <div className="inline-flex p-1 rounded-xl bg-surface-container-low" role="group">
          <button
            type="button"
            onClick={() => setType('ingreso')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all font-semibold cursor-pointer ${
              type === 'ingreso'
                ? 'bg-surface-container-lowest text-secondary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className={`inline-flex w-2 h-2 rounded-full ${
                type === 'ingreso' ? 'bg-secondary' : 'bg-outline-variant'
              }`}
            ></span>
            <span>Ingreso</span>
          </button>

          <button
            type="button"
            onClick={() => setType('gasto')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all font-semibold cursor-pointer ${
              type === 'gasto'
                ? 'bg-surface-container-lowest text-tertiary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className={`inline-flex w-2 h-2 rounded-full ${
                type === 'gasto' ? 'bg-tertiary' : 'bg-outline-variant'
              }`}
            ></span>
            <span>Gasto</span>
          </button>
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Concept / Description */}
          <div className="md:col-span-12 flex flex-col gap-1.5">
            <label
              htmlFor="inputDesc"
              className="text-xs text-on-surface font-semibold flex items-center justify-between"
            >
              <span>Descripción del movimiento</span>
              <span className="text-[11px] text-on-surface-variant font-normal">
                Requerido
              </span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant absolute left-3.5 pointer-events-none">
                edit_note
              </span>
              <input
                id="inputDesc"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej. Sueldo, Supermercado, Internet..."
                required
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-surface-container-low/70 focus:bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 text-sm outline-none transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.06)] focus:shadow-[0_0_0_2px_rgba(79,70,229,0.5)]"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="md:col-span-6 flex flex-col gap-1.5">
            <label
              htmlFor="inputAmount"
              className="text-xs text-on-surface font-semibold"
            >
              Monto
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs text-on-surface-variant font-bold">
                ARS
              </span>
              <input
                id="inputAmount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                className="w-full pl-16 pr-4 py-2.5 rounded-xl bg-surface-container-low/70 focus:bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 text-sm outline-none transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.06)] focus:shadow-[0_0_0_2px_rgba(79,70,229,0.5)] font-bold"
              />
            </div>
          </div>

          {/* Category */}
          <div className="md:col-span-6 flex flex-col gap-1.5">
            <label
              htmlFor="selectCategory"
              className="text-xs text-on-surface font-semibold"
            >
              Categoría
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant absolute left-3.5 pointer-events-none">
                category
              </span>
              <select
                id="selectCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-surface-container-low/70 focus:bg-surface-container-lowest text-on-surface text-sm outline-none transition-all appearance-none shadow-[0_0_0_1px_rgba(0,0,0,0.06)] focus:shadow-[0_0_0_2px_rgba(79,70,229,0.5)] cursor-pointer"
              >
                {TRANSACTION_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute right-3 pointer-events-none">
                unfold_more
              </span>
            </div>
          </div>

          {/* Date field & quick shortcut */}
          <div className="md:col-span-12 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                calendar_month
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-surface-container-low/70 px-3 py-1.5 rounded-lg text-on-surface text-xs outline-none"
              />
              <button
                type="button"
                onClick={() => setDate(getTodayISODate())}
                className="px-2.5 py-1.5 rounded-lg bg-surface-container-high/60 text-primary text-xs hover:bg-surface-container-high font-semibold cursor-pointer"
              >
                Hoy
              </button>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-all shadow-[0_4px_14px_rgba(79,70,229,0.3)] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  submitting ? 'animate-spin' : ''
                }`}
              >
                {submitting ? 'sync' : 'check'}
              </span>
              <span>{submitting ? 'Guardando...' : 'Guardar movimiento'}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Feedback Banner */}
      {feedback && (
        <div className="mt-4 p-3 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-between text-xs animate-fade-in">
          <div className="flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-[18px]">
              check_circle
            </span>
            <span>{feedback}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            type="button"
            className="text-on-secondary-container/70 hover:text-on-secondary-container"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </section>
  );
}
