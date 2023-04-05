const execSync = require('child_process').execSync

/**
 * TODO: need time, async do next
 */
export function installFlushConflictPlugin() {
  execSync('npm i eslint-config-prettier eslint-plugin-prettier -D')
}

// TODO: edit .eslintrc
