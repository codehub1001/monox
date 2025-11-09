import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const translatorLoaded = useRef(false); // ✅ prevents multiple loads
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Mirror Trades", path: "/mirror-trades" },
    { name: "Planning Services", path: "/planning-services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // ✅ Google Translate - Safe Load (Only once)
  useEffect(() => {
    if (translatorLoaded.current) return; // already loaded once
    translatorLoaded.current = true;

    // define callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,es,de,pt,it,ar,zh-CN,ja,ru",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // load the script once
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // cleanup
    return () => {
      script.remove();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
          onClick={handleLinkClick}
        >
          <span className="bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            Monox
          </span>
          <span className="text-black">Trades</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={handleLinkClick}
              className={`relative group transition-colors ${
                location.pathname === link.path
                  ? "text-yellow-500"
                  : "text-gray-800 hover:text-yellow-500"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 group-hover:w-full ${
                  location.pathname === link.path ? "w-full" : ""
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* 🌐 Translator */}
          <div className="flex items-center gap-2">
            <FaGlobe className="text-yellow-500 text-lg" />
            <div id="google_translate_element" className="min-w-[120px] text-sm"></div>
          </div>

          {/* Buttons */}
          <Link
            to="/login"
            className="px-4 py-2 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-400 hover:text-black active:scale-95 transition-all duration-200 text-sm font-semibold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 text-sm"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-yellow-500 focus:outline-none active:scale-90 transition-transform"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[65px] left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200">
          <div className="flex flex-col px-6 py-5 space-y-5 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={handleLinkClick}
                className={`block py-2 transition-colors ${
                  location.pathname === link.path
                    ? "text-yellow-500"
                    : "text-gray-800 hover:text-yellow-500"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-2 border-t border-gray-300 pt-3">
              <FaGlobe className="text-yellow-500" />
              <div id="google_translate_element_mobile" className="text-sm"></div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-3 sm:space-y-0 pt-4 border-t border-gray-300 mt-2">
              <Link
                to="/login"
                className="w-full sm:w-auto text-center border border-yellow-400 text-yellow-600 py-2 rounded-lg hover:bg-yellow-400 hover:text-black active:scale-95 transition-all duration-200"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto text-center bg-gradient-to-r from-yellow-400 to-amber-500 text-black py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
