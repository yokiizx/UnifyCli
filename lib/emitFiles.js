import chalk from 'chalk'
import { writeFile, mkdirSync } from 'node:fs'
import { TEMPLATE_PRETTIER, TEMPLATE_SETTINGS } from './template.js'

/**
 * @param {Boolean} Distinguish whether it is an overwrite or not
 */
export const emitPrettier = (overwrite) => {
  const data = JSON.stringify(TEMPLATE_PRETTIER, null, '\t')
  writeFile('./.prettierrc', data, (err) => {
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
  mkdirSync('./.vscode')
  writeFile('./.vscode/settings.json', data, (err) => {
    if (err) {
      console.log(chalk.redBright(err))
    } else {
      overwrite
        ? console.log(chalk.cyanBright(chalk.bold('.vscode/settings.json'), 'has been regenerated'))
        : console.log(chalk.cyanBright(chalk.bold('.vscode/settings.json'), 'has been created'))
    }
  })
}

/**
 * TODO: whether delete file .editorconfig
 */
