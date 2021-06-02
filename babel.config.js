module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@root': '.',
            '@src': './src',
            '@screens': './src/screens',
            '@navigations': './src/navigations',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@constants': './src/constants',
            '@assets': './assets',
            '@store': './src/store',
            '@reducers': './src/store/reducers',
            '@actions': './src/store/actions',
            '@api': './src/api',
            '@utils': './src/utils',
            '@themes': './src/themes',
          },
        },
      ],
      ['macros'],
    ],
  }
}
