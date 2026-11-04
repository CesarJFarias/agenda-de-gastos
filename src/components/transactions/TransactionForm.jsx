import React, { useState } from 'react';
import {
  TRANSACTION_TYPES,
  TRANSACTION_CATEGORIES,
} from '../../constants/categories';

export function TransactionForm({ onAdd }) {
  const [type, setType] = useState('ingreso');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    const success = await onAdd({ type, description, amount, category });
    setSubmitting(false);

    if (success) {
      setDescription('');
      setAmount('');
      setCategory('General');
    }
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-plus-circle text-indigo-600"></i>
        <span>Registrar nuevo movimiento</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3"
      >
        {/* Tipo */}
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Tipo
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {TRANSACTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Descripción
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej. Sueldo, Supermercado, Internet..."
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Monto */}
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Monto ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categoría */}
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {TRANSACTION_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Botón Guardar */}
        <div className="sm:col-span-2 md:col-span-5 flex justify-end mt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2"
          >
            <i
              className={`fa-solid ${
                submitting ? 'fa-spinner fa-spin' : 'fa-check'
              }`}
            ></i>
            <span>{submitting ? 'Guardando...' : 'Guardar movimiento'}</span>
          </button>
        </div>
      </form>
    </section>
  );
}

