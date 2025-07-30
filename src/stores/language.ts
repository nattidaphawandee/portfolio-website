import { defineStore } from 'pinia';
import config from '@/config';

export const useLanguageStore = defineStore({
  id: 'language',
  state: () => ({
    Sidebar_drawer: config.Sidebar_drawer,
    Customizer_drawer: config.Customizer_drawer,
    mini_sidebar: config.mini_sidebar,
    setHorizontalLayout: config.setHorizontalLayout, // Horizontal layout
    actTheme: '',
    fontTheme: config.fontTheme,
    inputBg: config.inputBg,
    boxed: config.boxed,
    modeDarkLight: false,
    themeColors: [
      { name: 'MaTheme', bg: 'themeLightMaPreset' },
      {
        name: 'PurpleTheme',
        bg: 'themeBluePurplePreset'
      },
      {
        name: 'GreenTheme',
        bg: 'themeGreenDarkPreset'
      },
      {
        name: 'PinkTheme',
        bg: 'themePinkPreset'
      },
      {
        name: 'YellowTheme',
        bg: 'themeYellowPreset'
      },
      {
        name: 'SeaGreenTheme',
        bg: 'themeSeaGreenPreset'
      },
      {
        name: 'OliveGreenTheme',
        bg: 'themeOliveGreenPreset'
      },
      {
        name: 'SpeechBlueTheme',
        bg: 'themeSpeechBluePreset'
      },
      { name: 'DarkMaTheme', bg: 'themeDarkMaPreset' },
      { name: 'DarkPurpleTheme', bg: 'themeDarkPurplePreset' },
      { name: 'DarkGreenTheme', bg: 'themeDarkGreenPreset' },
      { name: 'DarkPinkTheme', bg: 'themeDarkPinkPreset' },
      { name: 'DarkYellowTheme', bg: 'themeDarkYellowPreset' },
      { name: 'DarkSeaGreenTheme', bg: 'themeDarkSeaGreenPreset' },
      { name: 'DarkOliveGreenTheme', bg: 'themeDarkOliveGreenPreset' },
      { name: 'DarkSpeechBlueTheme', bg: 'themeDarkSpeechBluePreset' }
    ]
  }),

  getters: {},
  actions: {
    FiltersLanguage (data : any, key : string) {
      return data[`${key}`]
    },
    SET_MODE_DARK_LIGHT() {
      this.modeDarkLight = !this.modeDarkLight;
    },
    SET_SIDEBAR_DRAWER() {
      this.Sidebar_drawer = !this.Sidebar_drawer;
    },
    SET_MINI_SIDEBAR(payload: boolean) {
      this.mini_sidebar = payload;
    },
    SET_CUSTOMIZER_DRAWER(payload: boolean) {
      this.Customizer_drawer = payload;
    },

    SET_LAYOUT(payload: boolean) {
      this.setHorizontalLayout = payload;
    },
    SET_THEME(payload: string) {
      this.actTheme = payload;
    },
    SET_FONT(payload: string) {
      this.fontTheme = payload;
    },
    SetActTheme(actTheme: string) {
      this.actTheme = actTheme;
      const text: string = actTheme;
      const match = text.match('Dark');
      this.modeDarkLight = match === null ? false : true;
    }
  }
});
