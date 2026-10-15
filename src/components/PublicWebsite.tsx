import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import {
  Calendar,
  MessageCircle,
  Phone,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Star,
  Activity,
  HeartPulse,
  Settings,
  Lock,
  LogOut,
} from 'lucide-react';

export const PublicWebsite: React.FC = () => {
  const { publishedContent, setActiveView, isAuthenticated, openAuthModal, logout } = useClinic();

  // Booking form state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedService, setSelectedService] = useState(
    publishedContent.services[0]?.title || 'Quiropodia Integral Preventiva'
  );
  const [modality, setModality] = useState('Consultorio Clínico');
  const [patientComments, setPatientComments] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // FAQ open/close state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;

    const message = `Hola Dra. Vilenis, mi nombre es *${patientName.trim()}* (Tel: ${patientPhone.trim()}). Quisiera solicitar una cita para *${selectedService}* en modalidad *${modality}*. Detalle: ${patientComments.trim() || 'Sin comentarios adicionales'}`;
    const url = `https://wa.me/${publishedContent.whatsappNumber}?text=${encodeURIComponent(message)}`;

    setBookingSuccess(true);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  return (
    <div className="w-full min-h-screen bg-[#f7faf8] text-[#0b1f18] flex flex-col font-jakarta">
      {/* Top Notification / CMS Switcher Banner */}
      <div className="bg-[#154c33] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#2d8a56]/40">
        <div className="max-w-[1280px] w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9af6b8] animate-pulse"></span>
            <span className="font-medium">
              Consultorio Clínico & Atención a Domicilio en Lima Metropolitana
            </span>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#9af6b8] font-bold hidden sm:inline">
                ✓ Sesión iniciada: Dra. Vilenis
              </span>
              <button
                type="button"
                onClick={() => setActiveView('cms')}
                className="inline-flex items-center gap-1.5 bg-[#006d3d] hover:bg-[#00522d] text-white px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm cursor-pointer"
                title="Ir al panel de gestión y edición de contenidos"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Panel CMS Admin</span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openAuthModal}
              className="inline-flex items-center gap-1.5 bg-black/20 hover:bg-[#006d3d] text-white px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border border-[#97f3b5]/30"
              title="Acceso exclusivo para la Dra. Vilenis (Propietaria)"
            >
              <Lock className="w-3 h-3 text-[#edbf7a]" />
              <span>Acceso Propietaria (Dra. Vilenis)</span>
            </button>
          )}
        </div>
      </div>

      {/* Header matching Image 2 */}
      <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(21,76,51,0.06)] border-b border-[#dcf3e7]">
        <div className="h-20 max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <a href="#inicio" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#00341f] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px] text-[#9af6b8]">
                  footprint
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-playfair text-xl font-bold text-[#00341f] tracking-tight leading-none">
                  {publishedContent.clinicName}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006d3d] mt-1">
                  {publishedContent.clinicTagline}
                </span>
              </div>
            </a>

            {/* Specialist miniature */}
            <div className="hidden xl:flex items-center gap-3 pl-4 border-l border-[#c0c9c1]/50">
              <img
                src={publishedContent.doctorAvatarUrl}
                alt={publishedContent.doctorName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#97f3b5] shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#00341f]">
                  {publishedContent.doctorName}
                </span>
                <span className="text-[11px] text-[#404943]">
                  {publishedContent.doctorTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
            <a
              href="#inicio"
              className="px-3.5 py-1.5 rounded-full bg-[#154c33] text-white font-semibold shadow-sm transition-colors"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              className="px-3.5 py-1.5 rounded-full text-[#404943] hover:text-[#00341f] hover:bg-[#dcf3e7] transition-colors"
            >
              Servicios Podológicos
            </a>
            <a
              href="#sobre-vilenis"
              className="px-3.5 py-1.5 rounded-full text-[#404943] hover:text-[#00341f] hover:bg-[#dcf3e7] transition-colors"
            >
              Sobre Vilenis
            </a>
            <a
              href="#bioseguridad"
              className="px-3.5 py-1.5 rounded-full text-[#404943] hover:text-[#00341f] hover:bg-[#dcf3e7] transition-colors"
            >
              Bioseguridad
            </a>
            <a
              href="#testimonios"
              className="px-3.5 py-1.5 rounded-full text-[#404943] hover:text-[#00341f] hover:bg-[#dcf3e7] transition-colors"
            >
              Testimonios
            </a>
            <a
              href="#citas-contacto"
              className="px-3.5 py-1.5 rounded-full text-[#404943] hover:text-[#00341f] hover:bg-[#dcf3e7] transition-colors"
            >
              Ubicación & Citas
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${publishedContent.whatsappNumber}?text=${encodeURIComponent(publishedContent.defaultWhatsAppMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#00341f] hover:bg-[#154c33] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full transition-all shadow-[0_4px_16px_rgba(21,76,51,0.2)] hover:shadow-lg active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#9af6b8]" />
              <span className="hidden sm:inline">Cita WhatsApp</span>
              <span className="hidden md:inline font-normal text-[#d6eee1]">
                {publishedContent.whatsappDisplay}
              </span>
            </a>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  openAuthModal();
                } else {
                  setActiveView('cms');
                }
              }}
              className="w-9 h-9 rounded-full bg-[#dcf3e7] hover:bg-[#154c33] hover:text-white text-[#00341f] flex items-center justify-center transition-all cursor-pointer shadow-sm relative group"
              title={
                isAuthenticated
                  ? 'Acceder al Panel Administrativo CMS'
                  : 'Acceso privado para la Dra. Vilenis'
              }
            >
              {isAuthenticated ? (
                <Settings className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4 text-[#006d3d]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <section
          id="inicio"
          className="relative overflow-hidden bg-gradient-to-b from-[#e7fff2]/80 via-[#e1f9ec]/60 to-[#f7faf8] pt-8 pb-16"
        >
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-5 z-10">
                <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-[#dcf3e7] text-[#00341f] text-xs font-bold tracking-wide shadow-sm border border-[#97f3b5]/40">
                  <ShieldCheck className="w-4 h-4 text-[#006d3d]" />
                  <span>{publishedContent.heroBadge}</span>
                </div>

                <h1 className="font-playfair text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#00341f] leading-[1.15] tracking-tight">
                  {publishedContent.heroTitle.includes('pasos') ? (
                    <>
                      {publishedContent.heroTitle.replace('pasos.', '')}
                      <span className="italic font-normal text-[#006d3d]">pasos</span>.
                    </>
                  ) : (
                    publishedContent.heroTitle
                  )}
                </h1>

                <p className="text-base sm:text-lg text-[#404943] max-w-xl leading-relaxed">
                  {publishedContent.heroSubtitle}
                </p>

                {/* Direct CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${publishedContent.whatsappNumber}?text=${encodeURIComponent(publishedContent.defaultWhatsAppMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#00341f] hover:bg-[#154c33] text-white font-semibold text-base px-6 py-3.5 rounded-full shadow-lg transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 text-[#9af6b8]" />
                    <span>Agendar Cita WhatsApp</span>
                    <span className="text-[#c8dfd3] font-normal text-xs">
                      ({publishedContent.whatsappDisplay})
                    </span>
                  </a>

                  <a
                    href="#servicios"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#dcf3e7] text-[#00341f] font-semibold text-base px-6 py-3.5 rounded-full shadow-sm border border-[#c0c9c1]/40 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#006d3d]" />
                    <span>Ver Tratamientos</span>
                  </a>
                </div>

                {/* Micro trust pills */}
                <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-[#404943]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#006d3d]" />
                    <span>Atención Indolora Garantizada</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#006d3d]" />
                    <span>Sede Clínica & Domicilio en Lima</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#006d3d]" />
                    <span>Autoclave Médico Nivel Hospitalario</span>
                  </div>
                </div>
              </div>

              {/* Right Visual Card (5 cols) */}
              <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                {/* Glow Backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#9af6b8]/40 via-[#d0e8dc] to-[#e7fff2] rounded-3xl filter blur-2xl opacity-70 -z-10"></div>

                <div className="bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-4 relative border border-[#dcf3e7]">
                  {/* Hero Main Image */}
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-[#dcf3e7]">
                    <img
                      src={publishedContent.heroImageUrl}
                      alt="Atención médica podológica especializada"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    {/* Badge: Citas disponibles */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-sm border border-[#dcf3e7]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#006d3d] animate-pulse"></span>
                      <span className="text-[11px] font-bold text-[#00341f] uppercase tracking-wider">
                        Citas Disponibles Hoy
                      </span>
                    </div>

                    {/* Badge: Bioseguridad Grado III */}
                    <div className="absolute bottom-3 right-3 bg-[#00341f]/95 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2 text-xs font-semibold">
                      <ShieldCheck className="w-4 h-4 text-[#9af6b8]" />
                      <span>Bioseguridad Grado III</span>
                    </div>
                  </div>

                  {/* Specialist Micro Info */}
                  <div className="flex items-center justify-between p-3 bg-[#e1f9ec] rounded-xl border border-[#97f3b5]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white ring-2 ring-[#006d3d] flex-shrink-0">
                        <img
                          src={publishedContent.doctorAvatarUrl}
                          alt={publishedContent.doctorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-[#00341f]">
                          {publishedContent.doctorName}
                        </h2>
                        <p className="text-xs text-[#404943]">
                          Especialista en Quiropodia & Pie de Riesgo
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-base text-[#00341f]">
                        5.0 ★
                      </span>
                      <span className="text-[10px] font-bold text-[#006d3d] uppercase tracking-wider">
                        Excelente
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 max-w-xs border border-[#dcf3e7]">
                  <div className="w-10 h-10 rounded-xl bg-[#154c33] text-white flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#9af6b8]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#00341f] leading-tight">
                      Especialista Colegiada
                    </p>
                    <p className="text-[11px] text-[#404943]">
                      Experiencia internacional comprobada
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Metrics Bar */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#dcf3e7]">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dcf3e7] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[#006d3d] mb-1">
                  <Activity className="w-5 h-5" />
                  <span className="font-playfair text-3xl font-bold text-[#00341f]">
                    {publishedContent.metricYears}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#00341f]">
                  Años de Trayectoria
                </span>
                <span className="text-xs text-[#404943]">
                  Cuidado médico continuo
                </span>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dcf3e7] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[#006d3d] mb-1">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-playfair text-3xl font-bold text-[#00341f]">
                    {publishedContent.metricAutoclave}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#00341f]">
                  Esterilización Autoclave
                </span>
                <span className="text-xs text-[#404943]">
                  Pouches estériles sellados
                </span>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dcf3e7] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[#006d3d] mb-1">
                  <HeartPulse className="w-5 h-5" />
                  <span className="font-playfair text-3xl font-bold text-[#00341f]">
                    {publishedContent.metricPatients}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#00341f]">
                  Pacientes Aliviados
                </span>
                <span className="text-xs text-[#404943]">
                  Atendidos en Lima con éxito
                </span>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dcf3e7] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[#006d3d] mb-1">
                  <MapPin className="w-5 h-5" />
                  <span className="font-playfair text-3xl font-bold text-[#00341f]">
                    {publishedContent.metricCareWays}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#00341f]">
                  Sede o Domicilio
                </span>
                <span className="text-xs text-[#404943]">
                  Cobertura en distritos clave
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* QUIÉNES SOMOS / SOBRE VILENIS */}
        <section id="sobre-vilenis" className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Image Column (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-[#dcf3e7] shadow-xl relative border border-[#dcf3e7]">
                  <img
                    src={publishedContent.doctorSecondaryPhotoUrl}
                    alt="Dra. Vilenis con instrumental podológico en Lima"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00341f]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#9af6b8]">
                      Vocación de Servicio
                    </span>
                    <p className="font-playfair text-lg text-[#e7fff2] mt-1 italic">
                      {publishedContent.aboutQuote}
                    </p>
                    <span className="text-xs font-semibold mt-2 text-[#97f3b5]">
                      — {publishedContent.doctorName}, Podóloga Clínica
                    </span>
                  </div>
                </div>

                {/* Experience Badge Card */}
                <div className="absolute -bottom-4 right-4 bg-[#d6eee1] text-[#00341f] p-4 rounded-2xl shadow-lg flex items-center gap-3 border border-[#97f3b5]/50">
                  <Activity className="w-8 h-8 text-[#006d3d]" />
                  <div>
                    <p className="text-sm font-bold text-[#00341f]">Empatía Médica</p>
                    <p className="text-xs text-[#404943]">Sin dolor, sin traumas</p>
                  </div>
                </div>
              </div>

              {/* Narrative Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 text-[#006d3d] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{publishedContent.aboutEyebrow}</span>
                </div>

                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#00341f] leading-snug">
                  {publishedContent.aboutTitle}
                </h2>

                <div className="flex flex-col gap-4 text-[#404943] text-sm sm:text-base leading-relaxed">
                  <p>{publishedContent.aboutParagraph1}</p>
                  <p>{publishedContent.aboutParagraph2}</p>
                </div>

                {/* 4 Feature Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#e1f9ec] p-4 rounded-xl flex items-start gap-3 border border-[#dcf3e7]">
                    <div className="w-10 h-10 rounded-lg bg-[#00341f] text-white flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-[#9af6b8]">
                        clinical_notes
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#00341f]">
                        Evaluación Biomédica
                      </h3>
                      <p className="text-xs text-[#404943] mt-1">
                        Análisis visual, dérmico, vascular periférico y de puntos de presión plantar.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#e1f9ec] p-4 rounded-xl flex items-start gap-3 border border-[#dcf3e7]">
                    <div className="w-10 h-10 rounded-lg bg-[#00341f] text-white flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-[#9af6b8]">
                        assignment_turned_in
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#00341f]">
                        Plan Personalizado
                      </h3>
                      <p className="text-xs text-[#404943] mt-1">
                        Tratamiento adaptado a tu calzado, ocupación, deporte y condición de salud.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#e1f9ec] p-4 rounded-xl flex items-start gap-3 border border-[#dcf3e7]">
                    <div className="w-10 h-10 rounded-lg bg-[#00341f] text-white flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-[#9af6b8]">
                        school
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#00341f]">
                        Educación Preventiva
                      </h3>
                      <p className="text-xs text-[#404943] mt-1">
                        Aprende hábitos correctos de corte, calzado adecuado e hidratación clínica.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#e1f9ec] p-4 rounded-xl flex items-start gap-3 border border-[#dcf3e7]">
                    <div className="w-10 h-10 rounded-lg bg-[#00341f] text-white flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-[#9af6b8]">
                        support_agent
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#00341f]">
                        Seguimiento Post-Sesión
                      </h3>
                      <p className="text-xs text-[#404943] mt-1">
                        Monitoreo directo por WhatsApp para corroborar tu pronta recuperación.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${publishedContent.whatsappNumber}?text=${encodeURIComponent('Hola Dra. Vilenis, quisiera hacerle una consulta sobre mi caso.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#00341f] font-bold text-sm hover:text-[#006d3d] transition-colors group"
                  >
                    <span>Conversar directamente con la especialista</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATÁLOGO CLÍNICO DE SERVICIOS */}
        <section id="servicios" className="py-20 bg-[#f7faf8]">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 text-[#006d3d] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Catálogo Clínico Avanzado</span>
                </div>
                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#00341f]">
                  Especialidades diseñadas para aliviar, sanar y prevenir
                </h2>
                <p className="text-sm sm:text-base text-[#404943]">
                  Desde afecciones agudas y dolorosas como uñeros rebeldes hasta el cuidado de alta sensibilidad para el pie diabético y adultos mayores.
                </p>
              </div>

              <a
                href={`https://wa.me/${publishedContent.whatsappNumber}?text=${encodeURIComponent('Hola, quisiera conocer las tarifas y disponibilidad de servicios.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#d6eee1] hover:bg-[#c8dfd3] text-[#00341f] text-sm font-bold px-5 py-2.5 rounded-full transition-colors self-start md:self-auto shadow-sm"
              >
                <span>Consultar Costos y Promociones</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedContent.services
                .filter((s) => s.active)
                .map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#dcf3e7] relative overflow-hidden group"
                  >
                    {service.isUrgent && (
                      <div className="absolute top-0 right-0 left-0 h-1 bg-[#ba1a1a]"></div>
                    )}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-[#154c33] text-white flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[24px] text-[#9af6b8]">
                            medical_services
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            service.isUrgent
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : 'bg-[#dcf3e7] text-[#006d3d]'
                          }`}
                        >
                          {service.tag}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between mt-1">
                        <h3 className="text-lg font-bold text-[#00341f] leading-snug">
                          {service.title}
                        </h3>
                        <span className="font-playfair text-xl font-bold text-[#006d3d] shrink-0 ml-2">
                          S/ {service.price}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#404943] leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="flex flex-col gap-2 pt-2 text-xs text-[#0b1f18]">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#006d3d] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 mt-6 border-t border-[#dcf3e7] flex items-center justify-between">
                      <span className="text-xs text-[#404943] font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#717972]" />
                        <span>{service.duration}</span>
                      </span>

                      <a
                        href={`https://wa.me/${publishedContent.whatsappNumber}?text=${encodeURIComponent(`Hola, deseo agendar una cita para el servicio: ${service.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#006d3d] hover:text-[#00341f] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>{service.isUrgent ? 'Atención Urgente' : 'Agendar'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* PROTOCOLO DE BIOSEGURIDAD */}
        <section id="bioseguridad" className="py-20 bg-[#20342c] text-white">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9af6b8]">
                Tranquilidad & Asepsia Absoluta
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#e7fff2]">
                Protocolo de Bioseguridad en 4 Fases Clínicas
              </h2>
              <p className="text-sm sm:text-base text-[#c8dfd3] leading-relaxed">
                En podología, la esterilización no es opcional: es el corazón de nuestra ética. Cada instrumental se procesa bajo estándares quirúrgicos hospitalarios para garantizar cero contagios cruzados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-white/5 rounded-2xl p-6 flex flex-col gap-3 border border-white/10 hover:border-[#9af6b8]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#006d3d] text-white text-base flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold text-[#e7fff2]">
                  Triaje y Exploración
                </h3>
                <p className="text-xs text-[#c8dfd3] leading-relaxed">
                  Inspección podoscópica inicial con guantes de nitrilo descartables, desinfección cutánea previa con antisépticos de amplio espectro.
                </p>
                <div className="mt-auto pt-2 text-[#9af6b8] text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Inspección de biotipo</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white/5 rounded-2xl p-6 flex flex-col gap-3 border border-white/10 hover:border-[#9af6b8]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#006d3d] text-white text-base flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold text-[#e7fff2]">
                  Pouches Sellados
                </h3>
                <p className="text-xs text-[#c8dfd3] leading-relaxed">
                  Cada alicate, gubia y fresa se almacena en sobres de grado médico termosellados individualmente, abiertos exclusivamente frente al paciente.
                </p>
                <div className="mt-auto pt-2 text-[#9af6b8] text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Apertura frente a ti</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white/5 rounded-2xl p-6 flex flex-col gap-3 border border-white/10 hover:border-[#9af6b8]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#006d3d] text-white text-base flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold text-[#e7fff2]">
                  Autoclave Clase B
                </h3>
                <p className="text-xs text-[#c8dfd3] leading-relaxed">
                  Esterilización por calor húmedo bajo presión a 134°C con indicador químico y biológico de viraje de color certificado.
                </p>
                <div className="mt-auto pt-2 text-[#9af6b8] text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>134°C Presión Quirúrgica</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white/5 rounded-2xl p-6 flex flex-col gap-3 border border-white/10 hover:border-[#9af6b8]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#006d3d] text-white text-base flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="text-lg font-bold text-[#e7fff2]">
                  Descartables Únicos
                </h3>
                <p className="text-xs text-[#c8dfd3] leading-relaxed">
                  Limas, campos quirúrgicos, hojas de bisturí N°10/15 y gasas son 100% de un solo uso y descartadas en recipientes biocontaminados.
                </p>
                <div className="mt-auto pt-2 text-[#9af6b8] text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Residuos Normados MINSA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVIDENCIA DE RECUPERACIÓN */}
        <section id="recuperacion" className="py-20 bg-[#e1f9ec]/60">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-md border border-[#dcf3e7]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <span className="bg-[#dcf3e7] px-3.5 py-1 rounded-full text-[#006d3d] text-xs font-bold uppercase tracking-wider self-start">
                    Evidencia de Recuperación
                  </span>

                  <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#00341f]">
                    Volver a caminar sin dolor no es un lujo, es tu derecho
                  </h2>

                  <p className="text-sm sm:text-base text-[#404943] leading-relaxed">
                    Muchas personas postergan la consulta con el podólogo por vergüenza del aspecto de sus pies o por temor al dolor. En Vilenis encontrarás un espacio de respeto absoluto, silencio clínico confortante y manos expertas que tratan cada caso con suavidad y técnica refinada.
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-col gap-4 pt-2">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#00341f] mb-1.5">
                        <span>Alivio del dolor en la 1era sesión</span>
                        <span>{publishedContent.statPainRelief}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#dcf3e7] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#00341f]"
                          style={{ width: `${publishedContent.statPainRelief}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#00341f] mb-1.5">
                        <span>Satisfacción de pacientes en Lima</span>
                        <span>{publishedContent.statSatisfaction}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#dcf3e7] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#006d3d]"
                          style={{ width: `${publishedContent.statSatisfaction}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#00341f] mb-1.5">
                        <span>Éxito en espiculotomía sin recidiva dolorosa</span>
                        <span>{publishedContent.statRecidivismRate}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#dcf3e7] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#154c33]"
                          style={{ width: `${publishedContent.statRecidivismRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#citas-contacto"
                      className="inline-flex items-center gap-2 bg-[#00341f] hover:bg-[#154c33] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-[#9af6b8]" />
                      <span>Separa tu consulta de evaluación</span>
                    </a>
                  </div>
                </div>

                {/* Dual image clinical showcase */}
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#dcf3e7] shadow-sm border border-[#dcf3e7]">
                      <img
                        src={publishedContent.sterileTrayImageUrl}
                        alt="Bandeja de instrumental esterilizado"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center text-[#404943] font-medium">
                      Bandeja estéril antes de cada tratamiento
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-6">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#dcf3e7] shadow-sm border border-[#dcf3e7]">
                      <img
                        src={publishedContent.restoredFeetImageUrl}
                        alt="Pies sanos y rehabilitados tras la quiropodia"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center text-[#404943] font-medium">
                      Resultados estéticos y funcionales inmediatos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section id="testimonios" className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006d3d]">
                Opiniones Verificadas
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#00341f]">
                La confianza de nuestros pacientes en Lima
              </h2>
              <p className="text-sm sm:text-base text-[#404943]">
                Historias de alivio real contadas por vecinos y familias que volvieron a disfrutar cada caminata sin dolor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publishedContent.testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-[#f7faf8] rounded-2xl p-6 shadow-sm flex flex-col justify-between border border-[#dcf3e7]"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1 text-[#006d3d]">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#006d3d] text-[#006d3d]"
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#0b1f18] italic leading-relaxed">
                      “{test.comment}”
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 mt-6 border-t border-[#dcf3e7]">
                    <div className="w-10 h-10 rounded-full bg-[#154c33] text-white font-bold flex items-center justify-center text-xs">
                      {test.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#00341f]">{test.name}</p>
                      <p className="text-xs text-[#404943]">
                        {test.district} · {test.service}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UBICACIÓN, COBERTURA & FORMULARIO DE RESERVA */}
        <section id="citas-contacto" className="py-20 bg-[#e1f9ec]/60">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Column (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md flex flex-col gap-6 border border-[#dcf3e7]">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#006d3d]">
                    Atención Inmediata
                  </span>
                  <h2 className="font-playfair text-3xl font-bold text-[#00341f]">
                    Agenda tu Cita Médica
                  </h2>
                  <p className="text-sm text-[#404943]">
                    Elige el servicio que necesitas y recibe confirmación instantánea con la especialista en tu WhatsApp.
                  </p>
                </div>

                {bookingSuccess && (
                  <div className="p-3 bg-[#dcf3e7] text-[#00341f] rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#97f3b5]">
                    <CheckCircle className="w-4 h-4 text-[#006d3d]" />
                    <span>¡Solicitud preparada! Se abrirá WhatsApp para coordinar tu horario con la Dra. Vilenis.</span>
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#00341f]">
                        Nombre y Apellido
                      </label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Ej. Patricia Mendoza"
                        className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1f18] focus:bg-white border border-[#c0c9c1]/40 focus:border-[#006d3d] focus:ring-2 focus:ring-[#97f3b5] outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#00341f]">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="Ej. 900 572 454"
                        className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1f18] focus:bg-white border border-[#c0c9c1]/40 focus:border-[#006d3d] focus:ring-2 focus:ring-[#97f3b5] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#00341f]">
                        Tratamiento o Motivo
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1f18] focus:bg-white border border-[#c0c9c1]/40 focus:border-[#006d3d] outline-none"
                      >
                        {publishedContent.services
                          .filter((s) => s.active)
                          .map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title} (S/ {s.price})
                            </option>
                          ))}
                        <option value="Otra consulta podológica general">
                          Otra consulta podológica
                        </option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#00341f]">
                        Modalidad Deseada
                      </label>
                      <select
                        value={modality}
                        onChange={(e) => setModality(e.target.value)}
                        className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1f18] focus:bg-white border border-[#c0c9c1]/40 focus:border-[#006d3d] outline-none"
                      >
                        <option value="Consultorio Clínico">En Consultorio Clínico</option>
                        <option value="Atención a Domicilio">Visita Podológica a Domicilio</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#00341f]">
                      Describe brevemente tu molestia o zona del dolor
                    </label>
                    <textarea
                      rows={3}
                      value={patientComments}
                      onChange={(e) => setPatientComments(e.target.value)}
                      placeholder="Ej. Presento dolor en el dedo gordo del pie derecho al rozar el calzado desde hace 3 días..."
                      className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2.5 text-sm text-[#0b1f18] focus:bg-white border border-[#c0c9c1]/40 focus:border-[#006d3d] focus:ring-2 focus:ring-[#97f3b5] outline-none resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#00341f] hover:bg-[#154c33] text-white font-semibold text-sm py-3.5 px-6 rounded-full shadow-md transition-all active:scale-95 cursor-pointer mt-2"
                  >
                    <MessageCircle className="w-5 h-5 text-[#9af6b8]" />
                    <span>Enviar Solicitud a WhatsApp Directo</span>
                  </button>

                  <p className="text-[11px] text-center text-[#404943]">
                    Tus datos se manejan con estricto secreto médico profesional.
                  </p>
                </form>
              </div>

              {/* District & Location Column (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {/* Coverage Distritos */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-3 border border-[#dcf3e7]">
                  <div className="flex items-center gap-2 text-[#00341f]">
                    <MapPin className="w-5 h-5 text-[#006d3d]" />
                    <h3 className="text-base font-bold text-[#00341f]">
                      Cobertura Domiciliaria en Lima
                    </h3>
                  </div>
                  <p className="text-xs text-[#404943]">
                    Para pacientes con movilidad comprometida o familias que prefieren la comodidad del hogar, coordinamos visitas en:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {publishedContent.districts.map((district, i) => (
                      <span
                        key={i}
                        className="bg-[#dcf3e7] text-[#00341f] px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {district}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Schedule & Location */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-3 border border-[#dcf3e7]">
                  <div className="flex items-center gap-2 text-[#00341f]">
                    <Clock className="w-5 h-5 text-[#006d3d]" />
                    <h3 className="text-base font-bold text-[#00341f]">
                      Horario de Consultorio
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2 text-xs divide-y divide-[#dcf3e7]">
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#404943]">Lunes a Viernes</span>
                      <span className="font-bold text-[#00341f]">
                        {publishedContent.hoursWeekday}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#404943]">Sábados</span>
                      <span className="font-bold text-[#00341f]">
                        {publishedContent.hoursSaturday}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#404943]">Urgencias Podológicas</span>
                      <span className="font-bold text-[#006d3d]">
                        Coordinación 24/7 vía WhatsApp
                      </span>
                    </div>
                  </div>

                  {/* Direct Phone */}
                  <div className="mt-2 p-3 bg-[#e1f9ec] rounded-xl flex items-center justify-between border border-[#97f3b5]/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#00341f] text-white flex items-center justify-center">
                        <Phone className="w-4 h-4 text-[#9af6b8]" />
                      </div>
                      <div>
                        <span className="text-[11px] text-[#404943] block">
                          Línea Oficial:
                        </span>
                        <a
                          href={`tel:+${publishedContent.whatsappNumber}`}
                          className="text-sm font-bold text-[#00341f] hover:text-[#006d3d]"
                        >
                          {publishedContent.whatsappDisplay}
                        </a>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/${publishedContent.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#00341f] text-white rounded-full hover:bg-[#154c33] transition-colors"
                      title="Abrir chat en WhatsApp"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Map snippet */}
                <div className="w-full h-44 rounded-3xl bg-[#dcf3e7] shadow-sm overflow-hidden relative border border-[#dcf3e7] group">
                  <img
                    src={publishedContent.mapImageUrl}
                    alt="Mapa de ubicación en Lima Metropolitana"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2 text-white text-xs font-semibold">
                      <MapPin className="w-4 h-4 text-[#9af6b8]" />
                      <span>{publishedContent.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES (FAQ) */}
        <section id="faq" className="py-20 bg-white">
          <div className="max-w-[860px] mx-auto px-4 lg:px-8">
            <div className="text-center mb-12 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006d3d]">
                Claridad & Confianza
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#00341f]">
                Preguntas Frecuentes
              </h2>
              <p className="text-sm text-[#404943]">
                Respondemos tus dudas más habituales sobre la atención podológica especializada.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {publishedContent.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className="bg-[#f7faf8] rounded-2xl shadow-sm border border-[#dcf3e7] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 font-bold text-sm sm:text-base text-[#00341f] hover:text-[#006d3d] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#00341f] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#006d3d]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#404943] leading-relaxed border-t border-[#dcf3e7] pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA BANNER */}
        <section className="py-20 bg-gradient-to-r from-[#00341f] to-[#154c33] text-white">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8 text-center flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#dcf3e7]/20 flex items-center justify-center text-[#9af6b8]">
              <span className="material-symbols-outlined text-[36px]">
                directions_walk
              </span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold max-w-2xl text-[#e7fff2]">
              Tus pies cargan con todo tu mundo. Regálales el cuidado médico que merecen.
            </h2>

            <p className="text-base sm:text-lg text-[#d6eee1] max-w-xl">
              Agenda hoy tu consulta con la {publishedContent.doctorName}. Atención con calidez, paciencia y resultados desde la primera sesión en Lima.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/${publishedContent.whatsappNumber}?text=${encodeURIComponent('Hola Vilenis, deseo agendar mi cita podológica hoy.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#006d3d] hover:bg-[#97f3b5] hover:text-[#00341f] text-white font-bold text-base px-8 py-3.5 rounded-full shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Escribir al WhatsApp ({publishedContent.whatsappDisplay})</span>
              </a>

              <a
                href={`tel:+${publishedContent.whatsappNumber}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-6 py-3.5 rounded-full transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar por teléfono</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#20342c] text-white/90">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#006d3d] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    footprint
                  </span>
                </div>
                <span className="font-playfair text-xl font-bold text-[#e7fff2]">
                  {publishedContent.clinicName}
                </span>
              </div>
              <p className="text-xs text-[#c8dfd3] leading-relaxed">
                Clínica especializada en biomecánica, quiropodia avanzada y salud integral del pie. Atención personalizada y riguroso estándar de esterilización médica en Lima, Perú.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#154c33] text-[#9af6b8] text-[11px] font-semibold border border-[#2d8a56]/40">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Colegiatura Profesional Habilitada</span>
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold text-[#e7fff2]">Contacto & Citas</h3>
              <ul className="flex flex-col gap-2.5 text-xs text-[#c8dfd3]">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-[#9af6b8] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-white font-medium">WhatsApp / Llamadas:</span>
                    <a
                      href={`https://wa.me/${publishedContent.whatsappNumber}`}
                      className="hover:text-white transition-colors"
                    >
                      {publishedContent.whatsappDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#9af6b8] shrink-0 mt-0.5" />
                  <span>{publishedContent.address}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#9af6b8] shrink-0 mt-0.5">
                    mail
                  </span>
                  <a
                    href={`mailto:${publishedContent.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {publishedContent.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold text-[#e7fff2]">Horarios Clínicos</h3>
              <ul className="flex flex-col gap-2 text-xs text-[#c8dfd3]">
                <li className="flex justify-between border-b border-white/10 pb-1.5">
                  <span>Lunes a Viernes</span>
                  <span className="text-white font-semibold">
                    {publishedContent.hoursWeekday}
                  </span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-1.5">
                  <span>Sábados</span>
                  <span className="text-white font-semibold">
                    {publishedContent.hoursSaturday}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Domingos & Feriados</span>
                  <span className="text-[#edbf7a] font-semibold">
                    {publishedContent.hoursSunday}
                  </span>
                </li>
              </ul>
              <div className="pt-1">
                <span className="text-[11px] text-[#9af6b8] font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Atención de Urgencias Podológicas</span>
                </span>
              </div>
            </div>

            {/* Quick links & CMS switch */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold text-[#e7fff2]">Accesos Rápidos</h3>
              <nav className="flex flex-col gap-1.5 text-xs text-[#c8dfd3]">
                <a href="#servicios" className="hover:text-white transition-colors">
                  Tratamiento de Uña Encarnada
                </a>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Pie Diabético Preventivo
                </a>
                <a href="#bioseguridad" className="hover:text-white transition-colors">
                  Esterilización y Bioseguridad
                </a>
                <a href="#citas-contacto" className="hover:text-white transition-colors">
                  Sede & Cobertura a Domicilio
                </a>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      openAuthModal();
                    } else {
                      setActiveView('cms');
                    }
                  }}
                  className="text-left text-[#9af6b8] hover:underline font-semibold flex items-center gap-1 mt-1 cursor-pointer"
                >
                  {isAuthenticated ? (
                    <>
                      <Settings className="w-3.5 h-3.5" />
                      <span>Panel CMS (Sesión Iniciada)</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#edbf7a]" />
                      <span>Acceso Exclusivo Propietaria (Dra. Vilenis)</span>
                    </>
                  )}
                </button>
              </nav>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#c8dfd3] text-center md:text-left">
            <p>
              © 2026 {publishedContent.clinicName} Podología Clínica. Todos los derechos reservados. Lima, Perú.
            </p>
            <div className="flex items-center gap-4">
              <a href="#inicio" className="hover:text-white">Privacidad Médica</a>
              <span>·</span>
              <a href="#inicio" className="hover:text-white">Consentimiento Informado</a>
              <span>·</span>
              <a href="#inicio" className="hover:text-white">Libro de Reclamaciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
