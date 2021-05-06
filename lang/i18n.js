import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-chained-backend'
import AsyncStorageBackend from 'i18next-async-storage-backend' // primary use cache
import XHR from 'i18next-xhr-backend' // fallback xhr load

import translationEng from '../locales/en/translation.json'
import translationHb from '../locales/hr/translation.json'
import translationVi from '../locales/vt/translation.json'

const resources = {
  en: {
    translation: translationEng,
  },
  hr: {
    translation: translationHb,
  },
  vt: {
    translation: translationVi,
  },
}

export default i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    react: {
      useSuspense: false,
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      backends: [
        AsyncStorageBackend, // primary
        XHR, // fallback
      ],
      backendOptions: [
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
      ],
    },
  })
