import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import app from './index'

const registryName = 'im-not-ai OCX Registry'
const discoveryName = 'im-not-ai-ocx'
const componentName = 'im-not-ai'
const componentDescription =
  'OpenCode profile port of im-not-ai Korean AI-style humanizer'
const expectedFiles = [
  'AGENTS.md',
  'opencode.jsonc',
  'ocx.jsonc',
  'commands/humanize.md',
  'commands/humanize-redo.md',
  'agents/humanize-orchestrator.md',
  'skills/humanize-korean/SKILL.md'
]
const representativeMarkdownFile = 'commands/humanize.md'

type RegistryIndex = {
  $schema: string
  name: string
  version: string
  author: string
  components: Array<{
    name: string
    type: string
    description: string
    files: string[]
  }>
}

const readIndex = (): RegistryIndex => {
  const projectRoot = join(import.meta.dirname, '..')

  return JSON.parse(
    readFileSync(join(projectRoot, 'public/index.json'), 'utf8')
  ) as RegistryIndex
}

describe('ocx registry endpoints', () => {
  it('renders project introduction and install guide from /', async () => {
    const response = await app.request('http://localhost/')

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/html')

    const body = await response.text()

    expect(body).toContain('im-not-ai-ocx')
    expect(body).toContain('epoko77-ai/im-not-ai')
    expect(body).toContain('OpenCode')
    expect(body).toContain('OCX')
    expect(body).toContain('WSL2')
    expect(body).toContain('macOS')
    expect(body).toContain('npm i -g opencode-ai')
    expect(body).toContain('ocx profile add im-not-ai')
    expect(body).toContain('--source im-not-ai-ocx/im-not-ai')
    expect(body).toContain('커맨드 사용법')
    expect(body).toContain('/humanize 커맨드로 문장을 다듬습니다.')
    expect(body).not.toContain(
      'OpenCode 안에서 설치한 profile을 연 뒤 /humanize로 초벌 윤문을 시작하고'
    )
    expect(body).not.toContain('/humanize-redo로 최근 결과를 다시 다듬습니다.')
    expect(body).toContain('/humanize')
    expect(body).toContain('/humanize-redo')
    expect(body).toContain('장르: 칼럼')
    expect(body).toContain('--strict')
    expect(body).toContain('윤문이란?')
    expect(body).not.toContain(
      '윤문이란, 의미는 그대로 두고 문체를 다듬는 일을 말합니다'
    )
    expect(body).not.toContain(
      '윤문이란 의미는 그대로 두고 문체를 다듬는 일입니다'
    )
    expect(body).toContain('의미는 그대로')
    expect(body).toContain('저렴한 모델')
    expect(body).toContain('OpenCode의 현재 모델')
    expect(body).toContain('번역투')
    expect(body).toContain('AI 티')
    expect(body).toContain('서재원 : cinos@illuwa.click')
    expect(body).toContain('class="site-footer"')
    expect(body).toContain('Original project')
    expect(body).toContain('Registry repo')
    expect(body).not.toContain('Help JSON')
    expect(body).not.toContain('Registry manifest')
    expect(body).not.toContain('im-not-ai packument')
  })

  it('renders mobile and Open Graph metadata', async () => {
    const response = await app.request('http://localhost/')

    expect(response.status).toBe(200)

    const body = await response.text()

    expect(body).toContain(
      '<meta name="viewport" content="width=device-width, initial-scale=1"'
    )
    expect(body).toContain('<meta property="og:title" content="im-not-ai-ocx"')
    expect(body).toContain('property="og:description"')
    expect(body).toContain('property="og:url"')
    expect(body).toContain('name="twitter:card" content="summary"')
  })

  it('keeps narrow screens readable without horizontal page overflow', () => {
    const projectRoot = join(import.meta.dirname, '..')
    const css = readFileSync(join(projectRoot, 'src/style.css'), 'utf8')

    expect(css).toContain('box-sizing: border-box')
    expect(css).toContain('overflow-wrap: anywhere')
    expect(css).toContain('@media (max-width: 480px)')
    expect(css).toContain('max-width: 100%')
    expect(css).toContain('white-space: pre-wrap')
  })

  it('keeps discovery document as static public file', () => {
    const projectRoot = join(import.meta.dirname, '..')
    const discovery = JSON.parse(
      readFileSync(join(projectRoot, 'public/.well-known/ocx.json'), 'utf8')
    ) as { name: string; index: string; components: string }

    expect(discovery).toMatchObject({
      name: discoveryName,
      index: '/index.json',
      components: '/components/{name}.json'
    })
  })

  it('keeps registry index as a single-profile static public file', () => {
    const indexBody = readIndex()

    expect(indexBody.$schema).toBe(
      'https://ocx.kdco.dev/schemas/v2/registry.json'
    )
    expect(indexBody.name).toBe(registryName)
    expect(indexBody.version).toBe('0.1.0')
    expect(indexBody.author).toBe('서재원')
    expect(indexBody.components).toHaveLength(1)
    expect(indexBody.components[0]).toMatchObject({
      name: componentName,
      type: 'profile',
      description: componentDescription
    })
    expect(indexBody.components[0]?.files).toEqual(
      expect.arrayContaining(expectedFiles)
    )
    expect(indexBody.components[0]?.files).not.toContain('manifest.json')
  })

  it('shows im-not-ai-ocx namespace in install examples', async () => {
    const response = await app.request('http://localhost/help')

    expect(response.status).toBe(200)

    const body = (await response.json()) as {
      components: Array<{ installCommand: string; quickStart: string }>
    }
    const component = body.components[0]

    expect(component?.installCommand).toContain('--name im-not-ai-ocx')
    expect(component?.installCommand).toContain(
      '--source im-not-ai-ocx/im-not-ai'
    )
    expect(component?.quickStart).toContain('--source im-not-ai-ocx/im-not-ai')
  })

  it('returns packument from /components/:name.json', async () => {
    const indexBody = readIndex()
    const indexComponent = indexBody.components[0]
    const response = await app.request(
      `http://localhost/components/${componentName}.json`
    )

    expect(response.status).toBe(200)

    const body = (await response.json()) as {
      name: string
      'dist-tags': { latest: string }
      versions: Record<
        string,
        {
          name: string
          type: string
          description: string
          files: string[]
          dependencies: string[]
        }
      >
    }

    expect(body.name).toBe(componentName)
    expect(body['dist-tags'].latest).toBe(indexBody.version)

    const latestManifest = body.versions[body['dist-tags'].latest]

    expect(latestManifest.name).toBe(componentName)
    expect(latestManifest.type).toBe('profile')
    expect(latestManifest.description).toBe(indexComponent?.description)
    expect(
      [...latestManifest.files].sort((a, b) => a.localeCompare(b))
    ).toEqual(
      [...(indexComponent?.files ?? [])].sort((a, b) => a.localeCompare(b))
    )
    expect(latestManifest.files).toEqual(expect.arrayContaining(expectedFiles))
    expect(latestManifest.files).not.toContain('manifest.json')
    expect(latestManifest.dependencies).toEqual([])
  })

  it('returns file content from /components/:name/:path', async () => {
    const response = await app.request(
      `http://localhost/components/${componentName}/${representativeMarkdownFile}`
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/markdown')

    const body = await response.text()

    expect(body.length).toBeGreaterThan(0)
  })

  it('keeps required registry layout files for indexed components', () => {
    const projectRoot = join(import.meta.dirname, '..')

    ;['public/.well-known/ocx.json', 'public/index.json'].forEach(
      (relativePath) => {
        expect(existsSync(join(projectRoot, relativePath))).toBe(true)
      }
    )

    const indexBody = readIndex()

    indexBody.components.forEach((component) => {
      const manifestPath = `public/components/${component.name}/manifest.json`

      expect(existsSync(join(projectRoot, manifestPath))).toBe(true)
      expect(component.files.length).toBeGreaterThan(0)
    })
  })

  it('returns 400 when component file path is missing', async () => {
    const response = await app.request(
      `http://localhost/components/${componentName}`
    )

    expect(response.status).toBe(400)
  })

  it('returns 404 when component packument is missing', async () => {
    const response = await app.request(
      'http://localhost/components/unknown.json'
    )

    expect(response.status).toBe(404)
  })

  it('returns 404 when component file is missing', async () => {
    const response = await app.request(
      `http://localhost/components/${componentName}/commands/not-exists.md`
    )

    expect(response.status).toBe(404)
  })

  it('returns json content-type for jsonc files', async () => {
    const response = await app.request(
      `http://localhost/components/${componentName}/opencode.jsonc`
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/json')

    const body = await response.text()

    expect(body).toContain('"$schema"')
  })

  it('serves every file listed in the packument', async () => {
    const packumentResponse = await app.request(
      `http://localhost/components/${componentName}.json`
    )
    const packument = (await packumentResponse.json()) as {
      'dist-tags': { latest: string }
      versions: Record<string, { files: string[] }>
    }

    expect(packumentResponse.status).toBe(200)

    const latestManifest = packument.versions[packument['dist-tags'].latest]

    expect(latestManifest.files.length).toBeGreaterThan(0)

    const responses = await Promise.all(
      latestManifest.files.map((filePath) => {
        return app.request(
          `http://localhost/components/${componentName}/${filePath}`
        )
      })
    )

    responses.forEach((fileResponse) => {
      expect(fileResponse.status).toBe(200)
    })
  })

  it('returns 400 when component name is missing in file route', async () => {
    const response = await app.request('http://localhost/components/')

    expect(response.status).toBe(400)
  })
})
