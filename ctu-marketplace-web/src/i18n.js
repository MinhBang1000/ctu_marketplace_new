import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import common_en from "./translations/en/common_en.json";
import common_vi from "./translations/vi/common_vi.json";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    vi: {
      common: common_vi, // 'common' is our custom namespace
    },
    en: {
      common: common_en, // 'common' is our custom namespace
    },
  },
  fallbackLng: "en",
  lng: 'vi',

  interpolation: {
    formatSeparator: ",",
  },

  react: {
    useSuspense: false
  },
});

export default i18n;
