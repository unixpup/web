// I18n configuration for the Astro website
import type { AstroI18nConfig } from 'astro-i18n';

export const languages = [
  {
    locale: 'en',
    name: 'English',
    flag: '🇬🇧',
    default: true
  },
  {
    locale: 'es',
    name: 'Español',
    flag: '🇪🇸'
  },
  {
    locale: 'ja',
    name: '日本語',
    flag: '🇯🇵'
  },
  {
    locale: 'de',
    name: 'Deutsch',
    flag: '🇩🇪'
  },
  {
    locale: 'fr',
    name: 'Français',
    flag: '🇫🇷'
  },
  {
    locale: 'zh',
    name: '中文',
    flag: '🇨🇳'
  },
  {
    locale: 'pt',
    name: 'Português',
    flag: '🇵🇹'
  },
  {
    locale: 'ko',
    name: '한국어',
    flag: '🇰🇷'
  }
];

// Astro i18n configuration
export const config: AstroI18nConfig = {
  defaultLocale: 'en',
  locales: languages.map(lang => lang.locale),
  showDefaultLocale: false,
  trailingSlash: 'always',
  translations: {
    en: 'src/i18n/locales/en.json',
    es: 'src/i18n/locales/es.json',
    ja: 'src/i18n/locales/ja.json',
    de: 'src/i18n/locales/de.json',
    fr: 'src/i18n/locales/fr.json',
    zh: 'src/i18n/locales/zh.json',
    pt: 'src/i18n/locales/pt.json',
    ko: 'src/i18n/locales/ko.json'
  },
  routes: {
    // Define any custom route translations here
  }
};

export default config;