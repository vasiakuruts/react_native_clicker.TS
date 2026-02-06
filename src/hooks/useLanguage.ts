import { useState, useCallback } from 'react';
import { Languages, LanguageKey, LanguageIndex } from '../constants/languages';

export const useLanguage = () => {
  const [lang, setLang] = useState<LanguageIndex>(0);

  const changeLang = useCallback(() => {
    setLang((prev) => (prev < 2 ? ((prev + 1) as LanguageIndex) : 0));
  }, []);

  const getText = useCallback(
    (key: LanguageKey, index?: number): string => {
      const value = Languages[key][lang];
      if (Array.isArray(value) && typeof index === 'number') {
        return value[index] as string;
      }
      return value as string;
    },
    [lang]
  );

  return {
    lang,
    changeLang,
    getText
  };
};
