import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertCircle, Bot, User, Sparkles } from 'lucide-react';
import ChatHeader from './components/ChatHeader';
import EscalationCard from './components/EscalationCard';
import ChecklistCard from './components/ChecklistCard';
import { TRANSLATIONS } from './i18n/translations';
import { sendPatientMessage } from './api/sakhiClient';

const PATIENT_ID = 'pat_synthetic_101';
const SESSION_ID = 'sess_hackathon_demo_01';

export default function PatientTouchpoint() {
  const [language, setLanguage] = useState('te'); // Default to Telugu as specified
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [networkError, setNetworkError] = useState(null);

  const messagesEndRef = useRef(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Initialize with localized welcome message
  useEffect(() => {
    const welcomeText = {
      te: 'నమస్కారం! నేను సఖి, జన్మసేతు సహకారంతో మీ ఆరోగ్య సంరక్షణ సహాయకురాలిని. ఈరోజు మీకు ఎలా సహాయపడగలను?',
      hi: 'नमस्ते! मैं सखी हूँ, जन्मसेतु द्वारा संचालित आपकी स्वास्थ्य देखभाल साथी। आज मैं आपकी क्या सहायता कर सकती हूँ?',
      en: 'Hello! I am Sakhi, your healthcare companion powered by JanmaSethu. How can I help you today?'
    };

    setMessages([
      {
        id: 'msg_initial',
        sender: 'sakhi',
        text: welcomeText[language] || welcomeText.en,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    setNetworkError(null);
    setInputMessage('');

    const userMessage = {
      id: `user_${Date.now()}`,
      sender: 'patient',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendPatientMessage({
        sessionId: SESSION_ID,
        patientId: PATIENT_ID,
        language,
        message: query
      });

      const sakhiMessage = {
        id: `sakhi_${Date.now()}`,
        sender: 'sakhi',
        text: response.reply,
        response_type: response.response_type,
        safety: response.safety,
        escalation: response.escalation,
        checklist: response.checklist,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, sakhiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setNetworkError(t.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen flex justify-center items-center">
      {/* Mobile-first viewport container (max-w-md mx-auto h-screen flex flex-col) */}
      <main className="w-full max-w-md h-screen flex flex-col bg-slate-50 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <ChatHeader
          language={language}
          onLanguageChange={setLanguage}
          patientId={PATIENT_ID}
        />

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isPatient = msg.sender === 'patient';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-1.5 max-w-[88%]">
                  {!isPatient && (
                    <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center flex-shrink-0 text-xs mb-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-3.5 py-2.5 shadow-sm text-sm ${isPatient
                        ? 'bg-teal-700 text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                      }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                    {/* Escalation Emergency Card */}
                    {msg.response_type === 'escalation' && (
                      <EscalationCard
                        escalation={msg.escalation}
                        safety={msg.safety}
                        language={language}
                      />
                    )}

                    {/* Document Checklist Card */}
                    {msg.response_type === 'document_checklist' && (
                      <ChecklistCard
                        checklist={msg.checklist}
                        language={language}
                      />
                    )}

                    <div
                      className={`text-[10px] mt-1 text-right ${isPatient ? 'text-teal-200' : 'text-slate-400'
                        }`}
                    >
                      {msg.time}
                    </div>
                  </div>

                  {isPatient && (
                    <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center flex-shrink-0 text-xs mb-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs py-1">
              <div className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center">
                <Bot className="w-3 h-3 animate-spin" />
              </div>
              <div className="flex space-x-1 items-center bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}

          {/* Network Error Fallback */}
          {networkError && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-red-900 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">
                <p>{networkError}</p>
                <a
                  href="tel:108"
                  className="mt-2 inline-flex items-center space-x-1 font-bold text-red-700 hover:text-red-900 underline"
                >
                  <span>{t.emergencyCallBtn}</span>
                </a>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Demo Quick-Trigger Chips */}
        <div className="px-3 py-2 bg-slate-100 border-t border-slate-200/80">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3 h-3 text-teal-600" />
              Demo:
            </span>
            {t.chips?.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleSendMessage(chip.message)}
                disabled={isLoading}
                className="whitespace-nowrap bg-white hover:bg-teal-50 border border-slate-300 hover:border-teal-400 text-slate-700 hover:text-teal-900 px-2.5 py-1 rounded-full text-xs font-medium shadow-xs transition-colors cursor-pointer flex-shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Bar (input_mode: "text" strictly, no microphone/audio) */}
        <div className="p-3 bg-white border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 text-sm bg-slate-100 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 disabled:bg-slate-300 text-white rounded-full shadow-sm cursor-pointer transition-colors disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
              aria-label={t.send}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Permanent Healthcare Safety Boundary Disclaimer */}
        <footer className="bg-slate-100 px-3 py-1.5 border-t border-slate-200 text-[10px] text-slate-500 text-center leading-tight">
          {t.disclaimer}
        </footer>
      </main>
    </div>
  );
}
