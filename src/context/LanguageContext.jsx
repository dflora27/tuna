import React, { createContext, useState, useContext } from 'react';
import { tr } from '../locales/tr';
import { en } from '../locales/en';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('tr');
  
  const toggleLanguage = (newLang) => {
    setLang(newLang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let result = lang === 'tr' ? tr : en;
    for (const k of keys) {
      if (result[k] === undefined) return key;
      result = result[k];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
