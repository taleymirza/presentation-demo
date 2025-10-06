import React, { useState, useEffect } from 'react';

interface LocaleInfo {
  city: string;
  languageName: string;
  text: string;
}

const localeData: Record<string, LocaleInfo> = {
  'en-US': { city: 'New York', languageName: 'English (US)', text: 'This text updates based on your browser\'s language and location.' },
  'en-GB': { city: 'London', languageName: 'English (UK)', text: 'This text updates based on your browser\'s language and location.' },
  'hi-IN': { city: 'Mumbai', languageName: 'Hindi', text: 'यह टेक्स्ट आपके ब्राउज़र की भाषा और स्थान के आधार पर अपडेट होता है।'},
  'zh-CN': { city: 'Shanghai', languageName: 'Chinese', text: '本文将根据您的浏览器的语言和位置进行更新。' },
  'ru-RU': { city: 'Moscow', languageName: 'Russian', text: 'Этот текст обновляется в зависимости от языка и местоположения вашего браузера.' },
  'pt-BR': { city: 'São Paulo', languageName: 'Portuguese (BR)', text: 'Este texto é atualizado com base no idioma e na localização do seu navegador.' },
  'es-ES': { city: 'Madrid', languageName: 'Spanish', text: 'Este texto se actualiza según el idioma y la ubicación de su navegador.' },
  'fr-FR': { city: 'Paris', languageName: 'French', text: 'Ce texte se met à jour en fonction de la langue et de l\'emplacement de votre navigateur.' },
  'de-DE': { city: 'Berlin', languageName: 'German', text: 'Dieser Text wird basierend auf der Sprache und dem Standort Ihres Browsers aktualisiert.' },
  'ja-JP': { city: 'Tokyo', languageName: 'Japanese', text: 'このテキストは、ブラウザの言語と場所に基づいて更新されます。' },
};

const getInitialLocale = (): keyof typeof localeData => {
    if (typeof navigator !== 'undefined' && navigator.languages) {
        for (const lang of navigator.languages) {
            if (Object.keys(localeData).includes(lang)) {
                return lang as keyof typeof localeData;
            }
            // Fallback for generic languages like 'en'
            const genericLang = lang.split('-')[0];
            const matchingKey = Object.keys(localeData).find(key => key.startsWith(genericLang));
            if (matchingKey) {
                return matchingKey as keyof typeof localeData;
            }
        }
    }
    return 'en-US';
};

const SensorsDemo: React.FC = () => {
  const [locale, setLocale] = useState<keyof typeof localeData>(getInitialLocale());
  const [currentTime, setCurrentTime] = useState(new Date());

  const refreshLocaleAndTime = () => {
    setLocale(getInitialLocale());
    setCurrentTime(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    window.addEventListener('languagechange', refreshLocaleAndTime);

    // This interval helps catch timezone changes from DevTools which don't fire an event
    const intervalId = setInterval(refreshLocaleAndTime, 2000); 

    return () => {
      clearInterval(timerId);
      clearInterval(intervalId);
      window.removeEventListener('languagechange', refreshLocaleAndTime);
    };
  }, []);
  
  const { text } = localeData[locale] || localeData['en-US'];

  const formattedDate = new Intl.DateTimeFormat(locale, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }).format(currentTime);

  const formattedTime = new Intl.DateTimeFormat(locale, {
    hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'
  }).format(currentTime);

  return (
    <div className="text-center max-w-3xl mx-auto">
      <p className="mb-6">
        This demo reads your browser's current settings. Use DevTools to simulate a different location and see the values update in real-time.
      </p>
      
      <div className="bg-white/10 p-4 rounded-lg mb-6 inline-block text-left text-sm">
        <p><span className="font-semibold text-white/70">Detected Locale: </span>{locale}</p>
        <p><span className="font-semibold text-white/70">Detected Timezone: </span>{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
      </div>

      <div className="bg-black/20 p-8 rounded-xl shadow-inner min-h-[100px] text-left space-y-4">
        <p className="text-xl font-medium italic">
          "{text}"
        </p>
        <div className="border-t border-white/20 pt-4">
            <p><span className="font-semibold text-white/70">Date:</span> {formattedDate}</p>
            <p><span className="font-semibold text-white/70">Time:</span> {formattedTime}</p>
        </div>
      </div>
      <div className="mt-6 text-left bg-black/30 p-4 rounded-lg text-sm max-w-lg mx-auto">
        <h4 className="font-bold text-base mb-2">How to use DevTools Sensors:</h4>
        <ol className="list-decimal list-inside space-y-1">
            <li>Open Developer Tools (F12 or Ctrl+Shift+I).</li>
            <li>Press Ctrl+Shift+P to open the Command Menu.</li>
            <li>Type "Sensors" and select "Show Sensors".</li>
            <li>Under "Location", select a city like "London" or "Shanghai".</li>
            <li>The information above will update automatically!</li>
        </ol>
      </div>
    </div>
  );
};

export default SensorsDemo;
