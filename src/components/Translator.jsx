// src/components/Translator.jsx
import React, { useEffect, useState } from "react";

const Translator = () => {
  const [visible, setVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Prevent double script load
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
        setInitialized(true);
      };
    }

    // Load script dynamically
    const existingScript = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate && !initialized) {
      window.googleTranslateElementInit();
    }
  }, [initialized]);

  return (
    <div className="fixed bottom-5 left-5 z-[9999]">
      {/* Toggle Button */}
      <button
        onClick={() => setVisible(!visible)}
        className="bg-yellow-500 text-black px-3 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition"
      >
        🌐 Translate
      </button>

      {/* Google Translate Dropdown */}
      {visible && (
        <div
          id="google_translate_element"
          className="mt-3 p-2 rounded-xl bg-gray-900 animate-fadeIn shadow-lg border border-gray-700"
        />
      )}
    </div>
  );
};

export default Translator;
