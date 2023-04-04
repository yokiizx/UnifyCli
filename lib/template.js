/**
 * .pretterrc template
 */
export const TEMPLATE_PRETTIER = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'ignore',
  endOfLine: 'auto'
}

/**
 * .vscode/settings template
 */
export const TEMPLATE_SETTINGS = {
  'editor.formatOnSave': true,
  'editor.codeActionsOnSave': {
    'source.fixAll.eslint': true
  }
}
