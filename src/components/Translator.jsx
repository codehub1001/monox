import React, { useEffect } from "react";

const Translator = ({ className = "" }) => {
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
    <div
      className={`relative bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 flex items-center justify-center ${className}`}
      style={{ zIndex: 10 }} // ensures menu overlay is above
    >
      <span className="text-xs sm:text-sm mr-2 opacity-80">🌍</span>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default Translator;
