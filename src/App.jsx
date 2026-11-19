import React, { useState } from 'react';
import { Smartphone, Building2 } from 'lucide-react';
import PatientPage from './features/patient/PatientPage';
import ClinicPage from './features/clinic/ClinicPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('patient'); // 'patient' | 'clinic'

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans">
      {/* Top Application Switcher Bar */}
      <nav className="bg-slate-950 text-white px-4 py-2 border-b border-slate-800 flex items-center justify-between z-30 select-none">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></div>
          <span className="font-bold text-sm tracking-tight text-slate-100">
            Sakhi <span className="text-teal-400 font-normal">| JanmaSethu Ecosystem</span>
          </span>
        </div>

        {/* Switcher Navigation Buttons */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-lg border border-slate-700/80 space-x-1">
          <button
            onClick={() => setActiveTab('patient')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${activeTab === 'patient'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Patient PWA (Layer 1)</span>
          </button>

          <button
            onClick={() => setActiveTab('clinic')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${activeTab === 'clinic'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Clinic Portal (Layer 4)</span>
          </button>
        </div>
      </nav>

      {/* Dynamic Viewport Container */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'patient' ? (
          <div className="flex-1 flex justify-center items-center bg-slate-200 overflow-y-auto">
            <PatientPage />
          </div>
        ) : (
          <ClinicPage />
        )}
      </div>
    </div>
  );
}
