import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { Monitor, Smartphone, Lock, RotateCw, MessageCircle } from 'lucide-react';

export const LiveDevicePreview: React.FC = () => {
  const { draftContent, devicePreviewMode, setDevicePreviewMode } = useClinic();

  const isMobile = devicePreviewMode === 'mobile';

  return (
    <div className="flex flex-col gap-4 sticky top-24 self-start w-full">
      {/* Live Preview Header with Device Switcher */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dcf3e7] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006d3d] animate-pulse"></span>
            <span className="text-sm font-bold text-[#00341f]">
              Vista Previa en Vivo
            </span>
          </div>

          {/* Device Buttons */}
          <div className="flex items-center bg-[#dcf3e7] rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setDevicePreviewMode('desktop')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                !isMobile
                  ? 'bg-white text-[#00341f] shadow-sm'
                  : 'text-[#404943] hover:text-[#00341f]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDevicePreviewMode('mobile')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                isMobile
                  ? 'bg-white text-[#00341f] shadow-sm'
                  : 'text-[#404943] hover:text-[#00341f]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Móvil</span>
            </button>
          </div>
        </div>

        <span className="text-xs text-[#404943]">
          vilenispodologia.pe • Reflejo dinámico inmediato
        </span>
      </div>

      {/* Simulated Device Mockup Frame */}
      <div
        className={`bg-[#20342c] rounded-2xl p-3 shadow-xl transition-all duration-300 ${
          isMobile ? 'max-w-[320px] mx-auto w-full' : 'w-full'
        }`}
      >
        {/* Mockup Shell Bar */}
        <div className="flex items-center justify-between pb-2 px-1 text-white/60">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#edbf7a]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#9af6b8]"></div>
          </div>
          <div className="bg-white/10 px-3 py-0.5 rounded-full text-center text-[10px] font-mono text-white/90 flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#9af6b8]" />
            <span>vilenispodologia.pe</span>
          </div>
          <RotateCw className="w-3 h-3 text-white/60" />
        </div>

        {/* Inside Web Canvas */}
        <div className="bg-[#f7faf8] rounded-xl overflow-hidden shadow-inner flex flex-col max-h-[580px] overflow-y-auto border border-[#dcf3e7]">
          {/* Mini Web Navbar */}
          <div className="bg-white/95 backdrop-blur-md px-3 py-2 flex items-center justify-between sticky top-0 z-10 shadow-xs border-b border-[#dcf3e7]">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-[#00341f] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[12px] text-[#9af6b8]">
                  footprint
                </span>
              </div>
              <span className="font-playfair text-xs font-bold text-[#00341f]">
                {draftContent.clinicName}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-[#006d3d]">
                Citas WhatsApp
              </span>
              <div className="w-4 h-4 rounded-full bg-[#97f3b5] flex items-center justify-center text-[#00341f]">
                <MessageCircle className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>

          {/* Mini Web Hero */}
          <div className="relative p-3.5 flex flex-col gap-2 bg-gradient-to-b from-[#e7fff2] via-[#e1f9ec] to-[#f7faf8]">
            <span className="px-2 py-0.5 rounded-full bg-[#dcf3e7] text-[#00341f] text-[9px] font-bold uppercase tracking-wider self-start border border-[#97f3b5]/40">
              Podología Clínica • Lima
            </span>

            {/* Live Reactive Title */}
            <h3 className="font-playfair text-sm sm:text-base font-bold text-[#00341f] leading-tight">
              {draftContent.heroTitle}
            </h3>

            {/* Live Reactive Subtitle */}
            <p className="text-[11px] leading-snug text-[#404943] line-clamp-3">
              {draftContent.heroSubtitle}
            </p>

            {/* Hero Image Mock */}
            <div className="relative w-full h-28 rounded-lg overflow-hidden mt-1 shadow-sm border border-[#dcf3e7]">
              <img
                src={draftContent.heroImageUrl}
                alt="Consultorio Vilenis"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00341f]/70 via-transparent to-transparent flex items-end p-2">
                <span className="text-[10px] text-white font-bold">
                  Atención médica personalizada
                </span>
              </div>
            </div>

            {/* CTA Button Preview */}
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                className="w-full py-1.5 rounded-full bg-[#154c33] text-white text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3 h-3 text-[#9af6b8]" />
                <span>Agendar por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Mini Web Services Preview */}
          <div className="p-3 bg-white flex flex-col gap-2 border-t border-[#dcf3e7]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#00341f]">
                Servicios Destacados
              </span>
              <span className="text-[9px] text-[#006d3d] font-bold">
                Ver todos ({draftContent.services.filter((s) => s.active).length})
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {draftContent.services
                .filter((s) => s.active)
                .slice(0, 3)
                .map((srv) => (
                  <div
                    key={srv.id}
                    className="p-2 rounded-lg bg-[#f7faf8] flex items-center justify-between border border-[#dcf3e7]"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="text-[10px] font-bold text-[#00341f] truncate">
                        {srv.title}
                      </span>
                      <span className="text-[8px] text-[#404943] truncate">
                        {srv.duration} • {srv.tag}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#006d3d] shrink-0">
                      S/ {srv.price}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Mini Footer */}
          <div className="p-2.5 bg-[#00341f] text-white text-[9px] flex items-center justify-between mt-auto">
            <span>© {draftContent.doctorName} • Podología</span>
            <span className="text-[#9af6b8]">Lima, Perú</span>
          </div>
        </div>
      </div>

      {/* Quick Audit Checklist */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dcf3e7] flex flex-col gap-2">
        <span className="text-sm font-bold text-[#00341f]">
          Auditoría Pre-Publicación
        </span>
        <div className="flex flex-col gap-1.5 mt-1 text-xs">
          <div className="flex items-center gap-2 text-[#0b1f18]">
            <span className="material-symbols-outlined text-[#006d3d] text-[18px]">
              check_circle
            </span>
            <span>
              WhatsApp activo: <strong>{draftContent.whatsappDisplay}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#0b1f18]">
            <span className="material-symbols-outlined text-[#006d3d] text-[18px]">
              check_circle
            </span>
            <span>Horarios configurados (L-S)</span>
          </div>
          <div className="flex items-center gap-2 text-[#0b1f18]">
            <span className="material-symbols-outlined text-[#006d3d] text-[18px]">
              check_circle
            </span>
            <span>
              {draftContent.services.filter((s) => s.active).length} servicios publicados con tarifas
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#0b1f18]">
            <span className="material-symbols-outlined text-[#006d3d] text-[18px]">
              check_circle
            </span>
            <span>Certificado SSL y bioseguridad activos</span>
          </div>
        </div>
      </div>
    </div>
  );
};
