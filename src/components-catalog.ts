type ComponentType = 'profile' | 'bundle' | 'skill'

type ComponentManifest = {
  schemaVersion: number
  name: string
  componentType: ComponentType
  description: string
}

type RegistryIndex = {
  version: string
}

type VersionManifest = {
  name: string
  type: ComponentType
  description: string
  files: string[]
  dependencies: string[]
}

type Packument = {
  name: string
  'dist-tags': {
    latest: string
  }
  versions: Record<string, VersionManifest>
}

const registryIndexModule = import.meta.glob('../public/index.json', {
  eager: true,
  import: 'default'
}) as Record<string, RegistryIndex>

const registryIndex = Object.values(registryIndexModule)[0]

if (!registryIndex) {
  throw new Error('Missing registry index payload')
}

const COMPONENT_VERSION = registryIndex.version
const COMPONENTS_PREFIX = '../public/components/'
const MANIFEST_SUFFIX = '/manifest.json'

const componentManifestModules = import.meta.glob(
  '../public/components/*/manifest.json',
  {
    eager: true,
    import: 'default'
  }
) as Record<string, ComponentManifest>

const componentFileModules = import.meta.glob('../public/components/*/**', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const componentFiles = Object.fromEntries(
  Object.entries(componentFileModules).map(([modulePath, content]) => {
    const componentFilePath = modulePath.replace(COMPONENTS_PREFIX, '')

    return [componentFilePath, content]
  })
) as Record<string, string>

const getComponentNameFromManifestPath = (modulePath: string): string => {
  return modulePath.replace(COMPONENTS_PREFIX, '').replace(MANIFEST_SUFFIX, '')
}

const listComponentFiles = (componentName: string): string[] => {
  return Object.keys(componentFiles)
    .filter((componentFilePath) => {
      return (
        componentFilePath.startsWith(`${componentName}/`) &&
        componentFilePath !== `${componentName}/manifest.json`
      )
    })
    .map((componentFilePath) => {
      return componentFilePath.replace(`${componentName}/`, '')
    })
    .sort((a, b) => a.localeCompare(b))
}

const packuments = Object.fromEntries(
  Object.entries(componentManifestModules).map(([modulePath, manifest]) => {
    const componentName = getComponentNameFromManifestPath(modulePath)

    if (manifest.name !== componentName) {
      throw new Error(
        `Invalid manifest name: ${modulePath} (expected ${componentName}, got ${manifest.name})`
      )
    }

    const files = listComponentFiles(componentName)

    return [
      componentName,
      {
        name: componentName,
        'dist-tags': {
          latest: COMPONENT_VERSION
        },
        versions: {
          [COMPONENT_VERSION]: {
            name: componentName,
            type: manifest.componentType,
            description: manifest.description,
            files,
            dependencies: []
          }
        }
      } satisfies Packument
    ]
  })
) as Record<string, Packument>

export const getPackument = (componentName: string): Packument | null => {
  return packuments[componentName] ?? null
}

export const getComponentFile = (
  componentName: string,
  filePath: string
): string | null => {
  return componentFiles[`${componentName}/${filePath}`] ?? null
}

export const guessContentType = (filePath: string): string => {
  if (filePath.endsWith('.json') || filePath.endsWith('.jsonc')) {
    return 'application/json; charset=utf-8'
  }

  if (filePath.endsWith('.md')) {
    return 'text/markdown; charset=utf-8'
  }

  return 'text/plain; charset=utf-8'
}
