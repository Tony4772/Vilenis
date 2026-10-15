import React from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { PublicWebsite } from './components/PublicWebsite';
import { AdminCMS } from './components/AdminCMS';
import { Globe, Settings2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView, setActiveView } = useClinic();

  return (
    <div className="relative min-h-screen">
      {/* Active Screen */}
      {activeView === 'website' ? <PublicWebsite /> : <AdminCMS />}

      {/* Floating Global Screen Switcher (Quick Toggle for evaluation) */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-[#00341f]/95 backdrop-blur-md text-white p-1 rounded-full shadow-2xl flex items-center border border-[#97f3b5]/40 text-xs">
          <button
            type="button"
            onClick={() => setActiveView('website')}
            className={`px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'website'
                ? 'bg-[#97f3b5] text-[#00341f] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Sitio Web Público</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('cms')}
            className={`px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeView === 'cms'
                ? 'bg-[#97f3b5] text-[#00341f] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Panel CMS Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ClinicProvider>
      <AppContent />
    </ClinicProvider>
  );
}
