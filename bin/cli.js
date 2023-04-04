#!/usr/bin/env node

import chalk from 'chalk'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { errorHandler } from '../lib/errorHandler.js'
import { defaultCommand } from '../lib/commands/defaultCommand.js'
import { configCommand } from '../lib/commands/configCommand.js'
import { useCommand } from '../lib/commands/useCommand.js'

process.on('uncaughtException', errorHandler)
process.on('unhandledRejection', errorHandler)

/**
 * todo: add examples
 */
yargs(hideBin(process.argv))
  .usage(chalk.magenta('\n Make it easy to configure unified formatting code '))
  .alias('help', 'h')
  .alias('version', 'v')
  .command(
    '$0',
    'Initializes config files',
    (yargs) => {
      yargs.option('force', {
        alias: 'f',
        desc: 'Force overwrite profile'
      })
    },
    defaultCommand
  )
  .command(
    ['config <prettier|settings>', 'c <prettier|settings>'],
    'config .prettierrc or settings.json manually',
    {},
    configCommand
  )
  .command('use <conf>', 'Choose an old configure version', {}, useCommand)
  // todo:  format src directory recursively, and need progress
  .strict(true)
  .wrap(null)
  .fail((msg, err, yargs) => {
    if (err) throw err
    if (msg) {
      console.log(yargs.help() + '\n')
      throw new Error(msg)
    }
  }).argv
