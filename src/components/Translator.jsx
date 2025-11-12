// src/components/Translator.jsx
import React, { useEffect, useState } from "react";

const Translator = () => {
  const [open, setOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only initialize if not already done
    if (initialized) return;

    // Define the callback for Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,es,de,it,pt,zh,ja,ar,ru",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_container" // 👈 container ID inside our dropdown
      );
      setInitialized(true);
    };

    // Load script only once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, [initialized]);

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start">
      {/* 🌐 Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300"
      >
        🌐 Translate
      </button>

      {/* Dropdown Container */}
      {open && (
        <div
          className="mt-3 bg-gray-900 text-white p-3 rounded-xl shadow-2xl border border-gray-700 animate-fadeIn"
        >
          {/* 👇 This is the container Google will use */}
          <div id="google_translate_container"></div>
        </div>
      )}
    </div>
  );
};

export default Translator;
