import React, { useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, ClipboardList } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

export default function ChecklistCard({ checklist, language }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const items = checklist?.items || [];
  const [checkedState, setCheckedState] = useState({});

  const handleToggle = (id) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="my-3 rounded-xl border border-teal-200 bg-teal-50/70 p-3.5 shadow-sm text-slate-800 animate-in fade-in zoom-in-95">
      <div className="flex items-center space-x-2 text-teal-900 font-bold text-sm mb-2.5 pb-2 border-b border-teal-200/60">
        <ClipboardList className="w-4 h-4 text-teal-700" />
        <span>{checklist?.title || 'Clinic Visit Checklist'}</span>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = Boolean(checkedState[item.id]);
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`flex items-start justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                isChecked
                  ? 'bg-emerald-50/80 border-emerald-300 text-slate-600 line-through'
                  : 'bg-white border-slate-200 hover:border-teal-300 text-slate-800'
              }`}
            >
              <div className="flex items-start space-x-2.5 pr-2">
                <Checkbox.Root
                  checked={isChecked}
                  onCheckedChange={() => handleToggle(item.id)}
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-300 bg-white data-[state=checked]:bg-teal-700 data-[state=checked]:border-teal-700 focus:outline-none"
                  aria-label={item.label}
                >
                  <Checkbox.Indicator className="text-white">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-xs font-medium leading-snug">{item.label}</span>
              </div>

              {item.required ? (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded whitespace-nowrap uppercase tracking-wider flex-shrink-0">
                  {t.requiredBadge}
                </span>
              ) : (
                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                  {t.optionalBadge}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
