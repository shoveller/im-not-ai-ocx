import { Hono } from 'hono'
import { About } from './About'
import {
  aiDiscoveryContentType,
  getAiDiscoveryDocument,
  type AiDiscoveryPath
} from './ai-discovery'
import {
  getComponentFile,
  getPackument,
  guessContentType
} from './components-catalog'
import { renderer } from './renderer'

const app = new Hono()
const aiDiscoveryPaths = ['/llms.txt', '/llms-full.txt', '/robots.txt'] as const

app.use(renderer)

aiDiscoveryPaths.forEach((path) => {
  app.get(path, (c) => {
    return c.body(getAiDiscoveryDocument(path as AiDiscoveryPath), 200, {
      'content-type': aiDiscoveryContentType
    })
  })
})

app.get('/', (c) => {
  return c.render(<About />)
})

app.get('/help', (c) => {
  return c.json({
    name: 'im-not-ai OCX Registry',
    version: '0.1.0',
    description: 'OCX registry for the im-not-ai OpenCode profile',
    endpoints: {
      'GET /': 'Project introduction and install guide',
      'GET /.well-known/ocx.json': 'Registry discovery',
      'GET /index.json': 'Registry manifest with component list',
      'GET /components/{name}.json': 'Component packument (npm-style)',
      'GET /components/{name}/{path}': 'Component file content',
      'GET /llms.txt': 'Concise AI/LLM discovery file',
      'GET /llms-full.txt': 'Full AI/LLM registry reference and install guide',
      'GET /robots.txt': 'Crawler policy and AI discovery pointers',
      'GET /help': 'This help information'
    },
    components: [
      {
        name: 'im-not-ai',
        type: 'profile',
        description:
          'OpenCode profile port of im-not-ai Korean AI-style humanizer',
        installCommand:
          'ocx registry add https://im-not-ai-ocx.illuwa.click --name im-not-ai-ocx --global && ocx profile add im-not-ai --source im-not-ai-ocx/im-not-ai --global',
        quickStart:
          'ocx profile add im-not-ai --source im-not-ai-ocx/im-not-ai --from https://im-not-ai-ocx.illuwa.click --global'
      }
    ],
    links: {
      ocxCliDocs: 'https://ocx.kdco.dev/docs/cli/profile',
      ocxRegistryProtocol: 'https://ocx.kdco.dev/docs/registries/protocol',
      imNotAiGithub: 'https://github.com/epoko77-ai/im-not-ai',
      registryGithub: 'https://github.com/shoveller/im-not-ai-ocx',
      llms: 'https://im-not-ai-ocx.illuwa.click/llms.txt',
      llmsFull: 'https://im-not-ai-ocx.illuwa.click/llms-full.txt',
      robots: 'https://im-not-ai-ocx.illuwa.click/robots.txt'
    }
  })
})

app.get('/components/*', (c) => {
  const tail = c.req.path.replace('/components/', '')

  const hasInvalidPathSegment = tail.split('/').some((segment) => {
    const decodedSegment = (() => {
      try {
        return decodeURIComponent(segment)
      } catch {
        return segment
      }
    })()

    return (
      segment === '.' ||
      segment === '..' ||
      decodedSegment === '.' ||
      decodedSegment === '..'
    )
  })

  if (hasInvalidPathSegment) {
    return c.json({ error: 'Invalid file path' }, 400)
  }

  if (tail.endsWith('.json') && !tail.includes('/')) {
    const packumentName = tail.slice(0, -'.json'.length)
    const packument = getPackument(packumentName)

    if (!packument) {
      return c.json({ error: 'Component not found' }, 404)
    }

    return c.json(packument)
  }

  const [componentName, ...fileSegments] = tail.split('/')

  if (!componentName || fileSegments.length === 0) {
    return c.json({ error: 'File path is required' }, 400)
  }

  const filePath = fileSegments.join('/')
  const fileContent = getComponentFile(componentName, filePath)

  if (!fileContent) {
    return c.json({ error: 'Component file not found' }, 404)
  }

  return c.body(fileContent, 200, {
    'content-type': guessContentType(filePath)
  })
})

export default app
