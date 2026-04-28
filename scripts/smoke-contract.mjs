const BASE_URL = process.env.BASE_URL ?? 'http://127.0.0.1:5173'
const registrySchemaUrl = 'https://ocx.kdco.dev/schemas/v2/registry.json'
const semverRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/

const joinUrl = (path) => {
  return new URL(path, BASE_URL).toString()
}

const fail = (message) => {
  throw new Error(message)
}

const check = (condition, message) => {
  if (!condition) {
    fail(message)
  }
}

const fetchJson = async (path) => {
  const response = await fetch(joinUrl(path))
  const bodyText = await response.text()

  if (!response.ok) {
    fail(`${path} returned ${response.status}: ${bodyText}`)
  }

  const contentType = response.headers.get('content-type') ?? ''
  check(
    contentType.includes('application/json'),
    `${path} content-type must be application/json, got ${contentType}`
  )

  try {
    return JSON.parse(bodyText)
  } catch (error) {
    fail(`${path} is not valid JSON (${error.message})`)
  }
}

const fetchStatus = async (path) => {
  const response = await fetch(joinUrl(path))

  return response.status
}

const run = async () => {
  console.log(`[contract] target: ${BASE_URL}`)

  const discovery = await fetchJson('/.well-known/ocx.json')
  const discoveryKeys = Object.keys(discovery).sort((a, b) =>
    a.localeCompare(b)
  )
  check(
    JSON.stringify(discoveryKeys) ===
      JSON.stringify(['components', 'index', 'name']),
    `Discovery keys mismatch: ${discoveryKeys.join(',')}`
  )
  check(
    discovery.index === '/index.json',
    'Discovery index must be /index.json'
  )
  check(
    discovery.components === '/components/{name}.json',
    'Discovery components must be /components/{name}.json'
  )

  const indexBody = await fetchJson('/index.json')
  check(
    indexBody.$schema === registrySchemaUrl,
    'index.$schema must be the OCX v2 schema URL'
  )
  check(
    typeof indexBody.name === 'string' && indexBody.name.length > 0,
    'index.name is required'
  )
  check(
    typeof indexBody.version === 'string' && indexBody.version.length > 0,
    'index.version must be a non-empty semver string'
  )
  check(
    semverRegex.test(indexBody.version),
    'index.version must be valid semver'
  )
  check(
    typeof indexBody.author === 'string' && indexBody.author.length > 0,
    'index.author is required'
  )
  check(
    Array.isArray(indexBody.components) && indexBody.components.length > 0,
    'index.components must be a non-empty array'
  )

  for (const component of indexBody.components) {
    check(
      typeof component.name === 'string' && component.name.length > 0,
      'component.name is required'
    )
    check(
      ['profile', 'bundle', 'skill'].includes(component.type),
      `component.type invalid for ${component.name}: ${component.type}`
    )
    check(
      typeof component.description === 'string' &&
        component.description.length > 0,
      `component.description is required for ${component.name}`
    )
    check(
      Array.isArray(component.files) && component.files.length > 0,
      `component.files must be non-empty for ${component.name}`
    )

    const packument = await fetchJson(`/components/${component.name}.json`)
    check(
      packument.name === component.name,
      `${component.name} packument.name mismatch`
    )
    check(
      typeof packument['dist-tags']?.latest === 'string',
      `${component.name} dist-tags.latest is required`
    )
    check(
      packument['dist-tags'].latest === indexBody.version,
      `${component.name} dist-tags.latest must match index.version`
    )

    const latestManifest = packument.versions?.[packument['dist-tags'].latest]

    check(
      latestManifest?.type === component.type,
      `${component.name} latest manifest type mismatch`
    )
    check(
      latestManifest?.description === component.description,
      `${component.name} description mismatch between index and latest manifest`
    )
    check(
      Array.isArray(latestManifest?.files) && latestManifest.files.length > 0,
      `${component.name} latest manifest files must be non-empty`
    )

    const uniqueFiles = new Set(latestManifest.files)
    check(
      uniqueFiles.size === latestManifest.files.length,
      `${component.name} files contain duplicates`
    )
    check(
      !latestManifest.files.includes('manifest.json'),
      `${component.name} files must not include manifest.json`
    )
    check(
      JSON.stringify(
        [...latestManifest.files].sort((a, b) => a.localeCompare(b))
      ) ===
        JSON.stringify([...component.files].sort((a, b) => a.localeCompare(b))),
      `${component.name} index/files mismatch`
    )

    for (const filePath of latestManifest.files) {
      const status = await fetchStatus(
        `/components/${component.name}/${filePath}`
      )
      check(status === 200, `${component.name}/${filePath} returned ${status}`)
    }
  }

  console.log('[contract] all checks passed')
}

run().catch((error) => {
  console.error(`[contract] FAIL: ${error.message}`)
  process.exit(1)
})
