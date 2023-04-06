import chalk from 'chalk'
import path from 'path'
import { emitPrettier, emitSettings } from '../emitFiles.js'
import { existsSync } from 'node:fs'
import inquirer from 'inquirer'
import rimraf from 'rimraf'
import { installFlushConflictPlugin, dealEslintConfig } from '../install.js'

const HAS_VSCODEDIR = existsSync(path.join('./.vscode'))
const HAS_PRETTIER = existsSync(path.join('.prettierrc'))

/**
 * @description: this command will do next jobs：
 *               1. create .prettierrc
 *               2. create .vscode/settings
 *               3. install eslint-config-prettier eslint-plugin-prettier to fix conflict
 *               4. edit .eslintrc
 *               5. auto formatter all files
 */
export async function defaultCommand(argv) {
  const { force } = argv
  if (force) {
    forceGenerateConfigFilesPrompt()
  } else if (!HAS_VSCODEDIR && !HAS_PRETTIER) {
    emitPrettier()
    emitSettings()
  } else if (HAS_VSCODEDIR && HAS_PRETTIER) {
    await promptExist(2)
  } else {
    // HAS_PRETTIER ? await promptExist(0) : emitPrettier()
    // HAS_VSCODEDIR ? await promptExist(1) : emitSettings()
    if (HAS_PRETTIER) await promptExist(0)
    if (HAS_VSCODEDIR) await promptExist(1)
    if (!HAS_PRETTIER) emitPrettier()
    if (!HAS_VSCODEDIR) emitSettings()
  }

  setTimeout(() => {
    installFlushConflictPlugin()
  }, 43)
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
 * @desc    if one of config files exists
 * @param   {Number} 0 - prettier, 1 - settings.json, 2 - both
 */
async function promptExist(type) {
  const prompts = [
    {
      type: 'confirm',
      message: '.prettierrc already exists.Do you need to regenerate it?',
      name: 'overwritePrettier',
      default: true
    },
    {
      type: 'confirm',
      message: '.vscode/settings.json already exists.Do you need to regenerate it?',
      name: 'overwriteSettings',
      default: true
    }
  ]
  const answer = await inquirer.prompt(type === 2 ? prompts : [prompts[type]])
  const { overwritePrettier, overwriteSettings } = answer
  overwritePrettier && emitPrettier()
  overwriteSettings && (await delVscode()) && emitSettings()
}

/**
 * TODO: prompt generate .prettierrc template step by step
 */
function promptGeneratePrettier() {}

/**
 * TODO: prompt generate .vscode/settings.json template step by step
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
}

async function delVscode() {
  if (!HAS_VSCODEDIR) return
  const DEL_VSCODE_SUCCESS = await rimraf('.vscode')
  return DEL_VSCODE_SUCCESS
}
