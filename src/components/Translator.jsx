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
    <div className="flex justify-center md:justify-end w-full z-[9999] relative px-2 mt-2 md:mt-0">
      <div
        className="
          bg-gradient-to-r from-gray-900 to-gray-800
          text-white shadow-md md:shadow-lg
          px-3 py-2 md:px-4 md:py-2
          rounded-full md:rounded-xl
          border border-gray-700 hover:border-yellow-400
          transition-all duration-300
          w-full sm:w-auto max-w-[220px]
          flex items-center justify-center gap-2
          backdrop-blur-md
        "
      >
        <span className="text-sm sm:text-base font-medium whitespace-nowrap">
          🌍 Translate
        </span>
        <div
          id="google_translate_element"
          className="text-xs sm:text-sm bg-transparent"
        ></div>
      </div>
    </div>
  );
};

export default Translator;
