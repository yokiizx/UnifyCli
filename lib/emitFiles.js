import chalk from 'chalk'
import { writeFile, mkdirSync } from 'node:fs'
import path from 'path'
import { TEMPLATE_PRETTIER, TEMPLATE_SETTINGS } from './template.js'
import exp from 'node:constants'

/**
 * @param {Boolean} Distinguish whether it is an overwrite or not
 * @param {Number} type: 0 - is .prettierrc.js, the others are json
 */
export const emitPrettier = (overwrite, type) => {
  const data = JSON.stringify(TEMPLATE_PRETTIER, null, '\t')
  const prettierrcPath = path.join('./.prettierrc')
  writeFile(prettierrcPath, data, (err) => {
    if (err) {
      console.log(chalk.redBright(err))
    } else {
      overwrite
        ? console.log(chalk.cyanBright(chalk.bold('.prettierrc'), 'has been regenerated'))
        : console.log(chalk.cyanBright(chalk.bold('.prettierrc'), 'has been created'))
    }
  })
}

/**
 * @param {Boolean} Distinguish whether it is an overwrite or not
 */
export const emitSettings = (overwrite) => {
  const data = JSON.stringify(TEMPLATE_SETTINGS, null, '\t')
  const inplictVscodeDir = path.join('./.vscode')
  const settingsJson = path.join(inplictVscodeDir, '/settings.json')
  mkdirSync(inplictVscodeDir)
  writeFile(settingsJson, data, (err) => {
    if (err) {
      console.log(chalk.redBright(err))
    } else {
      overwrite
        ? console.log(chalk.cyanBright(chalk.bold('.vscode/settings.json'), 'has been regenerated'))
        : console.log(chalk.cyanBright(chalk.bold('.vscode/settings.json'), 'has been created'))
    }
  })
}

export function modifyEslintrcJs(oldConfig) {}

/**
 * TODO: whether delete file .editorconfig
 */
