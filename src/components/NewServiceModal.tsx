import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { X, Plus, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceToEdit?: ServiceItem | null;
}

export const NewServiceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  serviceToEdit,
}) => {
  const { addService, updateService } = useClinic();

  const [title, setTitle] = useState(serviceToEdit?.title || '');
  const [category, setCategory] = useState(serviceToEdit?.category || 'Preventivo');
  const [tag, setTag] = useState(serviceToEdit?.tag || 'Especialidad');
  const [price, setPrice] = useState<number>(serviceToEdit?.price || 90);
  const [duration, setDuration] = useState(serviceToEdit?.duration || '45 min');
  const [description, setDescription] = useState(serviceToEdit?.description || '');
  const [feature1, setFeature1] = useState(serviceToEdit?.features[0] || 'Evaluación clínica inicial');
  const [feature2, setFeature2] = useState(serviceToEdit?.features[1] || 'Tratamiento sin dolor');
  const [feature3, setFeature3] = useState(serviceToEdit?.features[2] || 'Recomendaciones domiciliarias');
  const [isUrgent, setIsUrgent] = useState(serviceToEdit?.isUrgent || false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const features = [feature1, feature2, feature3].filter((f) => f.trim().length > 0);

    if (serviceToEdit) {
      updateService(serviceToEdit.id, {
        title,
        category,
        tag,
        price: Number(price),
        duration,
        description,
        features,
        isUrgent,
      });
    } else {
      addService({
        title,
        category,
        tag,
        price: Number(price),
        duration,
        description,
        features,
        active: true,
        isUrgent,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#dcf3e7] overflow-hidden">
        <div className="px-6 py-4 bg-[#f7faf8] border-b border-[#dcf3e7] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#00341f]">
            <Sparkles className="w-5 h-5 text-[#006d3d]" />
            <h3 className="font-bold text-base">
              {serviceToEdit ? 'Editar Servicio' : 'Añadir Nuevo Servicio Podológico'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#404943] hover:text-[#00341f] rounded-lg hover:bg-[#dcf3e7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#00341f]">
              Nombre del Servicio o Tratamiento *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Reconstrucción Ungueal con Resina"
              className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2 text-sm text-[#0b1f18] border border-[#c0c9c1]/40 focus:border-[#006d3d] focus:ring-1 focus:ring-[#97f3b5] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#00341f]">
                Tarifa Referencial (S/) *
              </label>
              <input
                type="number"
                min={10}
                max={999}
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2 text-sm text-[#0b1f18] border border-[#c0c9c1]/40 focus:border-[#006d3d] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#00341f]">
                Duración Estimada
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Ej. 45 min"
                className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2 text-sm text-[#0b1f18] border border-[#c0c9c1]/40 focus:border-[#006d3d] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#00341f]">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2 text-sm text-[#0b1f18] border border-[#c0c9c1]/40 focus:border-[#006d3d] outline-none"
              >
                <option value="Preventivo">Preventivo</option>
                <option value="Urgencia">Urgencia Podológica</option>
                <option value="Terapia Clínica">Terapia Clínica</option>
                <option value="Control de Riesgo">Control de Riesgo</option>
                <option value="Dermatología Podal">Dermatología Podal</option>
                <option value="A Domicilio">A Domicilio</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#00341f]">
                Etiqueta / Badge
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Ej. Preventivo / Base"
                className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2 text-sm text-[#0b1f18] border border-[#c0c9c1]/40 focus:border-[#006d3d] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#00341f]">
              Descripción Clínica
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explica qué incluye el procedimiento y el beneficio para el paciente..."
              className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2 text-sm text-[#0b1f18] border border-[#c0c9c1]/40 focus:border-[#006d3d] outline-none resize-none"
            />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#00341f]">
              3 Beneficios o Pasos Clave
            </label>
            <input
              type="text"
              value={feature1}
              onChange={(e) => setFeature1(e.target.value)}
              placeholder="Punto 1..."
              className="w-full bg-[#f7faf8] rounded-lg px-3 py-1.5 text-xs text-[#0b1f18] border border-[#c0c9c1]/40 outline-none"
            />
            <input
              type="text"
              value={feature2}
              onChange={(e) => setFeature2(e.target.value)}
              placeholder="Punto 2..."
              className="w-full bg-[#f7faf8] rounded-lg px-3 py-1.5 text-xs text-[#0b1f18] border border-[#c0c9c1]/40 outline-none"
            />
            <input
              type="text"
              value={feature3}
              onChange={(e) => setFeature3(e.target.value)}
              placeholder="Punto 3..."
              className="w-full bg-[#f7faf8] rounded-lg px-3 py-1.5 text-xs text-[#0b1f18] border border-[#c0c9c1]/40 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="urgent-check"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="rounded accent-[#006d3d] w-4 h-4 cursor-pointer"
            />
            <label htmlFor="urgent-check" className="text-xs text-[#0b1f18] cursor-pointer">
              Marcar como urgencia clínica (resaltado en rojo / alivio inmediato)
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#dcf3e7]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-[#404943] hover:bg-[#dcf3e7] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-bold bg-[#154c33] hover:bg-[#00341f] text-white flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{serviceToEdit ? 'Guardar Cambios' : 'Añadir Servicio'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
