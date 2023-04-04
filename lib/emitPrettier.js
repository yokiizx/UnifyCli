/**
 * emit .prettierrc file
 */
import { writeFile } from 'node:fs'
import chalk from 'chalk'

export const emitPrettier = () => {
  writeFile('./.prettierrc', '123', (err) => {
    if(err) console.log(chalk.redBright(err))
  })
}
