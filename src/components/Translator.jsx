import React, { useEffect, useState } from "react";

const Translator = () => {
  const [expanded, setExpanded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Avoid adding script multiple times
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      // Define init function globally
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr,de,it,pt,zh,ja,ar,ru",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
        setInitialized(true);
      };
    } else {
      // If script already exists, init again after short delay
      const checkInterval = setInterval(() => {
        if (window.google && window.google.translate && !initialized) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,es,fr,de,it,pt,zh,ja,ar,ru",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
          setInitialized(true);
          clearInterval(checkInterval);
        }
      }, 1000);
    }
  }, [initialized]);

  return (
    <div className="fixed bottom-5 left-5 z-[9999] flex flex-col items-start">
      {/* 🌍 Floating Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg transition"
      >
        🌍 Translate
      </button>

      {/* Dropdown Container */}
      {expanded && (
        <div className="mt-2 bg-gray-800 text-white p-3 rounded-lg shadow-lg min-w-[220px]">
          <div id="google_translate_element" />
          {!initialized && (
            <p className="text-xs text-gray-400 mt-2">
              Loading translator...
            </p>
          )}
        </div>
      )}

      <style>{`
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
        }
        .goog-te-gadget-simple .goog-te-combo {
          background-color: #1f2937 !important;
          color: white !important;
          padding: 6px 8px !important;
          border-radius: 6px !important;
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
