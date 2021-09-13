import 'dotenv/config'

export default {
  expo: {
    name: 'ELFS',
    slug: 'elfs',
    version: '0.1',
    extra: {
      API_HOST: process.env.API_HOST,
    },
    orientation: 'portrait',
    icon: './assets/images/icon_180x180.png',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      // backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      buildNumber: '1',
      bundleIdentifier: 'au.edu.unimelb.eresearch.elfs',
    },
    android: {
      package: 'au.edu.unimelb.eresearch.elfs',
      versionCode: 1,
      permissions: [],
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
}
