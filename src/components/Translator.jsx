// src/components/Translator.jsx
import React, { useEffect, useState } from "react";

const Translator = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Define Google callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
      setLoaded(true);
    };

    // Load Google Translate script once
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate && !loaded) {
      window.googleTranslateElementInit();
    }
  }, [loaded]);

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
          id="google_translate_element"
          className="mt-3 bg-gray-900 text-white p-3 rounded-xl shadow-2xl border border-gray-700 animate-fadeIn"
        ></div>
      )}
    </div>
  );
};

export default Translator;
