/**
 * Mock responses for Sakhi Orchestrator (P2) contract
 */

export function getMockResponse(message, language = 'te') {
  const normalizedMsg = (message || '').toLowerCase();

  // Scenario A (Emergency Red-Flag)
  if (
    normalizedMsg.includes('bleeding') ||
    normalizedMsg.includes('severe') ||
    normalizedMsg.includes('pain') ||
    normalizedMsg.includes('emergency')
  ) {
    const replies = {
      te: 'తీవ్రమైన రక్తస్రావం లేదా నొప్పి అత్యవసర పరిస్థితి కావచ్చు. దయచేసి వెంటనే సమీపంలోని ఆసుపత్రికి వెళ్లండి లేదా 108 కి కాల్ చేయండి.',
      hi: 'गंभीर रक्तस्राव या तेज दर्द एक आपातकालीन स्थिति हो सकती है। कृपया तुरंत नजदीकी अस्पताल जाएं या 108 पर कॉल करें।',
      en: 'Severe bleeding or intense pain may indicate an emergency. Please visit the nearest hospital immediately or call 108.'
    };

    return {
      response_type: 'escalation',
      reply: replies[language] || replies.en,
      safety: {
        is_red_flag: true,
        severity: 'critical',
        emergency_instructions: 'Call 108 (Emergency Ambulance) or go to the nearest hospital immediately.'
      },
      escalation: {
        case_id: 'ESC-2026-042',
        status: 'escalated_pending_review',
        clinician_reviewed: false,
        acknowledged_by: null
      }
    };
  }

  // Scenario B (Document Checklist)
  if (
    normalizedMsg.includes('document') ||
    normalizedMsg.includes('visit') ||
    normalizedMsg.includes('checklist') ||
    normalizedMsg.includes('carry')
  ) {
    const replies = {
      te: 'మీ క్లినిక్ సందర్శన కోసం అవసరమైన పత్రాల జాబితా ఇక్కడ ఉంది. దయచేసి వీటిని వెంట తీసుకెళ్లండి:',
      hi: 'आपके क्लिनिक विजिट के लिए आवश्यक दस्तावेजों की चेकलिस्ट नीचे दी गई है। कृपया इन्हें साथ ले जाएं:',
      en: 'Here is the checklist of required documents for your upcoming clinic visit. Please ensure you carry these along:'
    };

    const checklistLabels = {
      te: {
        id: 'ప్రభుత్వ గుర్తింపు కార్డు (Aadhaar / Voter ID)',
        mcp: 'తల్లి & శిశు సంరక్షణ (MCP) కార్డు',
        usg: 'తాజా అల్ట్రాసౌండ్ & ల్యాబ్ నివేదికలు',
        meds: 'ప్రస్తుతం వాడుతున్న మందుల జాబితా'
      },
      hi: {
        id: 'सरकारी फोटो पहचान पत्र (Aadhaar / Voter ID)',
        mcp: 'मातृ एवं बाल सुरक्षा (MCP) कार्ड',
        usg: 'नवीनतम अल्ट्रासाउंड एवं लैब टेस्ट रिपोर्ट',
        meds: 'वर्तमान में ली जा रही दवाइयों की सूची'
      },
      en: {
        id: 'Government Photo ID (Aadhaar / Voter ID)',
        mcp: 'Mother & Child Protection (MCP) Card',
        usg: 'Latest Ultrasound & Lab Reports',
        meds: 'Current Medications / Supplements List'
      }
    };

    const labels = checklistLabels[language] || checklistLabels.en;

    return {
      response_type: 'document_checklist',
      reply: replies[language] || replies.en,
      checklist: {
        title: language === 'te' ? 'క్లినిక్ సందర్శన పత్రాల జాబితా' : language === 'hi' ? 'क्लिनिक विजिट दस्तावेज चेकलिस्ट' : 'Clinic Visit Document Checklist',
        items: [
          { id: 'doc_gov_id', label: labels.id, required: true },
          { id: 'doc_mcp_card', label: labels.mcp, required: true },
          { id: 'doc_ultrasound', label: labels.usg, required: true },
          { id: 'doc_meds_list', label: labels.meds, required: false }
        ]
      }
    };
  }

  // Default Greeting
  const greetings = {
    te: 'నమస్కారం! నేను సఖి, జన్మసేతు సహకారంతో మీ ఆరోగ్య సంరక్షణ సహాయకురాలిని. ఈరోజు మీకు ఎలా సహాయపడగలను?',
    hi: 'नमस्ते! मैं सखी हूँ, जन्मसेतु द्वारा संचालित आपकी स्वास्थ्य देखभाल साथी। आज मैं आपकी क्या सहायता कर सकती हूँ?',
    en: 'Hello! I am Sakhi, your healthcare companion powered by JanmaSethu. How can I help you today?'
  };

  return {
    response_type: 'text',
    reply: greetings[language] || greetings.en
  };
}
