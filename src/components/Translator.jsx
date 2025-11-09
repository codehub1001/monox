import React, { useEffect } from "react";

const Translator = () => {
  useEffect(() => {
    const initGoogleTranslate = () => {
      if (!window.google || !window.google.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,fr,de,it,pt,zh,ja,ar,ru",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // If the script isn't loaded yet, load it manually
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = initGoogleTranslate;

      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      initGoogleTranslate();
    }
  }, []);

  return (
    <div className="flex justify-center md:justify-end w-full z-[9999] relative">
      <div
        className="
          bg-gradient-to-r from-gray-900/90 to-gray-800/90
          text-white shadow-lg px-3 py-2 rounded-xl border border-gray-700
          transition-all duration-300 hover:border-yellow-400
          w-[85%] sm:w-auto flex items-center justify-center
          backdrop-blur-md animate-fadeIn
        "
      >
        <span className="text-xs sm:text-sm mr-2 opacity-80">🌍 Translate:</span>
        <div id="google_translate_element"></div>
      </div>
    </div>
  );
};

export default Translator;
