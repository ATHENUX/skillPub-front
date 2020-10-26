import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLanguageBrowser = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const language = navigator.language;
    const local = language.split("-");
    i18n.changeLanguage(local[0]);
  }, [i18n]);
};

export default useLanguageBrowser;
