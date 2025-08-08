#!/usr/bin/env node
/* eslint-disable */
/* eslint-env node */
/**
 * Update @popperjs/core dependency to alias npm:@sxzz/popperjs-es@^2.11.7
 *
 * Usage:
 *   node scripts/dependentLink.js [path/to/package.json]
 *
 * If no path is provided, defaults to .output/server/package.json
 */
const fs = require('fs')
const path = require('path')

const DEFAULT_TARGET = path.join(process.cwd(), '.output', 'server', 'package.json')
const inputArg = process.argv[2]
const targetPath = inputArg
  ? path.isAbsolute(inputArg)
    ? inputArg
    : path.join(process.cwd(), inputArg)
  : DEFAULT_TARGET

function updatePopperAlias(pkg) {
  const aliasValue = 'npm:@sxzz/popperjs-es@^2.11.7'
  let changed = false

  if (pkg && typeof pkg === 'object') {
    if (pkg.dependencies && pkg.dependencies['@popperjs/core']) {
      if (pkg.dependencies['@popperjs/core'] !== aliasValue) {
        pkg.dependencies['@popperjs/core'] = aliasValue
        changed = true
      }
    }
    if (pkg.devDependencies && pkg.devDependencies['@popperjs/core']) {
      if (pkg.devDependencies['@popperjs/core'] !== aliasValue) {
        pkg.devDependencies['@popperjs/core'] = aliasValue
        changed = true
      }
    }
  }

  return changed
}

function main() {
  if (!fs.existsSync(targetPath)) {
    console.error(`未找到文件: ${targetPath}`)
    process.exit(1)
  }

  const original = fs.readFileSync(targetPath, 'utf8')
  let pkg
  try {
    pkg = JSON.parse(original)
  } catch (e) {
    console.error(`JSON 解析失败: ${targetPath}`)
    console.error(e)
    process.exit(1)
  }

  const changed = updatePopperAlias(pkg)
  if (!changed) {
    console.log('无需修改：未发现 @popperjs/core，或已为目标别名。')
    return
  }

  const output = JSON.stringify(pkg, null, 2) + '\n'
  fs.writeFileSync(targetPath, output, 'utf8')
  console.log(`已更新 ${targetPath} 中的 @popperjs/core 为 npm:@sxzz/popperjs-es@^2.11.7`)
}

main()


