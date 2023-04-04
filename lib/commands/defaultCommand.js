import { emitPrettier } from '../emitPrettier.js'

/**
 * @description: this command will do next jobs：
 *               1. create .prettierrc file
 *               2. create .vscode/settings file
 *               3. install eslint-config-prettier eslint-plugin-prettier to fix conflict
 *               4. edit .eslintrc
 */
export async function defaultCommand(argv) {
  console.log('📌📌📌 ~ defaultCommand ~ argv:', argv)
  await emitPrettier()
}
