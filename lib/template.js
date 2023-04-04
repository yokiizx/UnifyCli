/**
 * .pretterrc template
 */
export const TEMPLATE_PRETTIER = {
  printWidth: 100,
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
  },
  '[html]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode'
  },
  '[scss]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode'
  },
  '[javascript]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode'
  },
  '[json]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode'
  },
  '[typescriptreact]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode'
  },
  '[typescript]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode'
  },
  '[markdown]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode'
  },
  '[vue]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode'
  },
  '[jsonc]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode'
  }
}
