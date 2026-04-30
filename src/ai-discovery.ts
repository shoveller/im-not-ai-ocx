import llmsFullText from '../public/llms-full.txt?raw'
import llmsText from '../public/llms.txt?raw'
import robotsText from '../public/robots.txt?raw'

export const aiDiscoveryDocuments = {
  '/llms.txt': llmsText,
  '/llms-full.txt': llmsFullText,
  '/robots.txt': robotsText
} as const

export type AiDiscoveryPath = keyof typeof aiDiscoveryDocuments

export const getAiDiscoveryDocument = (path: AiDiscoveryPath): string => {
  return aiDiscoveryDocuments[path]
}

export const aiDiscoveryContentType = 'text/plain; charset=utf-8'
