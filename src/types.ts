export type PageId = 'home' | 'photography' | 'design' | 'about' | 'connect';

export type LanguageCode = 'en' | 'ar' | 'fr' | 'it' | 'es' | 'tr' | 'zh' | 'ru';

export type ThemeMode = 'dark' | 'light';

export type PhotoCategory = 'all' | 'events' | 'showroom' | 'products' | 'sessions';

export type DesignCategory = 'all' | 'social' | 'uiux' | 'branding' | 'logofolio' | 'packaging';

export type BassetStyle = 'basset7-outline' | 'basset7-dimensional' | 'basset7-solid';

export interface GalleryItem {
  id: string;
  category: string;
  titleKey: string;
  descKey: string;
  image: string;
  tagKey: string;
}
