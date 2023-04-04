import chalk from 'chalk'
import { writeFileSync, mkdirSync } from 'node:fs'
import { TEMPLATE_PRETTIER, TEMPLATE_SETTINGS } from './template.js'

export const emitPrettier = () => {
  const data = JSON.stringify(TEMPLATE_PRETTIER, null, '\t')
  writeFileSync('./.prettierrc', data, (err) => {
    if (err) console.log(chalk.redBright(err))
  })
}

export const emitSettings = () => {
  const data = JSON.stringify(TEMPLATE_SETTINGS, null, '\t')
  mkdirSync('./.vscode')
  writeFileSync('./.vscode/settings.json', data, (err) => {
    if (err) console.log(chalk.redBright(err))
  })
}
