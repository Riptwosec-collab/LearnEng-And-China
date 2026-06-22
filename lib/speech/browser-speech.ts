export type SpeechRecognitionResult = {
  transcript: string;
  confidence?: number;
};

export function speakText(text: string, lang = "en-US", rate = 1) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}

export function isBrowserSpeechSupported() {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
}
