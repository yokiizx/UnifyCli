#!/usr/bin/env node

import chalk from 'chalk'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { errorHandler } from '../lib/errorHandler.js'
import { defaultCommand } from '../lib/commands/defaultCommand.js'

process.on('uncaughtException', errorHandler)
process.on('unhandledRejection', errorHandler)

const argv = yargs(hideBin(process.argv))
  .option('config', {
    alias: 'c',
    desc: 'Specified config filepath',
    type: 'string'
  })
  .option('track', {
    desc: 'Show tracked error stack message'
  })
  .help('help')
  .alias('help', 'h')
  .alias('version', 'v')
  .command('$0', 'Run script interactively', {}, defaultCommand)
  .command('run <name>', 'Run script imperatively', {
    skip: {
      alias: 's',
      desc: 'Skip the chaining paths',
      boolean: true
    }
  })
  .command(['list [name]', 'ls [name]'], 'Show all scripts in table', {
    compact: {
      desc: 'Compact mode',
      boolean: true
    }
  })
  .example('npx $0', '- Run your script interactive')
  .example('npx $0 run dev', '- Run "dev" script non-interactive')
  .example(
    'npx $0 run build.deploy',
    '- Run "build" and "deploy" child script in chain order'
  )
  .example('npx $0 list', '- Show all scripts in table')
  .strict(true)
  .wrap(null)
  .fail((msg, err, yargs) => {
    if (err) throw err // preserve stack
    if (msg) {
      console.log(yargs.help() + '\n')
      throw new Error(msg)
    }
  }).argv
