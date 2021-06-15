/* eslint-disable no-console */
const { resolve, join, basename } = require('path')
const { readFile, writeFile, copy } = require('fs-extra')

const packagePath = process.cwd()
const distPath = join(packagePath, './dist')

const writeJson = (targetPath, obj) =>
  writeFile(targetPath, JSON.stringify(obj, null, 2), 'utf8')

async function createPackageFile() {
  const packageData = await readFile(
    resolve(packagePath, './package.json'),
    'utf8'
  )
  const {
    scripts,
    devDependencies,
    module,
    files,
    ...packagePropsToKeep
  } = JSON.parse(packageData)

  const newPackageData = {
    ...packagePropsToKeep,
    private: false,
    main: './index.js',
    types: './index.d.ts',
  }

  const targetPath = resolve(distPath, './package.json')

  await writeJson(targetPath, newPackageData)
  console.log(`Created package.json in ${targetPath}`)
}

async function includeFileInBuild(file, subPath = '') {
  const sourcePath = resolve(packagePath, file)
  const targetPath = resolve(distPath, subPath, basename(file))
  await copy(sourcePath, targetPath)
  console.log(`Copied ${sourcePath} to ${targetPath}`)
}

async function run() {
  try {
    await createPackageFile()
    await includeFileInBuild('./README.md')
    await includeFileInBuild('./LICENSE')
    await includeFileInBuild('./index.d.ts')
    await includeFileInBuild('./index.d.ts', 'server')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
