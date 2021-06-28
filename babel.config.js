const path = require('path')

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: { node: '12.20' }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-transform-destructuring",
    [
      'module-resolver',
      {
        alias: {
          '@app/backend/src': process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'packages/backend/build') : path.resolve(__dirname, 'packages/backend/src'),
          '@app/realtime/src': process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'packages/realtime/build') : path.resolve(__dirname, 'packages/realtime/src'),
          '@app/graph/src': process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'packages/graph/build') : path.resolve(__dirname, 'packages/graph/src'),
          '@app/lib/src': path.resolve(__dirname, 'packages/lib/build')
        }
      }
    ]
  ],
};