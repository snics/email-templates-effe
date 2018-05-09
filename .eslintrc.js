module.exports = {
  extends: [
    'xo',
    'prettier'
  ],
  env: {
    jest: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 90
      }
    ],
    'node/no-unsupported-features': [
      'error'
    ]
  },
  plugins: [
    'prettier',
    'node'
  ]
};
