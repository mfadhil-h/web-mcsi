module.exports = {
  root: true,
  env: {
     browser: true,
     node: true
  },
  extends: [
     '@nuxtjs/eslint-config-typescript',
     'plugin:nuxt/recommended',
     'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      // or whatever plugin that is causing the clash
      'error',
      {
          tabWidth: 3,
          endOfLine: 'auto'
      }
    ]
  }
}
