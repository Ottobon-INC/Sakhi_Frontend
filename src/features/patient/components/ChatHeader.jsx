import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check, ShieldCheck, HeartPulse } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

export default function ChatHeader({ language, onLanguageChange, patientId }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <header className="bg-teal-700 text-white shadow-md border-b border-teal-800">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Branding & Subtitle */}
        <div className="flex items-center space-x-2.5">
          <div className="bg-teal-600 p-2 rounded-lg text-white shadow-inner flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-teal-100" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-bold text-lg leading-tight tracking-tight">{t.brand}</h1>
              <span className="text-[10px] font-semibold uppercase bg-teal-800/80 text-teal-200 px-1.5 py-0.5 rounded tracking-wider">
                Sakhi
              </span>
            </div>
            <p className="text-xs text-teal-100/90 font-medium">{t.subtitle}</p>
          </div>
        </div>

        {/* Language Selector via Radix UI */}
        <div className="flex items-center space-x-2">
          <Select.Root value={language} onValueChange={onLanguageChange}>
            <Select.Trigger
              className="inline-flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-semibold bg-teal-800 hover:bg-teal-900 border border-teal-600/60 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 gap-1.5 cursor-pointer"
              aria-label="Select Language"
            >
              <Select.Value />
              <Select.Icon>
                <ChevronDown className="w-3.5 h-3.5 text-teal-200" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white rounded-lg shadow-xl border border-slate-200 text-slate-800 z-50 animate-in fade-in-50 zoom-in-95">
                <Select.Viewport className="p-1">
                  <Select.Item
                    value="te"
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md hover:bg-teal-50 hover:text-teal-900 cursor-pointer outline-none data-[highlighted]:bg-teal-50 data-[highlighted]:text-teal-900"
                  >
                    <Select.ItemText>తెలుగు (Telugu)</Select.ItemText>
                    <Select.ItemIndicator className="ml-2 text-teal-600">
                      <Check className="w-3.5 h-3.5" />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item
                    value="hi"
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md hover:bg-teal-50 hover:text-teal-900 cursor-pointer outline-none data-[highlighted]:bg-teal-50 data-[highlighted]:text-teal-900"
                  >
                    <Select.ItemText>हिन्दी (Hindi)</Select.ItemText>
                    <Select.ItemIndicator className="ml-2 text-teal-600">
                      <Check className="w-3.5 h-3.5" />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <Select.Item
                    value="en"
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md hover:bg-teal-50 hover:text-teal-900 cursor-pointer outline-none data-[highlighted]:bg-teal-50 data-[highlighted]:text-teal-900"
                  >
                    <Select.ItemText>English</Select.ItemText>
                    <Select.ItemIndicator className="ml-2 text-teal-600">
                      <Check className="w-3.5 h-3.5" />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>

      {/* Patient Bar */}
      <div className="bg-teal-800/80 px-4 py-1 text-[11px] text-teal-200 flex items-center justify-between font-mono">
        <span className="flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400 inline" />
          <span>{t.patientLabel}: <strong className="text-white">{patientId}</strong></span>
        </span>
        <span className="text-[10px] bg-teal-900/60 px-1.5 py-0.5 rounded text-teal-300">
          Encrypted Session
        </span>
      </div>
    </header>
  );
}
