import chalk from 'chalk'
import { emitPrettier, emitSettings } from '../emitFiles.js'
import { existsSync } from 'node:fs'
import inquirer from 'inquirer'
import rimraf from 'rimraf'

const HAS_VSCODEDIR = existsSync('./.vscode')
const HAS_PRETTIER = existsSync('.prettierrc')
/**
 * @description: this command will do next jobs：
 *               1. create .prettierrc
 *               2. create .vscode/settings
 *               3. install eslint-config-prettier eslint-plugin-prettier to fix conflict
 *               4. edit .eslintrc
 */
// TODO: prompt it will overwrite previous file
export async function defaultCommand(argv) {
  const { force } = argv
  if (force) {
    forceGenerateConfigFilesPrompt()
  } else if (!HAS_VSCODEDIR && !HAS_PRETTIER) {
    emitPrettier()
    emitSettings()
  } else {
    if (HAS_PRETTIER) {
      inquirer.prompt([
        {
          type: 'confirm',
          message: 'first',
          name: 'overwritePrettier',
          default: true
        },
        {
          type: 'confirm',
          message: 'second',
          name: 'overwriteSettings',
          default: true
        }
      ])
      // .then(async ({ overwritePrettier, overwriteSettings }) => {
      //   overwritePrettier && emitPrettier()
      //   overwriteSettings && (await delVscode()) && emitSettings()
      // })
      // .catch((err) => {
      //   console.log(chalk.redBright(err.message))
      // })
    } else {
      emitPrettier()
    }
    if (HAS_VSCODEDIR) {
    } else {
      emitSettings()
    }
  }
  // TODO: install plugin; edit .eslintrc
}

async function forceGenerateConfigFilesPrompt() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      message: 'this operation will overwrite .prettierrc and .vscode/settings.json, are you sure?',
      default: true,
      name: 'sureForce'
    }
  ])
  if (!answer.sureForce) {
    console.log(chalk.bgGreenBright('End of process'))
  } else {
    await delExistProfiles()
    emitPrettier(true)
    emitSettings(true)
  }
}

/**
 * prompt generate .prettierrc template
 */
function promptGeneratePrettier() {}

/**
 * prompt generate .vscode/settings.json template
 */
function promptGenerateSettings() {}

/**
 * delete .prettierrc and .vscode/setting.json
 */
async function delExistProfiles() {
  await delPrettier()
  await delVscode()
}

async function delPrettier() {
  if (!HAS_PRETTIER) return
  const DEL_PRETTIER_SUCCESS = await rimraf('.prettierrc')
  return DEL_PRETTIER_SUCCESS
  // DEL_PRETTIER_SUCCESS &&
  //   console.log(chalk.green(chalk.strikethrough('FILE: .prettierrc'), 'has been deleted.'))
}

async function delVscode() {
  if (!HAS_VSCODEDIR) return
  const DEL_VSCODE_SUCCESS = await rimraf('.vscode')
  return DEL_VSCODE_SUCCESS
  // DEL_VSCODE_SUCCESS &&
  //   console.log(chalk.green(chalk.strikethrough('DIR: .vscode'), 'has been deleted.'))
}
