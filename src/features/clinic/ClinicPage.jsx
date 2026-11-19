import React from 'react';
import { Building2, Stethoscope, Users, CalendarCheck, Clock, ShieldCheck } from 'lucide-react';

export default function ClinicPortal() {
  return (
    <div className="flex-1 bg-slate-50 flex flex-col overflow-y-auto">
      {/* Clinic Header */}
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-600 p-2 rounded-lg text-white">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg leading-tight">JanmaSethu Clinic Portal</h1>
              <span className="text-[10px] font-semibold uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded">
                Layer 4
              </span>
            </div>
            <p className="text-xs text-slate-400">Clinical Triage, Case Reviews & Staff Onboarding</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-300 font-mono">
          <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Duty Clinician: <strong className="text-white">Dr. Ananya Rao</strong>
          </span>
        </div>
      </header>

      {/* Main Clinic Workspace */}
      <div className="max-w-6xl w-full mx-auto p-6 space-y-6">
        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Pending Escalations</p>
              <h3 className="text-xl font-bold text-slate-900">1 Urgent Case</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
            <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Active Patients</p>
              <h3 className="text-xl font-bold text-slate-900">24 Patients</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Today's Appointments</p>
              <h3 className="text-xl font-bold text-slate-900">8 Scheduled</h3>
            </div>
          </div>
        </div>

        {/* Triage & Patient Review Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-5 h-5 text-teal-700" />
              <h2 className="font-bold text-sm text-slate-800">Triage Escalation Queue</h2>
            </div>
            <span className="text-xs font-medium text-slate-500">Real-time sync with Sakhi Backend</span>
          </div>

          <div className="p-5">
            <div className="border border-red-200 bg-red-50/50 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono bg-red-600 text-white px-2 py-0.5 rounded">
                    ESC-2026-042
                  </span>
                  <span className="text-xs font-bold text-red-900">
                    Patient: pat_synthetic_101
                  </span>
                  <span className="text-[11px] bg-red-100 text-red-700 border border-red-300 px-2 py-0.5 rounded-full font-medium">
                    Critical Red-Flag (Bleeding / Severe Pain)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Reported acute bleeding and intense abdominal discomfort. Immediate triage and dispatch advisory generated.
                </p>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <button className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-colors">
                  Acknowledge & Call
                </button>
                <button className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-colors">
                  View Full History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
