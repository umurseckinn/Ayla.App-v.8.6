import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ayla.app',
  appName: 'Ayla',
  webDir: 'out',
  plugins: {
    StatusBar: {
      style: 'DARK',
      overlaysWebView: true,
      backgroundColor: '#050505'
    },
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#050505'
    }
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#050505',
    scrollEnabled: true
  },
  android: {
    backgroundColor: '#050505'
  }
};

export default config;
