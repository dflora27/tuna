import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { tr } from '../locales/tr';
import { en } from '../locales/en';

const LanguageContext = createContext();
const STORAGE_KEY = 'bt_lang';

const readInitialLang = () => {
  if (typeof window === 'undefined') return 'tr';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'tr' || stored === 'en') return stored;
  } catch {
    // localStorage blocked (private mode); ignore and fall back.
  }
  return 'tr';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(readInitialLang);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const toggleLanguage = useCallback((newLang) => {
    if (newLang === 'tr' || newLang === 'en') {
      setLang(newLang);
    }
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let result = lang === 'tr' ? tr : en;
      for (const k of keys) {
        if (result == null || result[k] === undefined) return key;
        result = result[k];
      }
      return result;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
