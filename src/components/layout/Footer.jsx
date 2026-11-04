import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low/60 mt-auto border-t border-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">
            lock
          </span>
          <span className="text-xs text-on-surface-variant">
            Encriptación financiera de extremo a extremo • Mi Control Financiero
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Estado: Conectado
          </span>
          <span>Privacidad & Seguridad</span>
        </div>
      </div>
    </footer>
  );
}
