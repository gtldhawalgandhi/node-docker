const path = require('path')

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: { node: '12.13' }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-transform-destructuring",
    [
      'module-resolver',
      {
        alias: {
          '@app/backend/src': path.resolve(__dirname, 'packages/backend/src')
        }
      }
    ]
  ],
};