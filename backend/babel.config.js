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
          '@app': './src'
        }
      }
    ]
  ],
};