import chalk from 'chalk'
import inquirer from 'inquirer'
import shell from 'shelljs'
import path from 'path'
import { readFile, writeFile, writeFileSync, existsSync } from 'node:fs'

const ESLINT_LIST = ['.eslintrc.js', '.eslintrc', '.eslintrc.json'] // other exts todo
const INSERT_CONFIG = 'plugin:prettier/recommended'

let npm_source = 'npm'
let eslint_file = '.eslintrc'

export async function installFlushConflictPlugin() {
  await selectNpmSource()
  console.log(chalk.blue('eslint-config-prettier and eslint-plugin-prettier are installing...'))
  const child = await shell.exec(
    `${npm_source} i eslint-config-prettier eslint-plugin-prettier -D`,
    {
      async: true
    }
  )
  child.stdout.on('end', () => {
    console.log(
      chalk.bgGreenBright('eslint-config-prettier and eslint-plugin-prettier are installed')
    )
    dealEslintConfig()
  })
}

// * temp config, for my own company, default is npm
// TODO: wolud like to change to input type
async function selectNpmSource() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      message: 'which npm source would you like to use?default is npm',
      name: 'npmSource',
      choices: ['npm', 'yxtnpm']
    }
  ])
  npm_source = answer.npmSource
}

/**
 * get .eslintrc
 * TODO: adapt .eslintrc.js and other exts
 */
export function dealEslintConfig() {
  whichEslint()
  if (!eslint_file) {
    const newConfig = writeEslintConfig(path.join('.eslintrc'), {
      extends: [INSERT_CONFIG]
    })
    return
  }
  // TODO: change to inquirer
  readFile(eslint_file, 'utf-8', (err, data) => {
    if (err) {
      console.log(chalk.red(err.message))
      return
    }
    const newConfig = generateEslintConfig(data)
    writeEslintConfig(eslint_file, newConfig)
  })
}

/**
 * @desc    read eslint file
 * @param   {String} oldConfig old eslint config
 * @returns {String} new eslint config
 */
function generateEslintConfig(oldConfig) {
  if (eslint_file === '.eslintrc.js') {
    if (!~oldConfig.indexOf('extends')) {
      return `
      module.exports = {
        extends: [${INSERT_CONFIG}]
      }
      `
    } else if (!!~oldConfig.indexOf(INSERT_CONFIG)) {
      return oldConfig
    } else {
      const extends_pos = oldConfig.indexOf('extends')
      const left_bracket = oldConfig.indexOf('[', extends_pos)
      const right_bracket = oldConfig.indexOf(']', extends_pos)
      const temp = oldConfig.substring(left_bracket + 1, right_bracket)
      const tempArr = temp.split(',')
      const tempStr = JSON.stringify(tempArr.concat(INSERT_CONFIG).join(','))
      return oldConfig.substring(0, left_bracket + 1) + tempStr + oldConfig.substring(right_bracket)
    }
  } else {
    // deal except .eslint.js
    const eslintrc = JSON.parse(oldConfig)
    const hasExtendsProp = eslintrc.hasOwnProperty('extends')
    if (!hasExtendsProp) {
      eslintrc.extends = [INSERT_CONFIG]
    } else if (hasExtendsProp && !~eslintrc.extends.indexOf(INSERT_CONFIG)) {
      eslintrc.extends.push(INSERT_CONFIG)
    }
    return eslintrc
  }
}

function writeEslintConfig(filename, newConfig) {
  writeFile(
    filename,
    filename === '.eslintrc.js' ? newConfig : JSON.stringify(newConfig, null, '\t'),
    (err) => {
      if (err) {
        console.log(chalk.red(err.message))
        return
      }
      console.log(chalk.greenBright('eslint is configured'))
    }
  )
  removeFromGitignore()
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
    console.log(chalk.greenBright('Great!🌈 Auto formatted all files in the src directory'))
  })
}

/**
 * check file existed
 */
export function whichEslint() {
  const currentEslintFile = ESLINT_LIST.find((filename) => existsSync(filename))
  if (!currentEslintFile) {
    eslint_file = null
    return
  }
  eslint_file = currentEslintFile
  return currentEslintFile
}

function removeFromGitignore() {
  readFile(path.join('.gitignore'), 'utf-8', (err, data) => {
    if (err) {
      console.log(chalk.red(err.message))
      return
    }
    const pos = data.indexOf('.vscode')
    const newData = data.substring(0, pos) + data.substring(pos + 7)
    writeFile(path.join('.gitignore'), newData, (err) => {
      if (err) {
        console.log(chalk.red(err.message))
        return
      }
      console.log(chalk.greenBright('Note: .vscode has been removed from .gitignore'))
    })
  })
}
