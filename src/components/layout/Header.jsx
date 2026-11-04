import React, { useState, useEffect } from 'react';
import { getCurrentMonthYear } from '../../utils/formatters';

const NAV_ITEMS = [
  {
    id: 'panel-general',
    label: 'Panel General',
    mobileLabel: 'General',
    targetId: 'seccion-panel-general',
  },
  {
    id: 'analisis',
    label: 'Análisis',
    mobileLabel: 'Análisis',
    targetId: 'seccion-analisis',
  },
  {
    id: 'presupuestos',
    label: 'Presupuestos',
    mobileLabel: 'Presupuestos',
    targetId: 'seccion-presupuestos',
  },
  {
    id: 'historial',
    label: 'Historial',
    mobileLabel: 'Historial',
    targetId: 'seccion-historial',
  },
];

export function Header({ onExportCSV, isCloudActive }) {
  const [activeTab, setActiveTab] = useState('panel-general');
  const currentMonthYear = getCurrentMonthYear();

  // Desplazamiento suave y actualización de pestaña activa
  const handleScrollToSection = (targetId, id) => {
    setActiveTab(id);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Observador para sincronizar la pestaña activa según el scroll del usuario
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-xl border-b border-surface-container/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Status */}
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary-container flex items-center justify-center shadow-[0_2px_8px_rgba(79,70,229,0.25)] shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px] sm:text-[20px]">
                account_balance_wallet
              </span>
            </div>
            <span className="font-bold text-base sm:text-xl text-on-surface tracking-tight truncate">
              Mi Control Financiero
            </span>

            {/* Cloud Status Indicator */}
            <div
              className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low shrink-0"
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
                {isCloudActive ? 'Nube activa' : 'Modo local'}
              </span>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                calendar_today
              </span>
              <span className="text-xs font-semibold">{currentMonthYear}</span>
            </div>

            <button
              onClick={onExportCSV}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:bg-surface-container-low transition-colors text-xs font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                file_download
              </span>
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>

            {/* Botón de perfil/avatar reservado para futura actualización con Supabase Auth
            <div
              className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm shrink-0"
              title="Usuario activo"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            */}
          </div>
        </div>

        {/* Navigation Tabs Distribución Óptima Mobile (Grid 4 columnas sin necesidad de deslizar) */}
        <nav className="grid grid-cols-4 w-full p-1 rounded-xl bg-surface-container-low/70 sm:w-fit sm:flex sm:items-center sm:gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollToSection(item.targetId, item.id)}
                className={`w-full sm:w-auto px-1 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-xs transition-all text-center cursor-pointer truncate ${
                  isActive
                    ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(0,0,0,0.06)] font-bold'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                <span className="sm:hidden">{item.mobileLabel}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
