const links = [
  ['Help JSON', '/help'],
  ['Registry manifest', '/index.json'],
  ['im-not-ai packument', '/components/im-not-ai.json'],
  ['Original project', 'https://github.com/epoko77-ai/im-not-ai'],
  ['Registry repo', 'https://github.com/shoveller/im-not-ai-ocx']
]

export const QuickLinksSection = () => {
  return (
    <section class="about-section">
      <div class="section-heading">
        <p class="eyebrow">Links</p>
        <h2>확인할 수 있는 리소스</h2>
      </div>
      <div class="quick-links">
        {links.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}
