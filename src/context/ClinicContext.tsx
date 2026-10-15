import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, ServiceItem, MediaImage } from '../types';
import { INITIAL_CONTENT } from '../defaultData';

interface ToastState {
  show: boolean;
  title: string;
  message: string;
}

interface ClinicContextType {
  publishedContent: SiteContent;
  draftContent: SiteContent;
  activeView: 'website' | 'cms';
  setActiveView: (view: 'website' | 'cms') => void;
  devicePreviewMode: 'desktop' | 'mobile';
  setDevicePreviewMode: (mode: 'desktop' | 'mobile') => void;
  lastPublishedTime: string;
  hasUnsavedChanges: boolean;

  // Actions
  updateDraft: (updates: Partial<SiteContent>) => void;
  publishChanges: () => void;
  discardDraft: () => void;
  saveDraft: () => void;
  resetToDefault: () => void;

  // Service management
  toggleServiceActive: (id: string) => void;
  updateServicePrice: (id: string, price: number) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  addService: (newService: Omit<ServiceItem, 'id'>) => void;
  deleteService: (id: string) => void;
  moveService: (index: number, direction: 'up' | 'down') => void;

  // Image management
  updateImage: (id: string, newUrl: string, title?: string) => void;
  addImage: (image: Omit<MediaImage, 'id'>) => void;
  deleteImage: (id: string) => void;

  // Notification Toast
  toast: ToastState;
  dismissToast: () => void;
  triggerToast: (title: string, message: string) => void;
}

const STORAGE_PUBLISHED_KEY = 'vilenis_site_published_v2';
const STORAGE_DRAFT_KEY = 'vilenis_site_draft_v2';
const STORAGE_LAST_PUBLISHED_KEY = 'vilenis_last_published_time_v2';

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publishedContent, setPublishedContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PUBLISHED_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CONTENT;
  });

  const [draftContent, setDraftContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DRAFT_KEY);
      if (saved) return JSON.parse(saved);
      const pub = localStorage.getItem(STORAGE_PUBLISHED_KEY);
      if (pub) return JSON.parse(pub);
    } catch {
      // ignore
    }
    return INITIAL_CONTENT;
  });

  const [activeView, setActiveView] = useState<'website' | 'cms'>('website');
  const [devicePreviewMode, setDevicePreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [lastPublishedTime, setLastPublishedTime] = useState<string>(() => {
    return localStorage.getItem(STORAGE_LAST_PUBLISHED_KEY) || 'Hoy, 11:24 AM';
  });

  const [toast, setToast] = useState<ToastState>({
    show: false,
    title: '',
    message: '',
  });

  // Calculate if draft differs from published
  const hasUnsavedChanges = JSON.stringify(publishedContent) !== JSON.stringify(draftContent);

  // Auto-save draft changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(draftContent));
    } catch {
      // ignore
    }
  }, [draftContent]);

  const updateDraft = (updates: Partial<SiteContent>) => {
    setDraftContent((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const triggerToast = (title: string, message: string) => {
    setToast({ show: true, title, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  const dismissToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const publishChanges = () => {
    setPublishedContent(draftContent);
    const now = new Date();
    const formatted = `Hoy, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    setLastPublishedTime(formatted);

    try {
      localStorage.setItem(STORAGE_PUBLISHED_KEY, JSON.stringify(draftContent));
      localStorage.setItem(STORAGE_LAST_PUBLISHED_KEY, formatted);
    } catch {
      // ignore
    }

    triggerToast(
      '¡Cambios publicados con éxito!',
      'El sitio vilenispodologia.pe ya muestra tus textos y tarifas actualizadas.'
    );
  };

  const discardDraft = () => {
    setDraftContent(publishedContent);
    triggerToast('Borrador descartado', 'Se han restaurado los datos publicados.');
  };

  const saveDraft = () => {
    try {
      localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(draftContent));
    } catch {
      // ignore
    }
    triggerToast('Borrador guardado', 'Tus cambios en edición se han guardado localmente.');
  };

  const resetToDefault = () => {
    setDraftContent(INITIAL_CONTENT);
    setPublishedContent(INITIAL_CONTENT);
    try {
      localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(INITIAL_CONTENT));
      localStorage.setItem(STORAGE_PUBLISHED_KEY, JSON.stringify(INITIAL_CONTENT));
    } catch {
      // ignore
    }
    triggerToast('Datos restablecidos', 'Se han restaurado los textos y servicios iniciales.');
  };

  const toggleServiceActive = (id: string) => {
    setDraftContent((prev) => ({
      ...prev,
      services: prev.services.map((srv) =>
        srv.id === id ? { ...srv, active: !srv.active } : srv
      ),
    }));
  };

  const updateServicePrice = (id: string, price: number) => {
    setDraftContent((prev) => ({
      ...prev,
      services: prev.services.map((srv) =>
        srv.id === id ? { ...srv, price } : srv
      ),
    }));
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setDraftContent((prev) => ({
      ...prev,
      services: prev.services.map((srv) =>
        srv.id === id ? { ...srv, ...updates } : srv
      ),
    }));
  };

  const addService = (newService: Omit<ServiceItem, 'id'>) => {
    const id = `srv-${Date.now()}`;
    setDraftContent((prev) => ({
      ...prev,
      services: [...prev.services, { ...newService, id }],
    }));
    triggerToast('Servicio añadido', `Se agregó "${newService.title}" al catálogo.`);
  };

  const deleteService = (id: string) => {
    setDraftContent((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    triggerToast('Servicio eliminado', 'El servicio ha sido removido del catálogo.');
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    setDraftContent((prev) => {
      const list = [...prev.services];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const [item] = list.splice(index, 1);
      list.splice(targetIndex, 0, item);
      return {
        ...prev,
        services: list,
      };
    });
  };

  const updateImage = (id: string, newUrl: string, title?: string) => {
    setDraftContent((prev) => {
      const updatedGallery = prev.mediaGallery.map((img) =>
        img.id === id ? { ...img, url: newUrl, ...(title ? { title } : {}) } : img
      );

      // If updating hero or doctor profile, update primary references too
      const updates: Partial<SiteContent> = { mediaGallery: updatedGallery };
      if (id === 'img-1') updates.heroImageUrl = newUrl;
      if (id === 'img-2') updates.doctorAvatarUrl = newUrl;
      if (id === 'img-3') updates.sterileTrayImageUrl = newUrl;

      return {
        ...prev,
        ...updates,
      };
    });
    triggerToast('Imagen actualizada', 'La imagen ha sido actualizada en la galería.');
  };

  const addImage = (image: Omit<MediaImage, 'id'>) => {
    const id = `img-${Date.now()}`;
    setDraftContent((prev) => ({
      ...prev,
      mediaGallery: [...prev.mediaGallery, { ...image, id }],
    }));
    triggerToast('Imagen añadida', 'Nueva imagen registrada en el gestor médico.');
  };

  const deleteImage = (id: string) => {
    setDraftContent((prev) => ({
      ...prev,
      mediaGallery: prev.mediaGallery.filter((img) => img.id !== id),
    }));
  };

  return (
    <ClinicContext.Provider
      value={{
        publishedContent,
        draftContent,
        activeView,
        setActiveView,
        devicePreviewMode,
        setDevicePreviewMode,
        lastPublishedTime,
        hasUnsavedChanges,
        updateDraft,
        publishChanges,
        discardDraft,
        saveDraft,
        resetToDefault,
        toggleServiceActive,
        updateServicePrice,
        updateService,
        addService,
        deleteService,
        moveService,
        updateImage,
        addImage,
        deleteImage,
        toast,
        dismissToast,
        triggerToast,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
