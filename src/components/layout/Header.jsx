import React, { useState } from 'react';
import { getCurrentMonthYear } from '../../utils/formatters';

export function Header({ onExportCSV, isCloudActive }) {
  const [activeTab, setActiveTab] = useState('panel-general');
  const currentMonthYear = getCurrentMonthYear();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-3 pb-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Status */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center shadow-[0_2px_8px_rgba(79,70,229,0.25)]">
                <span className="material-symbols-outlined text-on-primary text-[20px]">
                  account_balance_wallet
                </span>
              </div>
              <span className="font-bold text-lg sm:text-xl text-on-surface tracking-tight">
                Mi Control Financiero
              </span>
            </div>

            {/* Cloud Status Indicator */}
            <div
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low"
              title={
                isCloudActive
                  ? 'Sincronizado activamente con Supabase Cloud'
                  : 'Modo Local (LocalStorage)'
              }
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    isCloudActive ? 'bg-secondary' : 'bg-amber-500'
                  } opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isCloudActive ? 'bg-secondary' : 'bg-amber-500'
                  }`}
                ></span>
              </span>
              <span
                className={`text-[11px] font-semibold ${
                  isCloudActive ? 'text-secondary' : 'text-amber-700'
                }`}
              >
                {isCloudActive ? 'Nube activa (Supabase)' : 'Modo local activo'}
              </span>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                calendar_today
              </span>
              <span className="text-xs font-semibold">{currentMonthYear}</span>
            </div>

            <button
              onClick={onExportCSV}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:bg-surface-container-low transition-colors text-xs font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                file_download
              </span>
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>

            <div
              className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm"
              title="Usuario activo"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-low/70 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('panel-general')}
            className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'panel-general'
                ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Panel General
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('analisis-y-graficos')}
            className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'analisis-y-graficos'
                ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Análisis & Gráficos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presupuestos')}
            className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'presupuestos'
                ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Presupuestos
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('historial');
              const el = document.getElementById('seccion-historial');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'historial'
                ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Historial
          </button>
        </nav>
      </div>
    </header>
  );
}
