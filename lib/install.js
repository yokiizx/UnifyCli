import chalk from 'chalk'
import inquirer from 'inquirer'
import shell from 'shelljs'
import { readFile, writeFile, writeFileSync } from 'node:fs'

const ESLINT_LIST = ['.eslintrc.js', '.eslintrc', '.eslintrc.json']
const INSERT_CONFIG = 'plugin:prettier/recommended'

export async function installFlushConflictPlugin() {
  console.log(chalk.blue('eslint-config-prettier and eslint-plugin-prettier are installing...'))
  const child = await shell.exec('npm i eslint-config-prettier eslint-plugin-prettier -D', {
    async: true
  })
  child.stdout.on('end', () => {
    console.log(
      chalk.bgGreenBright('eslint-config-prettier and eslint-plugin-prettier are installed')
    )
    dealEslintConfig()
    // TODO: edit .eslintrc
  })
}

/**
 * get .eslintrc
 * TODO: adapt .eslintrc.js and other exts
 */
export function dealEslintConfig() {
  const filename = '.eslintrc' // .eslintrc.js .eslintrc.json; .eslintrc
  readFile(filename, 'utf-8', (err, data) => {
    // TODO: change to inquirer
    if (err) {
      if (err.message.indexOf('no such file')) {
        const newConfig = {
          extends: [INSERT_CONFIG]
        }
        writeEslintConfig(filename, newConfig)
      } else {
        console.log(chalk.red(err.message))
      }
      return
    }
    const newConfig = generateEslintConfig(data)
    writeEslintConfig(filename, newConfig)
  })
}

/**
 * @desc    read eslint file
 * @param   {String} oldConfig old eslint config
 * @returns {String} new eslint config
 */
function generateEslintConfig(oldConfig) {
  const eslintrc = JSON.parse(oldConfig)
  const hasExtendsProp = eslintrc.hasOwnProperty('extends')
  if (!hasExtendsProp) {
    eslintrc.extends = [INSERT_CONFIG]
  } else if (hasExtendsProp && !~eslintrc.extends.indexOf(INSERT_CONFIG)) {
    eslintrc.extends.push(INSERT_CONFIG)
  }
  return eslintrc
}

function writeEslintConfig(filename, newConfig) {
  writeFile(filename, JSON.stringify(newConfig, null, '\t'), (err) => {
    if (err) {
      console.log(chalk.red(err.message))
      return
    }
    console.log(chalk.greenBright('eslint is configured'))
  })
  // TODO: autorun prettier; it may cost a lot of time
  runPrettier()
}

/**
 * @description: default prettier directory -- src
 * TODO: inquirer, let user specify directory
 */
async function runPrettier() {
  const child = await shell.exec('npx prettier --write ./src/**/*', {
    async: true
  })
  child.stdout.on('end', () => {
    console.log(chalk.greenBright('Auto formatted all files in the src directory'))
  })
}
