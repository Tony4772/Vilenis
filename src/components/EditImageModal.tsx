import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { X, Image as ImageIcon, Check } from 'lucide-react';
import { MediaImage } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageItem?: MediaImage | null;
}

export const EditImageModal: React.FC<Props> = ({
  isOpen,
  onClose,
  imageItem,
}) => {
  const { updateImage, addImage } = useClinic();

  const [url, setUrl] = useState(imageItem?.url || '');
  const [title, setTitle] = useState(imageItem?.title || '');
  const [tag, setTag] = useState(imageItem?.tag || 'Consultorio');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (imageItem) {
      updateImage(imageItem.id, url.trim(), title.trim() || undefined);
    } else {
      addImage({
        title: title.trim() || 'Foto Clínica',
        tag: tag.trim() || 'Galería',
        url: url.trim(),
        dimensions: '1200 × 800 px',
      });
    }

    onClose();
  };

  // Sample curated clinical image alternatives for quick click
  const presets = [
    {
      title: 'Consultorio Médico',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0lsyVFh5ZBxoWXyVY-Et7QSIbf-RyLX9180ll5AjixVCO7zX4RieaH0LSneiUNhEpoT9Q6RwC74zzfcZ-3-fInvHh0AYe1oqhjCbFKPwXLpI_r6ajLbYytb1VZq4dYeJMIPggLAu2BIK4DE5kZAgB7rwTTPhENqu7S_FIMqE9nhaqzt3Pc6vPjOc8INX3MUsgvnMMWPE5dhxqBpWRYosNw-0J0kz4-3XotOCh70lvi2WWF-qZh9D-Uw',
    },
    {
      title: 'Dra. Vilenis Perfil',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz9CfYLVvPFfys1C7t4y9R_rVNa4FuJ21JtEzhYN5xAUuhDpn167TPnfofPbYC5gloVArT3TKChoV9M_VxccE6yl1dytrAlxRFu93WjpOWadAchn4gdDM2FW4EBUEz2t3XjUU7CaO0BeNevEv-_PSFqcrrCDahkj-froeuLD4erYSDd9DclJJer8QEjdcwHP48wvW5nD8sAyfBFM1ILm5sA_xSFHX4IaXcnsA8gte_vMZTm5GzfuoR6w',
    },
    {
      title: 'Bandeja Quirúrgica',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMtafWBSJKX4rnBfkrCFUhKKj_q6ECgTpB1BDxrmGGb9XKXoJHykopSe5EYGsYHfvKobsGFM9FjQOgRWNiaAad7G_I0Rbg4wwYSVU1QBa4yyazSnAR9dOmNC7zBSkVJbmNBIRIjEZxhLaQuPa7pPRh-hjKGdaodj4qWwUjgoepssYUErgL7Kf3dV1d2NKOdX7d0u3zR3cBq_TVE2KqVaCnRYwaW1GhHdaRovvN4j70idhDOLfCB9FNmA',
    },
    {
      title: 'Pies Sanos y Rehabilitados',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv2xBBfxRoJakZ3aMjMImh8AI92iOyOEIBwPsBXdebOVB97aAkC6CZ0QR9YhMO2UY3TiAyQVitdLr8NTsBRQ4hCeWr8ZVDFIpDN_iq4Pzj-mYpum1CIt4YhnUo16uMJBYj_uh_cv_5H1xkJpVIQ2joIS-h7B_7Fb9H8cAzN0IhKKmnUctVqA-__RHfLc0LD5p4b7ZzY4zaTIIM0RbYAZ9Bg9rpjmLBCswJcB8OI6sE_X2uUl69pmF1uw',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#dcf3e7] overflow-hidden">
        <div className="px-6 py-4 bg-[#f7faf8] border-b border-[#dcf3e7] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#00341f]">
            <ImageIcon className="w-5 h-5 text-[#006d3d]" />
            <h3 className="font-bold text-base">
              {imageItem ? 'Actualizar Foto Médica' : 'Registrar Nueva Foto'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#404943] hover:text-[#00341f] rounded-lg hover:bg-[#dcf3e7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#00341f]">Título de la Imagen</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Consultorio Principal"
              className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2 text-sm text-[#0b1f18] border border-[#c0c9c1]/40 focus:border-[#006d3d] outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#00341f]">URL de la Imagen *</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#f7faf8] rounded-lg px-3.5 py-2 text-sm text-[#0b1f18] border border-[#c0c9c1]/40 focus:border-[#006d3d] outline-none"
            />
          </div>

          {/* Preset Picker */}
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="text-xs text-[#404943]">O elige una foto recomendada:</span>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setUrl(p.url);
                    if (!title) setTitle(p.title);
                  }}
                  className="p-2 rounded-lg bg-[#f7faf8] hover:bg-[#dcf3e7] border border-[#dcf3e7] text-left text-xs text-[#00341f] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <img src={p.url} alt={p.title} className="w-8 h-8 rounded object-cover" />
                  <span className="truncate">{p.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {url && (
            <div className="mt-2 h-32 rounded-lg overflow-hidden border border-[#dcf3e7] bg-[#f7faf8]">
              <img src={url} alt="Vista previa" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#dcf3e7]">
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
              <Check className="w-4 h-4" />
              <span>Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
