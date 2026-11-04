import React from 'react';

export function Header({ onExportCSV, isCloudActive }) {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <i className="fa-solid fa-wallet text-emerald-400"></i>
              <span>Mi Control Financiero</span>
            </h1>
            <span
              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                isCloudActive
                  ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                  : 'bg-amber-950/60 border-amber-700 text-amber-300'
              }`}
              title={
                isCloudActive
                  ? 'Conectado a Supabase Cloud'
                  : 'Guardando en este navegador (Configura .env para conectar Supabase)'
              }
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCloudActive ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              ></span>
              {isCloudActive ? 'Nube (Supabase)' : 'Modo Local'}
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Ingresos, gastos y balance en tiempo real
          </p>
        </div>

        <button
          onClick={onExportCSV}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-700 flex items-center gap-2 transition shrink-0"
        >
          <i className="fa-solid fa-file-export"></i>
          <span className="hidden sm:inline">Exportar</span> CSV
        </button>
      </div>
    </header>
  );
}

