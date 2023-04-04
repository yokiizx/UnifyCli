#!/usr/bin/env node

import chalk from 'chalk'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { errorHandler } from '../lib/errorHandler.js'
import { defaultCommand } from '../lib/commands/defaultCommand.js'

process.on('uncaughtException', errorHandler)
process.on('unhandledRejection', errorHandler)

/**
 * todo: add examples
 */
const argv = yargs(hideBin(process.argv))
  .usage(
    chalk.magenta('\n help generate .prettierrc and  ./vscode/setting.json')
  )
  .alias('help', 'h')
  .alias('version', 'v')
  .alias('force', 'f')
  .option('force', {
    desc: 'Generate the config file directly regardless of whether the .prettierrc/settings.json file already exists'
  })
  .command(
    '$0',
    'Initializes the .prettier file and .vscode/setting.json',
    {},
    defaultCommand
  )
  .command('config <name>', 'Run script imperatively', {})
  .command(['previous [name]', 'ls [name]'], 'Show all scripts in table', {
    compact: {
      desc: 'Compact mode',
      boolean: true
    }
  })
  .strict(true)
  .wrap(null)
  .fail((msg, err, yargs) => {
    if (err) throw err
    if (msg) {
      console.log(yargs.help() + '\n')
      throw new Error(msg)
    }
  }).argv
