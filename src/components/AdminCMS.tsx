import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { LiveDevicePreview } from './LiveDevicePreview';
import { NewServiceModal } from './NewServiceModal';
import { EditImageModal } from './EditImageModal';
import { ServiceItem, MediaImage } from '../types';
import {
  Space as LayoutDashboard,
  FileEdit,
  Stethoscope,
  Images,
  CalendarClock,
  Sliders,
  ExternalLink,
  Bell,
  User,
  RotateCcw,
  Bookmark,
  Rocket,
  CheckCircle,
  X,
  Plus,
  ArrowUp,
  ArrowDown,
  Edit2,
  Trash2,
  Upload,
  RefreshCw,
  Crop,
  Search,
} from 'lucide-react';

export const AdminCMS: React.FC = () => {
  const {
    draftContent,
    updateDraft,
    publishChanges,
    discardDraft,
    saveDraft,
    resetToDefault,
    lastPublishedTime,
    hasUnsavedChanges,
    toggleServiceActive,
    deleteService,
    moveService,
    deleteImage,
    setActiveView,
    toast,
    dismissToast,
  } = useClinic();

  // Active navigation tab
  const [navTab, setNavTab] = useState<
    'editor' | 'overview' | 'services' | 'gallery' | 'schedules' | 'settings'
  >('editor');

  // Active section in the editor navigator
  const [activeSection, setActiveSection] = useState<
    'hero' | 'services' | 'about' | 'gallery' | 'biosecurity' | 'testimonials' | 'whatsapp'
  >('hero');

  // Modals
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceItem | null>(null);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<MediaImage | null>(null);

  // Search filter for services
  const [serviceFilter, setServiceFilter] = useState('');

  const openAddService = () => {
    setServiceToEdit(null);
    setIsServiceModalOpen(true);
  };

  const openEditService = (service: ServiceItem) => {
    setServiceToEdit(service);
    setIsServiceModalOpen(true);
  };

  const openAddImage = () => {
    setImageToEdit(null);
    setIsImageModalOpen(true);
  };

  const openEditImage = (img: MediaImage) => {
    setImageToEdit(img);
    setIsImageModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#e7fff2]/30 text-[#0b1f18] flex font-jakarta">
      {/* SIDEBAR (Matching Image 4) */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#e1f9ec] z-50 flex flex-col justify-between py-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#dcf3e7]">
        <div className="flex flex-col">
          {/* Logo & CMS Title */}
          <div className="px-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00341f] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[24px] text-[#9af6b8]">
                  medical_services
                </span>
              </div>
              <div>
                <span className="font-playfair text-lg font-bold text-[#00341f] block leading-tight tracking-tight">
                  {draftContent.clinicName}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006d3d] block">
                  Podología Clínica
                </span>
              </div>
            </div>
            <div className="mt-2.5 px-2.5 py-1 rounded-md bg-[#dcf3e7] inline-block border border-[#97f3b5]/40">
              <span className="text-xs text-[#404943] font-semibold">
                Panel de Gestión CMS
              </span>
            </div>
          </div>

          {/* Navigation Section Title */}
          <div className="px-6 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#404943]">
              Navegación Principal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-4">
            <button
              type="button"
              onClick={() => setNavTab('overview')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                navTab === 'overview'
                  ? 'bg-[#154c33] text-white shadow-sm'
                  : 'text-[#404943] hover:bg-[#d6eee1] hover:text-[#0b1f18]'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Vista General</span>
            </button>

            <button
              type="button"
              onClick={() => setNavTab('editor')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                navTab === 'editor'
                  ? 'bg-[#154c33] text-white shadow-sm'
                  : 'text-[#404943] hover:bg-[#d6eee1] hover:text-[#0b1f18]'
              }`}
            >
              <FileEdit className="w-5 h-5" />
              <span>Editor de Contenidos</span>
            </button>

            <button
              type="button"
              onClick={() => setNavTab('services')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                navTab === 'services'
                  ? 'bg-[#154c33] text-white shadow-sm'
                  : 'text-[#404943] hover:bg-[#d6eee1] hover:text-[#0b1f18]'
              }`}
            >
              <Stethoscope className="w-5 h-5" />
              <span>Servicios y Tratamientos</span>
            </button>

            <button
              type="button"
              onClick={() => setNavTab('gallery')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                navTab === 'gallery'
                  ? 'bg-[#154c33] text-white shadow-sm'
                  : 'text-[#404943] hover:bg-[#d6eee1] hover:text-[#0b1f18]'
              }`}
            >
              <Images className="w-5 h-5" />
              <span>Galería & Casos Clínicos</span>
            </button>

            <button
              type="button"
              onClick={() => setNavTab('schedules')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                navTab === 'schedules'
                  ? 'bg-[#154c33] text-white shadow-sm'
                  : 'text-[#404943] hover:bg-[#d6eee1] hover:text-[#0b1f18]'
              }`}
            >
              <CalendarClock className="w-5 h-5" />
              <span>Horarios y Citas WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => setNavTab('settings')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                navTab === 'settings'
                  ? 'bg-[#154c33] text-white shadow-sm'
                  : 'text-[#404943] hover:bg-[#d6eee1] hover:text-[#0b1f18]'
              }`}
            >
              <Sliders className="w-5 h-5" />
              <span>Configuración</span>
            </button>
          </nav>
        </div>

        {/* Bottom Support Card */}
        <div className="px-4 pt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dcf3e7]">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle className="w-4 h-4 text-[#006d3d]" />
              <span className="text-xs font-bold text-[#00341f]">
                Soporte Podológico
              </span>
            </div>
            <p className="text-[11px] text-[#404943] leading-snug mb-2">
              Sincronización directa con agenda y fichas digitales.
            </p>
            <button
              type="button"
              onClick={() => setActiveView('website')}
              className="flex items-center justify-between text-[#006d3d] text-xs font-bold cursor-pointer hover:underline w-full"
            >
              <span>Ver Portal Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="pl-72 w-full flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 right-0 h-20 bg-white/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#dcf3e7]">
          <div className="w-full h-20 px-8 flex items-center justify-between">
            {/* Breadcrumb & Site Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#404943]">
                <span
                  onClick={() => setActiveView('website')}
                  className="hover:text-[#00341f] cursor-pointer"
                >
                  Clínica {draftContent.clinicName}
                </span>
                <span className="text-[#c0c9c1]">/</span>
                <span className="font-bold text-[#00341f]">
                  Panel Administrativo
                </span>
              </div>

              <div className="h-4 w-[1px] bg-[#c0c9c1] hidden sm:block"></div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#d6eee1] text-[#00341f] text-xs font-semibold border border-[#97f3b5]/40">
                <span className="w-2 h-2 rounded-full bg-[#006d3d] animate-pulse"></span>
                <span>Sitio Web: En Vivo / Publicado</span>
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setActiveView('website')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#154c33] text-white text-xs font-semibold hover:bg-[#00341f] transition-all shadow-sm cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden md:inline">Ver Sitio Público</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  alert('Notificaciones: Tienes 3 nuevas solicitudes de cita vía WhatsApp hoy.')
                }
                className="w-10 h-10 rounded-full bg-[#dcf3e7] hover:bg-[#d6eee1] text-[#404943] hover:text-[#0b1f18] flex items-center justify-center transition-colors relative cursor-pointer"
                title="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              </button>

              <div className="flex items-center gap-2.5 pl-2 py-1 pr-3 rounded-full bg-white shadow-xs border border-[#dcf3e7]">
                <div className="w-8 h-8 rounded-full bg-[#00341f] flex items-center justify-center text-white">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#00341f] leading-tight">
                    {draftContent.doctorName}
                  </span>
                  <span className="text-[10px] text-[#404943] leading-none">
                    {draftContent.doctorRole}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Command & Status Bar */}
        <div className="w-full bg-[#e1f9ec]/50 backdrop-blur-md px-8 py-5 border-b border-[#dcf3e7]">
          <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#404943] font-bold">
                <span>Administración</span>
                <span className="text-[#c0c9c1]">/</span>
                <span className="text-[#006d3d]">Editor de Contenidos Web</span>
              </div>
              <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#00341f] tracking-tight">
                Editor de Contenidos Web & Gestión de Consultorio
              </h1>
              <p className="text-xs sm:text-sm text-[#404943] max-w-3xl">
                Actualiza en tiempo real los textos, imágenes clínicas, servicios, tarifas y mensajes de WhatsApp de tu sitio web sin necesidad de tocar código.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#dcf3e7] text-[#404943] text-xs font-medium border border-[#97f3b5]/40">
                <span className="w-2 h-2 rounded-full bg-[#006d3d]"></span>
                <span>
                  Última publicación: <strong className="text-[#0b1f18]">{lastPublishedTime}</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={discardDraft}
                disabled={!hasUnsavedChanges}
                className="px-4 py-2 rounded-full bg-white hover:bg-[#d6eee1] text-[#0b1f18] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs border border-[#c0c9c1]/40 disabled:opacity-50 cursor-pointer"
                title="Descartar cambios no publicados"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Descartar</span>
              </button>

              <button
                type="button"
                onClick={saveDraft}
                className="px-4 py-2 rounded-full bg-white hover:bg-[#d6eee1] text-[#0b1f18] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs border border-[#c0c9c1]/40 cursor-pointer"
                title="Guardar borrador"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Guardar Borrador</span>
              </button>

              <button
                type="button"
                onClick={publishChanges}
                className="px-5 py-2 rounded-full bg-[#154c33] hover:bg-[#00341f] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 group"
                title="Publicar cambios en el sitio web en vivo"
              >
                <Rocket className="w-4 h-4 transition-transform group-hover:rotate-12 text-[#9af6b8]" />
                <span>Publicar Cambios en Vivo</span>
              </button>
            </div>
          </div>
        </div>

        {/* WORKSPACE CANVAS */}
        <main className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 py-8 flex-1">
          {navTab === 'editor' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* COLUMN 1: Sections Navigator (3 cols) */}
              <div className="lg:col-span-3 flex flex-col gap-5">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dcf3e7]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#dcf3e7]">
                    <span className="text-xs uppercase tracking-wider text-[#404943] font-bold">
                      Estructura del Portal
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#dcf3e7] text-[#006d3d] text-[10px] font-bold">
                      7 Secciones
                    </span>
                  </div>

                  <nav className="flex flex-col gap-1.5 mt-3">
                    {/* 1. Cabecera & Hero */}
                    <button
                      type="button"
                      onClick={() => setActiveSection('hero')}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        activeSection === 'hero'
                          ? 'bg-[#d6eee1] text-[#00341f] font-bold shadow-xs'
                          : 'hover:bg-[#f7faf8] text-[#404943]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#154c33] text-white flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">
                            view_carousel
                          </span>
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold block truncate">
                            Cabecera & Hero
                          </span>
                          <span className="text-[10px] text-[#006d3d] font-semibold">
                            {activeSection === 'hero' ? 'Editando ahora' : 'Configurado'}
                          </span>
                        </div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-[#006d3d] shrink-0"></span>
                    </button>

                    {/* 2. Servicios & Tarifas */}
                    <button
                      type="button"
                      onClick={() => setActiveSection('services')}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        activeSection === 'services'
                          ? 'bg-[#d6eee1] text-[#00341f] font-bold shadow-xs'
                          : 'hover:bg-[#f7faf8] text-[#404943]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#dcf3e7] text-[#00341f] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">
                            healing
                          </span>
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold block truncate">
                            Servicios & Tarifas
                          </span>
                          <span className="text-[10px] text-[#404943]">
                            {draftContent.services.filter((s) => s.active).length} activos
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#c0c9c1] text-[16px]">
                        chevron_right
                      </span>
                    </button>

                    {/* 3. Sobre Mí & Biografía */}
                    <button
                      type="button"
                      onClick={() => setActiveSection('about')}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        activeSection === 'about'
                          ? 'bg-[#d6eee1] text-[#00341f] font-bold shadow-xs'
                          : 'hover:bg-[#f7faf8] text-[#404943]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#dcf3e7] text-[#00341f] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">
                            badge
                          </span>
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold block truncate">
                            Sobre Mí & Biografía
                          </span>
                          <span className="text-[10px] text-[#404943]">
                            Foto perfil y filosofía
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#c0c9c1] text-[16px]">
                        chevron_right
                      </span>
                    </button>

                    {/* 4. Galería Antes / Después */}
                    <button
                      type="button"
                      onClick={() => setActiveSection('gallery')}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        activeSection === 'gallery'
                          ? 'bg-[#d6eee1] text-[#00341f] font-bold shadow-xs'
                          : 'hover:bg-[#f7faf8] text-[#404943]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#dcf3e7] text-[#00341f] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">
                            compare
                          </span>
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold block truncate">
                            Galería Antes / Después
                          </span>
                          <span className="text-[10px] text-[#404943]">
                            Fotos clínicas
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#c0c9c1] text-[16px]">
                        chevron_right
                      </span>
                    </button>

                    {/* 5. Bioseguridad */}
                    <button
                      type="button"
                      onClick={() => setActiveSection('biosecurity')}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        activeSection === 'biosecurity'
                          ? 'bg-[#d6eee1] text-[#00341f] font-bold shadow-xs'
                          : 'hover:bg-[#f7faf8] text-[#404943]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#dcf3e7] text-[#00341f] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">
                            sanitizer
                          </span>
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold block truncate">
                            Bioseguridad & Esterilización
                          </span>
                          <span className="text-[10px] text-[#404943]">
                            4 fases MINSA
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#c0c9c1] text-[16px]">
                        chevron_right
                      </span>
                    </button>

                    {/* 6. Testimonios */}
                    <button
                      type="button"
                      onClick={() => setActiveSection('testimonials')}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        activeSection === 'testimonials'
                          ? 'bg-[#d6eee1] text-[#00341f] font-bold shadow-xs'
                          : 'hover:bg-[#f7faf8] text-[#404943]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#dcf3e7] text-[#00341f] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">
                            star
                          </span>
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold block truncate">
                            Testimonios de Pacientes
                          </span>
                          <span className="text-[10px] text-[#404943]">
                            {draftContent.testimonials.length} valoraciones 5.0
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#c0c9c1] text-[16px]">
                        chevron_right
                      </span>
                    </button>

                    {/* 7. WhatsApp & Horarios */}
                    <button
                      type="button"
                      onClick={() => setActiveSection('whatsapp')}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        activeSection === 'whatsapp'
                          ? 'bg-[#d6eee1] text-[#00341f] font-bold shadow-xs'
                          : 'hover:bg-[#f7faf8] text-[#404943]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#dcf3e7] text-[#00341f] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">
                            chat
                          </span>
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold block truncate">
                            WhatsApp & Horarios
                          </span>
                          <span className="text-[10px] text-[#006d3d] font-medium">
                            {draftContent.whatsappDisplay}
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#c0c9c1] text-[16px]">
                        chevron_right
                      </span>
                    </button>
                  </nav>
                </div>

                {/* Quick SEO & Health Status Card */}
                <div className="bg-[#d6eee1] rounded-xl p-4 flex flex-col gap-2 text-[#0b1f18] shadow-sm border border-[#97f3b5]/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00341f]">
                      Salud del Portal
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#97f3b5] text-[#00341f] text-[10px] font-bold">
                      98/100
                    </span>
                  </div>
                  <p className="text-[11px] text-[#404943] leading-snug">
                    Puntuación de velocidad óptima, datos clínicos estructurados y sincronización activa con Google Mi Negocio Lima.
                  </p>
                  <div className="w-full bg-[#c0c9c1]/40 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div className="bg-[#006d3d] h-full rounded-full w-[98%]"></div>
                  </div>
                </div>
              </div>

              {/* COLUMN 2: Editor Form & Multimedia (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* SECTION 1: Text Editor (Hero Section) */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dcf3e7] flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#dcf3e7] text-[#00341f] flex items-center justify-center">
                        <Edit2 className="w-4 h-4 text-[#006d3d]" />
                      </div>
                      <h2 className="text-base font-bold text-[#00341f]">
                        Edición de Textos Principales
                      </h2>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#d6eee1] text-[#00341f] text-[10px] font-bold">
                      Hero Section
                    </span>
                  </div>

                  {/* Titular H1 */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#00341f]">
                        Titular Principal (H1)
                      </label>
                      <span className="text-[11px] text-[#404943]">
                        {draftContent.heroTitle.length} / 70 caracteres
                      </span>
                    </div>
                    <input
                      type="text"
                      value={draftContent.heroTitle}
                      onChange={(e) => updateDraft({ heroTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#f7faf8] text-[#0b1f18] text-sm font-semibold border border-[#c0c9c1]/40 focus:border-[#006d3d] focus:bg-white focus:ring-1 focus:ring-[#97f3b5] outline-none transition-all"
                    />
                  </div>

                  {/* Subtítulo */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#00341f]">
                        Subtítulo / Bajada Descriptiva
                      </label>
                      <div className="flex items-center gap-1 bg-[#dcf3e7] px-2 py-0.5 rounded-md text-[#404943] text-xs">
                        <button
                          type="button"
                          onClick={() =>
                            updateDraft({
                              heroSubtitle: `*${draftContent.heroSubtitle}*`,
                            })
                          }
                          className="hover:text-[#00341f] font-bold px-1"
                          title="Negrita"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateDraft({
                              heroSubtitle: `_${draftContent.heroSubtitle}_`,
                            })
                          }
                          className="hover:text-[#00341f] italic px-1"
                          title="Cursiva"
                        >
                          I
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={draftContent.heroSubtitle}
                      onChange={(e) => updateDraft({ heroSubtitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#f7faf8] text-[#0b1f18] text-xs sm:text-sm border border-[#c0c9c1]/40 focus:border-[#006d3d] focus:bg-white focus:ring-1 focus:ring-[#97f3b5] outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Default WhatsApp Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#00341f] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#006d3d] text-[18px]">
                        chat_bubble
                      </span>
                      <span>Mensaje Predeterminado de WhatsApp Directo</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={draftContent.defaultWhatsAppMessage}
                        onChange={(e) =>
                          updateDraft({ defaultWhatsAppMessage: e.target.value })
                        }
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-lg bg-[#f7faf8] text-[#0b1f18] text-xs sm:text-sm border border-[#c0c9c1]/40 focus:border-[#006d3d] focus:bg-white outline-none"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#006d3d] text-[20px] pointer-events-none">
                        send
                      </span>
                    </div>
                    <span className="text-[11px] text-[#404943]">
                      Se autocompleta cuando un paciente hace clic en "Agendar Cita" desde el móvil o desktop.
                    </span>
                  </div>
                </div>

                {/* SECTION 2: Media Asset Manager */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dcf3e7] flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#dcf3e7] text-[#00341f] flex items-center justify-center">
                        <Images className="w-4 h-4 text-[#006d3d]" />
                      </div>
                      <h2 className="text-base font-bold text-[#00341f]">
                        Gestor de Imágenes Médicas
                      </h2>
                    </div>
                    <span className="text-xs text-[#006d3d] font-bold">
                      {draftContent.mediaGallery.length} Fotos Activas
                    </span>
                  </div>

                  {/* Drag and Drop Slot */}
                  <div
                    onClick={openAddImage}
                    className="rounded-xl p-6 bg-[#f7faf8] hover:bg-[#d6eee1]/40 transition-colors border-2 border-dashed border-[#c0c9c1] text-center flex flex-col items-center justify-center gap-2 cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white group-hover:scale-105 transition-transform flex items-center justify-center text-[#006d3d] shadow-sm border border-[#dcf3e7]">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#00341f]">
                        Arrastra aquí tus fotos médicas o haz clic para explorar
                      </span>
                      <span className="text-[11px] text-[#404943]">
                        Formatos recomendados: JPG, WebP o PNG de alta fidelidad (hasta 10MB)
                      </span>
                    </div>
                  </div>

                  {/* Active Images Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {draftContent.mediaGallery.map((img) => (
                      <div
                        key={img.id}
                        className="rounded-lg overflow-hidden bg-[#f7faf8] border border-[#dcf3e7] flex flex-col shadow-xs group"
                      >
                        <div className="relative h-28 w-full overflow-hidden bg-[#dcf3e7]">
                          <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#154c33] text-white text-[9px] font-bold shadow-xs">
                            {img.tag}
                          </span>
                        </div>
                        <div className="p-2.5 flex flex-col gap-1">
                          <span className="text-xs font-bold text-[#00341f] truncate">
                            {img.title}
                          </span>
                          <div className="flex items-center justify-between text-[#404943] text-[10px]">
                            <span>{img.dimensions}</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => openEditImage(img)}
                                className="p-1 hover:text-[#00341f] transition-colors cursor-pointer"
                                title="Reemplazar URL"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteImage(img.id)}
                                className="p-1 hover:text-[#ba1a1a] transition-colors cursor-pointer"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Photo Card */}
                    <button
                      type="button"
                      onClick={openAddImage}
                      className="rounded-lg p-3 bg-white hover:bg-[#dcf3e7] transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[140px] text-center border border-dashed border-[#c0c9c1]"
                    >
                      <Plus className="w-6 h-6 text-[#006d3d]" />
                      <span className="text-xs text-[#00341f] font-bold">
                        + Añadir Foto Médica
                      </span>
                      <span className="text-[10px] text-[#404943]">
                        Galería o consultorio
                      </span>
                    </button>
                  </div>
                </div>

                {/* SECTION 3: Services & Pricing Management */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dcf3e7] flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#dcf3e7] text-[#00341f] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] text-[#006d3d]">
                          price_change
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-[#00341f]">
                        Gestión de Servicios y Tarifas
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={openAddService}
                      className="px-3 py-1 rounded-full bg-[#dcf3e7] hover:bg-[#d6eee1] text-[#006d3d] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-[#97f3b5]/40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir Servicio</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#404943]">
                    Edita los precios referenciales que se muestran a los pacientes antes de iniciar el contacto por WhatsApp.
                  </p>

                  {/* Services List */}
                  <div className="flex flex-col gap-2">
                    {draftContent.services.map((srv, index) => (
                      <div
                        key={srv.id}
                        className={`p-3 rounded-lg flex items-center justify-between gap-3 transition-colors shadow-xs border ${
                          srv.active
                            ? 'bg-[#f7faf8] border-[#dcf3e7] hover:bg-[#e1f9ec]/60'
                            : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {/* Reorder Buttons */}
                          <div className="flex flex-col text-[#717972]">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => moveService(index, 'up')}
                              className="p-0.5 hover:text-[#00341f] disabled:opacity-20 cursor-pointer"
                              title="Subir posición"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === draftContent.services.length - 1}
                              onClick={() => moveService(index, 'down')}
                              className="p-0.5 hover:text-[#00341f] disabled:opacity-20 cursor-pointer"
                              title="Bajar posición"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="truncate">
                            <span className="text-xs font-bold text-[#00341f] block truncate">
                              {srv.title}
                            </span>
                            <span className="text-[10px] text-[#404943] block truncate">
                              {srv.description}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="text-sm font-bold text-[#006d3d]">
                              S/ {srv.price}
                            </span>
                            <span className="block text-[10px] text-[#404943]">
                              {srv.duration}
                            </span>
                          </div>

                          {/* Toggle Active Switch */}
                          <button
                            type="button"
                            onClick={() => toggleServiceActive(srv.id)}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                              srv.active ? 'bg-[#006d3d]' : 'bg-[#c0c9c1]'
                            }`}
                            title={srv.active ? 'Desactivar servicio' : 'Activar servicio'}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                                srv.active ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            ></div>
                          </button>

                          <button
                            type="button"
                            onClick={() => openEditService(srv)}
                            className="p-1 text-[#404943] hover:text-[#00341f] cursor-pointer"
                            title="Editar detalles"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteService(srv.id)}
                            className="p-1 text-[#404943] hover:text-[#ba1a1a] cursor-pointer"
                            title="Eliminar servicio"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* COLUMN 3: Live Preview & Simulated Device (4 cols) */}
              <div className="lg:col-span-4">
                <LiveDevicePreview />
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW STATS */}
          {navTab === 'overview' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-[#dcf3e7]">
                  <span className="text-xs text-[#404943]">Visitas Web (Hoy)</span>
                  <p className="font-playfair text-3xl font-bold text-[#00341f] mt-1">
                    142
                  </p>
                  <span className="text-[11px] text-[#006d3d] font-bold">
                    +18% vs semana pasada
                  </span>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-[#dcf3e7]">
                  <span className="text-xs text-[#404943]">Consultas WhatsApp</span>
                  <p className="font-playfair text-3xl font-bold text-[#00341f] mt-1">
                    18
                  </p>
                  <span className="text-[11px] text-[#006d3d] font-bold">
                    12 citas agendadas
                  </span>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-[#dcf3e7]">
                  <span className="text-xs text-[#404943]">Tasa de Conversión</span>
                  <p className="font-playfair text-3xl font-bold text-[#00341f] mt-1">
                    12.6%
                  </p>
                  <span className="text-[11px] text-[#404943]">
                    Excelente rendimiento
                  </span>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-[#dcf3e7]">
                  <span className="text-xs text-[#404943]">Servicios Activos</span>
                  <p className="font-playfair text-3xl font-bold text-[#00341f] mt-1">
                    {draftContent.services.filter((s) => s.active).length}
                  </p>
                  <span className="text-[11px] text-[#006d3d] font-bold">
                    De {draftContent.services.length} en catálogo
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#dcf3e7]">
                <h3 className="font-playfair text-xl font-bold text-[#00341f] mb-4">
                  Próximas Citas Coordinadas vía WhatsApp
                </h3>
                <div className="divide-y divide-[#dcf3e7] text-xs">
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#00341f]">Mariana Rodríguez</p>
                      <p className="text-[#404943]">
                        Uña Encarnada (Urgencia) • Miraflores
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#dcf3e7] text-[#006d3d] font-bold">
                      Hoy, 3:30 PM
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#00341f]">Carlos Alberto Silva</p>
                      <p className="text-[#404943]">
                        Podología Geriátrica a Domicilio • San Borja
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#dcf3e7] text-[#006d3d] font-bold">
                      Mañana, 10:00 AM
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#00341f]">Fiorella Vega</p>
                      <p className="text-[#404943]">
                        Quiropodia Integral Preventiva • Consultorio
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#dcf3e7] text-[#006d3d] font-bold">
                      Sábado, 11:30 AM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES TABLE */}
          {navTab === 'services' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dcf3e7] flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-[#00341f]">
                    Servicios y Tratamientos Clínicos
                  </h2>
                  <p className="text-xs text-[#404943]">
                    Administra el catálogo completo, activa o pausa servicios y modifica tarifas en Soles (PEN).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddService}
                  className="px-4 py-2 rounded-full bg-[#154c33] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Servicio</span>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#dcf3e7] text-[#404943] uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Servicio</th>
                      <th className="py-3 px-3">Categoría</th>
                      <th className="py-3 px-3">Duración</th>
                      <th className="py-3 px-3">Tarifa (S/)</th>
                      <th className="py-3 px-3">Estado</th>
                      <th className="py-3 px-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcf3e7]">
                    {draftContent.services.map((srv) => (
                      <tr key={srv.id} className="hover:bg-[#f7faf8]">
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-[#00341f] block">
                            {srv.title}
                          </span>
                          <span className="text-[11px] text-[#404943] line-clamp-1">
                            {srv.description}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#dcf3e7] text-[#006d3d] font-bold text-[10px]">
                            {srv.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-[#404943]">
                          {srv.duration}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-[#006d3d] text-sm">
                          S/ {srv.price}
                        </td>
                        <td className="py-3.5 px-3">
                          <button
                            type="button"
                            onClick={() => toggleServiceActive(srv.id)}
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] cursor-pointer ${
                              srv.active
                                ? 'bg-[#97f3b5] text-[#00341f]'
                                : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {srv.active ? 'Activo en Web' : 'Pausado'}
                          </button>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditService(srv)}
                              className="p-1 hover:text-[#00341f] cursor-pointer"
                              title="Editar"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteService(srv.id)}
                              className="p-1 hover:text-[#ba1a1a] cursor-pointer"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY */}
          {navTab === 'gallery' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dcf3e7] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-[#00341f]">
                    Galería Médica & Evidencia Clínica
                  </h2>
                  <p className="text-xs text-[#404943]">
                    Fotos de consultorio, bioseguridad, antes/después y certificados.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddImage}
                  className="px-4 py-2 rounded-full bg-[#154c33] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Subir Imagen</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {draftContent.mediaGallery.map((img) => (
                  <div
                    key={img.id}
                    className="rounded-xl overflow-hidden border border-[#dcf3e7] bg-[#f7faf8] flex flex-col shadow-xs"
                  >
                    <div className="h-44 w-full overflow-hidden bg-[#dcf3e7]">
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#00341f] block">
                          {img.title}
                        </span>
                        <span className="text-[10px] text-[#404943]">{img.tag}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => openEditImage(img)}
                        className="p-1.5 rounded-lg bg-[#dcf3e7] text-[#00341f] hover:bg-[#d6eee1] cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SCHEDULES & WHATSAPP */}
          {navTab === 'schedules' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dcf3e7] flex flex-col gap-6 max-w-2xl">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-[#00341f]">
                  Horarios Clínicos & WhatsApp de Citas
                </h2>
                <p className="text-xs text-[#404943]">
                  Ajusta la línea telefónica que recibe a los pacientes y los horarios de atención.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#00341f]">
                    Número de WhatsApp (con código de país)
                  </label>
                  <input
                    type="text"
                    value={draftContent.whatsappNumber}
                    onChange={(e) => updateDraft({ whatsappNumber: e.target.value })}
                    className="w-full bg-[#f7faf8] px-3.5 py-2 text-sm text-[#0b1f18] rounded-lg border border-[#c0c9c1]/40"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#00341f]">
                    Texto a Mostrar en Pantalla
                  </label>
                  <input
                    type="text"
                    value={draftContent.whatsappDisplay}
                    onChange={(e) => updateDraft({ whatsappDisplay: e.target.value })}
                    className="w-full bg-[#f7faf8] px-3.5 py-2 text-sm text-[#0b1f18] rounded-lg border border-[#c0c9c1]/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-[#00341f]">
                  Horarios de Atención
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-[#404943]">Lunes a Viernes</span>
                    <input
                      type="text"
                      value={draftContent.hoursWeekday}
                      onChange={(e) => updateDraft({ hoursWeekday: e.target.value })}
                      className="w-full bg-[#f7faf8] px-3 py-1.5 text-xs text-[#0b1f18] rounded-lg border border-[#c0c9c1]/40 mt-1"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#404943]">Sábados</span>
                    <input
                      type="text"
                      value={draftContent.hoursSaturday}
                      onChange={(e) => updateDraft({ hoursSaturday: e.target.value })}
                      className="w-full bg-[#f7faf8] px-3 py-1.5 text-xs text-[#0b1f18] rounded-lg border border-[#c0c9c1]/40 mt-1"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#404943]">Domingos / Feriados</span>
                    <input
                      type="text"
                      value={draftContent.hoursSunday}
                      onChange={(e) => updateDraft({ hoursSunday: e.target.value })}
                      className="w-full bg-[#f7faf8] px-3 py-1.5 text-xs text-[#0b1f18] rounded-lg border border-[#c0c9c1]/40 mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {navTab === 'settings' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dcf3e7] flex flex-col gap-6 max-w-2xl">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-[#00341f]">
                  Configuración del Portal Clínico
                </h2>
                <p className="text-xs text-[#404943]">
                  Ajustes generales, datos de contacto y opciones de respaldo.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#00341f]">
                    Nombre de la Clínica
                  </label>
                  <input
                    type="text"
                    value={draftContent.clinicName}
                    onChange={(e) => updateDraft({ clinicName: e.target.value })}
                    className="w-full bg-[#f7faf8] px-3.5 py-2 text-sm text-[#0b1f18] rounded-lg border border-[#c0c9c1]/40"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#00341f]">
                    Dirección del Consultorio
                  </label>
                  <input
                    type="text"
                    value={draftContent.address}
                    onChange={(e) => updateDraft({ address: e.target.value })}
                    className="w-full bg-[#f7faf8] px-3.5 py-2 text-sm text-[#0b1f18] rounded-lg border border-[#c0c9c1]/40"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#00341f]">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={draftContent.email}
                    onChange={(e) => updateDraft({ email: e.target.value })}
                    className="w-full bg-[#f7faf8] px-3.5 py-2 text-sm text-[#0b1f18] rounded-lg border border-[#c0c9c1]/40"
                  />
                </div>

                <div className="pt-4 border-t border-[#dcf3e7] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#00341f] block">
                      Restaurar datos predeterminados
                    </span>
                    <span className="text-[11px] text-[#404943]">
                      Restablece todos los textos, servicios y fotos al diseño original.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={resetToDefault}
                    className="px-4 py-2 rounded-lg bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Restaurar Todo
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      <NewServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        serviceToEdit={serviceToEdit}
      />

      <EditImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageItem={imageToEdit}
      />

      {/* TOAST NOTIFICATION (Matching Image 4) */}
      <div
        className={`fixed bottom-6 right-6 bg-[#154c33] text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-4 transition-all duration-300 z-50 border border-[#97f3b5]/40 ${
          toast.show ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-[#97f3b5] text-[#00341f] flex items-center justify-center shrink-0">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">{toast.title}</span>
          <span className="text-xs text-[#b7efcd]">{toast.message}</span>
        </div>
        <button
          type="button"
          onClick={dismissToast}
          className="ml-3 text-[#b7efcd] hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
