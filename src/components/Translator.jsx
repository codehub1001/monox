import React, { useEffect } from "react";

const Translator = () => {
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr,de,it,pt,zh,ja,ar,ru",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
    }

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const el = document.getElementById("google_translate_element");
      if (el) el.innerHTML = "";
    };
  }, []);

  return (
    <div className="flex justify-center md:justify-end w-full">
      <div
        className="
          bg-gradient-to-r from-gray-900/90 to-gray-800/90 
          text-white shadow-lg 
          px-3 py-2 rounded-xl 
          border border-gray-700 
          transition-all duration-300 
          hover:border-yellow-400 
          w-[85%] sm:w-auto
          flex items-center justify-center
          backdrop-blur-md animate-fadeIn
        "
      >
        <span className="text-xs sm:text-sm mr-2 opacity-80">🌍 Translate:</span>
        <div id="google_translate_element" className="translate-dropdown"></div>
      </div>
    </div>
  );
};

export default Translator;
