import React, { useEffect, useState } from "react";

const Translator = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Prevent loading script multiple times
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr,de,it,pt,zh,ja,ar,ru",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.id = "google-translate-script";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If already loaded, reinitialize translator
      setTimeout(() => {
        if (
          window.google &&
          window.google.translate &&
          document.getElementById("google_translate_element") &&
          !document.getElementById("google_translate_element").hasChildNodes()
        ) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,es,fr,de,it,pt,zh,ja,ar,ru",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        }
      }, 1000);
    }
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-[9999] flex flex-col items-start">
      {/* 🌍 Floating button */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg focus:outline-none transition"
      >
        🌍 Translate
      </button>

      {/* 🧠 Google Translate widget appears here */}
      {expanded && (
        <div className="mt-2 bg-gray-800 text-white p-3 rounded-lg shadow-lg min-w-[200px]">
          <div id="google_translate_element" />
        </div>
      )}

      {/* 🔧 Styles */}
      <style>{`
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
        }
        .goog-te-gadget-simple .goog-te-combo {
          background-color: #1f2937 !important;
          color: white !important;
          padding: 6px !important;
          border-radius: 5px !important;
          border: 1px solid #374151 !important;
          font-size: 14px !important;
        }
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default Translator;
