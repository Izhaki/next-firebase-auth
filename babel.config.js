const isTests = process.env.NODE_ENV === 'test'

module.exports = {
  ignore:
    // When running tests we need babel to transpile our tests, but we don't need this when transpiling the dist
    isTests ? [] : ['src/__mocks__', 'src/__tests__', 'src/testHelpers'],
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10',
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          src: './src',
        },
      },
    ],
  ],
}
