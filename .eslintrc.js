module.exports = {
  overrides: [
    {
      files: ['*.jsx', '*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/consistent-type-imports': 'off'
      }
    }
  ]
}
