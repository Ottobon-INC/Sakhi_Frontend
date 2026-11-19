import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';
import { checkEscalationStatus } from '../api/sakhiClient';

export default function EscalationCard({ escalation, safety, language }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [currentEscalation, setCurrentEscalation] = useState(escalation || {});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isReviewed =
    Boolean(currentEscalation.clinician_reviewed) || currentEscalation.status === 'acknowledged';

  const handleRefresh = async () => {
    if (!currentEscalation.case_id) return;
    setIsRefreshing(true);
    try {
      const updated = await checkEscalationStatus(currentEscalation.case_id);
      if (updated) {
        setCurrentEscalation((prev) => ({ ...prev, ...updated }));
      }
    } catch (err) {
      console.error('Failed to update escalation status:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="my-3 rounded-xl border-2 border-red-500 bg-red-50/95 p-3.5 shadow-md text-red-950 animate-in fade-in zoom-in-95">
      {/* Header Banner */}
      <div className="flex items-center space-x-2 text-red-700 font-bold text-sm">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600 animate-pulse" />
        <span className="uppercase tracking-wide">{t.emergencyTitle}</span>
      </div>

      {/* Emergency Instructions */}
      <div className="mt-2 text-xs font-semibold leading-relaxed bg-white/80 p-2.5 rounded-lg border border-red-200 text-red-900">
        <p>{safety?.emergency_instructions || 'Call 108 immediately or visit the emergency department.'}</p>
      </div>

      {/* Call 108 CTA */}
      <div className="mt-3">
        <a
          href="tel:108"
          className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg shadow-sm text-sm transition-colors text-center cursor-pointer"
        >
          <PhoneCall className="w-4 h-4 fill-white" />
          <span>{t.emergencyCallBtn}</span>
        </a>
      </div>

      {/* Case Details & Status Badge */}
      <div className="mt-3 pt-2.5 border-t border-red-200/80 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-600 font-mono">
            {t.caseIdLabel}: <strong className="text-slate-900">{currentEscalation.case_id || 'ESC-2026-042'}</strong>
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-1 text-[11px] font-medium text-red-700 hover:text-red-900 bg-red-100 hover:bg-red-200/70 px-2 py-0.5 rounded cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{t.refreshStatus}</span>
          </button>
        </div>

        {/* Truthful Clinician Status */}
        <div className="flex items-center gap-1.5">
          {isReviewed ? (
            <div className="flex items-center space-x-1.5 text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-1 rounded-md text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {t.statusReviewed} {currentEscalation.acknowledged_by || 'Duty Clinician'}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 text-amber-800 bg-amber-100/90 border border-amber-300 px-2 py-1 rounded-md text-[11px] font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.statusPending}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
