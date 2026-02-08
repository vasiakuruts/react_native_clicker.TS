import { useState, useCallback, useEffect } from 'react';
import { Languages, LanguageKey, LanguageIndex } from '../constants/languages';

interface UseLanguageProps {
  initialLang?: LanguageIndex;
  onLangChange?: (lang: LanguageIndex) => void;
}

export const useLanguage = (props?: UseLanguageProps) => {
  const [lang, setLang] = useState<LanguageIndex>(props?.initialLang ?? 0);

  // Оновлюємо мову коли змінюється initialLang
  useEffect(() => {
    if (props?.initialLang !== undefined) {
      setLang(props.initialLang);
    }
  }, [props?.initialLang]);

  const changeLang = useCallback(() => {
    setLang((prev) => {
      const newLang = (prev < 2 ? prev + 1 : 0) as LanguageIndex;
      props?.onLangChange?.(newLang);
      return newLang;
    });
  }, [props]);

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
