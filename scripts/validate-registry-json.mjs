import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const projectRoot = new URL('..', import.meta.url).pathname
const publicDir = join(projectRoot, 'public')
const componentsDir = join(publicDir, 'components')
const registrySchemaUrl = 'https://ocx.kdco.dev/schemas/v2/registry.json'
const semverRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/

const readJson = (absolutePath, relativePathForError) => {
  const raw = readFileSync(absolutePath, 'utf8')

  try {
    return JSON.parse(raw)
  } catch (error) {
    throw new Error(`Invalid JSON: ${relativePathForError} (${error.message})`)
  }
}

const collectFiles = (rootDir, relativeDir = '') => {
  const currentDir = join(rootDir, relativeDir)
  const entries = readdirSync(currentDir, { withFileTypes: true })

  return entries
    .flatMap((entry) => {
      let nextRelativePath = entry.name

      if (relativeDir) {
        nextRelativePath = `${relativeDir}/${entry.name}`
      }

      if (entry.isDirectory()) {
        return collectFiles(rootDir, nextRelativePath)
      }

      if (entry.isFile()) {
        return [nextRelativePath]
      }

      return []
    })
    .sort((a, b) => a.localeCompare(b))
}

const mustExist = ['.well-known/ocx.json', 'index.json']

mustExist.forEach((relativePath) => {
  const absolutePath = join(publicDir, relativePath)

  try {
    readFileSync(absolutePath, 'utf8')
  } catch {
    throw new Error(`Missing required registry file: public/${relativePath}`)
  }
})

const discovery = readJson(
  join(publicDir, '.well-known/ocx.json'),
  'public/.well-known/ocx.json'
)
const indexBody = readJson(join(publicDir, 'index.json'), 'public/index.json')

if (indexBody.$schema !== registrySchemaUrl) {
  throw new Error(`index.json must declare ${registrySchemaUrl}`)
}

if (typeof indexBody.name !== 'string' || indexBody.name.length === 0) {
  throw new Error('index.json must include non-empty name')
}

if (typeof indexBody.version !== 'string' || indexBody.version.length === 0) {
  throw new Error('index.json must include non-empty version')
}

if (!semverRegex.test(indexBody.version)) {
  throw new Error('index.json version must be valid semver')
}

if (typeof indexBody.author !== 'string' || indexBody.author.length === 0) {
  throw new Error('index.json must include non-empty author')
}

if (discovery.index !== '/index.json') {
  throw new Error('Discovery document must point to /index.json')
}

if (!Array.isArray(indexBody.components) || indexBody.components.length === 0) {
  throw new Error('index.json must include non-empty components array')
}

const manifestSummaries = indexBody.components.map((component) => {
  const componentDir = join(componentsDir, component.name)
  const manifestRelativePath = `public/components/${component.name}/manifest.json`
  const manifestAbsolutePath = join(componentDir, 'manifest.json')

  let manifest

  try {
    manifest = readJson(manifestAbsolutePath, manifestRelativePath)
  } catch {
    throw new Error(`Missing required manifest: ${manifestRelativePath}`)
  }

  if (manifest.name !== component.name) {
    throw new Error(
      `manifest name mismatch for ${component.name}: manifest=${manifest.name}`
    )
  }

  if (manifest.componentType !== component.type) {
    throw new Error(
      `manifest type mismatch for ${component.name}: index=${component.type}, manifest=${manifest.componentType}`
    )
  }

  if (manifest.description !== component.description) {
    throw new Error(
      `manifest description mismatch for ${component.name}: index=${component.description}, manifest=${manifest.description}`
    )
  }

  const actualFiles = collectFiles(componentDir).filter((filePath) => {
    return filePath !== 'manifest.json'
  })

  if (!Array.isArray(component.files)) {
    throw new Error(
      `index component ${component.name} must include files array`
    )
  }

  if (actualFiles.length === 0) {
    throw new Error(`Component ${component.name} has no distributable files`)
  }

  const sortedIndexFiles = [...component.files].sort((a, b) =>
    a.localeCompare(b)
  )

  if (JSON.stringify(sortedIndexFiles) !== JSON.stringify(actualFiles)) {
    throw new Error(
      `index files mismatch for ${component.name}: index=${JSON.stringify(sortedIndexFiles)}, actual=${JSON.stringify(actualFiles)}`
    )
  }

  return {
    name: component.name,
    fileCount: actualFiles.length
  }
})

const componentDirEntries = readdirSync(componentsDir, { withFileTypes: true })
const componentDirs = componentDirEntries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

componentDirs.forEach((componentDir) => {
  const hasIndexEntry = indexBody.components.some((component) => {
    return component.name === componentDir
  })

  if (!hasIndexEntry) {
    throw new Error(
      `public/components/${componentDir} exists but is missing from public/index.json`
    )
  }
})

console.log(
  `Registry JSON validation passed (${indexBody.components.length + 2} files, ${manifestSummaries.reduce((sum, item) => sum + item.fileCount, 0)} component files)`
)
