import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { Lock, Eye, EyeOff, ShieldCheck, X, AlertCircle, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, draftContent } = useClinic();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(password, rememberMe);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Clave incorrecta');
      } else {
        setPassword('');
      }
    }, 300);
  };

  const handleUseDemoKey = () => {
    setPassword('vilenis2026');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-[#dcf3e7] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-[#00341f] to-[#154c33] text-white p-6 pb-8 flex flex-col items-center text-center">
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-[#97f3b5] text-[#00341f] flex items-center justify-center shadow-lg mb-3">
            <Lock className="w-7 h-7" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-[#9af6b8]">
            Área Privada de Seguridad
          </span>
          <h2 className="font-playfair text-2xl font-bold text-[#e7fff2] mt-1">
            Acceso al Panel de Control
          </h2>
          <p className="text-xs text-[#c8dfd3] max-w-xs mt-1">
            Exclusivo para la Dra. Vilenis. Solo la propietaria puede modificar contenidos y tarifas.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 -mt-4 bg-white rounded-t-3xl flex flex-col gap-5">
          {/* Owner Identity Preview */}
          <div className="p-3.5 bg-[#e1f9ec] rounded-2xl border border-[#97f3b5]/50 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white ring-2 ring-[#006d3d] shrink-0">
              <img
                src={draftContent.doctorAvatarUrl}
                alt={draftContent.doctorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#00341f] truncate">
                {draftContent.doctorName}
              </span>
              <span className="text-xs text-[#006d3d] font-semibold">
                Propietaria & Administradora
              </span>
              <span className="text-[10px] text-[#404943] truncate">
                citas@vilenispodologia.pe
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errorMessage && (
              <div className="p-3 bg-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#ba1a1a]/20 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#00341f]">
                Contraseña o PIN de Propietaria *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce tu clave privada..."
                  className="w-full bg-[#f7faf8] rounded-xl pl-4 pr-11 py-3 text-sm text-[#0b1f18] border border-[#c0c9c1]/50 focus:border-[#006d3d] focus:bg-white focus:ring-2 focus:ring-[#97f3b5] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#717972] hover:text-[#00341f] transition-colors cursor-pointer"
                  title={showPassword ? 'Ocultar' : 'Mostrar'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#404943] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded accent-[#006d3d] w-4 h-4 cursor-pointer"
                />
                <span>Recordar sesión en este navegador</span>
              </label>
            </div>

            {/* Demo Password Hint / Fast Test Button */}
            <div className="p-3 bg-[#f7faf8] rounded-xl border border-[#dcf3e7] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[11px] text-[#404943]">
                <ShieldCheck className="w-4 h-4 text-[#006d3d] shrink-0" />
                <span>
                  Clave inicial: <strong className="text-[#00341f]">vilenis2026</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleUseDemoKey}
                className="px-2.5 py-1 rounded-lg bg-[#dcf3e7] hover:bg-[#d6eee1] text-[#006d3d] text-[11px] font-bold transition-colors cursor-pointer shrink-0"
              >
                Autocompletar
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#00341f] hover:bg-[#154c33] text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#9af6b8]" />
                  <span>Ingresar al Gestor de Contenidos</span>
                </>
              )}
            </button>
          </form>

          {/* Security Guarantee Note */}
          <p className="text-[10px] text-center text-[#717972] leading-tight pt-1">
            Protección de acceso clínico: Los pacientes y visitantes solo pueden ver el sitio web público.
          </p>
        </div>
      </div>
    </div>
  );
};
