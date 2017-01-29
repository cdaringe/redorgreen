'use strict'

const path = require('path')
const cp = require('child_process')

const env = Object.assign({}, process.env, { NODE_ENV: 'production' })
const projectRoot = path.resolve(__dirname, '..')
const uiDir = path.resolve(__dirname, '..', '..', 'ui')

const HOSTNAME = process.env.HOSTNAME
if (!HOSTNAME) {
  throw new Error('please set HOSTNAME to tag image with (HOSTNAME/redorgreen)')
}

if (process.argv.indexOf('--no-ui-build') === -1) {
  console.log('[redorgreenapi-build]: building web assets')
  cp.execSync(`npm run build`, { cwd: uiDir, env })
  console.log('[redorgreenapi-build]: copying web assets to ./static')
  cp.execSync(`cp -r ${uiDir}/build/* ${projectRoot}/static`)
}
console.log('[redorgreenapi-build]: containerizing')
cp.execSync(`docker build -t cdaringe/redorgreenapi -t ${HOSTNAME}/redorgreenapi registry.${HOSTNAME}/redorgreenapi .`, { cwd: projectRoot, env })