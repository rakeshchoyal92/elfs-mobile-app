// Fake webpack config to make relative importing work on webstorm.

const path = require('path')
const rootPath = path.resolve(__dirname, '.')

module.exports = {
  context: __dirname,

  // Directory resolution fix
  resolve: {
    alias: {
      '@src': path.resolve(rootPath, 'src'),
      '@api': path.resolve(rootPath, 'src', 'api'),
      '@store': path.resolve(rootPath, 'src', 'store'),
      '@actions': path.resolve(rootPath, 'src', 'store', 'actions'),
      '@reducers': path.resolve(rootPath, 'src', 'store', 'reducers'),
      '@components': path.resolve(rootPath, 'src', 'components'),
      '@screens': path.resolve(rootPath, 'src', 'screens'),
      '@constants': path.resolve(rootPath, 'src', 'constants'),
      '@utils': path.resolve(rootPath, 'src', 'utils'),
      '@navigations': path.resolve(rootPath, 'src', 'navigations'),
      '@themes': path.resolve(rootPath, 'src', 'themes'),
    },
  },
}
