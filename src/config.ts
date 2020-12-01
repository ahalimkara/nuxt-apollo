// Add public variables here, do not add secret variables such as database credentials

export enum Locales {
  en = 'en',
  ku = 'ku',
}

interface Config {
  DEFAULT_LOCALE: Locales
  AVAILABLE_LOCALES: Locales[]
  LOCALE_NAMES: Record<Locales, string>
  GRAPHQL_API: string
}

const config: Config = {
  DEFAULT_LOCALE: Locales.en,
  AVAILABLE_LOCALES: [Locales.en, Locales.ku],
  LOCALE_NAMES: { en: 'English', ku: 'Kurdî' },
  GRAPHQL_API: 'http://localhost:3210/graphql',
}

export default config
