import { getMockResponse } from './mockResponses';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

/**
 * Send a patient message to Sakhi backend or Mock Orchestrator
 */
export async function sendPatientMessage({ sessionId, patientId, language = 'te', message }) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return getMockResponse(message, language);
  }

  const response = await fetch(`${VITE_API_BASE_URL}/api/v1/patient/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session_id: sessionId,
      patient_id: patientId,
      language,
      input_mode: 'text',
      message
    })
  });

  if (!response.ok) {
    throw new Error(`Server returned status ${response.status}`);
  }

  return response.json();
}

/**
 * Check clinician review/acknowledgement status for an escalation case
 */
export async function checkEscalationStatus(caseId) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      case_id: caseId,
      status: 'acknowledged',
      clinician_reviewed: true,
      acknowledged_by: 'Dr. Ananya Rao (Duty OB-GYN)'
    };
  }

  const response = await fetch(`${VITE_API_BASE_URL}/api/v1/patient/escalation/${caseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to check escalation status: ${response.status}`);
  }

  return response.json();
}
