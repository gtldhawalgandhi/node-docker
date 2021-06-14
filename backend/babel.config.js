module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: { node: '14' }
      }
    ]
  ],
  plugins: [
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