const links = [
  ['Original project', 'https://github.com/epoko77-ai/im-not-ai'],
  ['Registry repo', 'https://github.com/shoveller/im-not-ai-ocx'],
  ['llms.txt', '/llms.txt'],
  ['llms-full.txt', '/llms-full.txt']
]

export const QuickLinksSection = () => {
  return (
    <section class="about-section rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
      <div class="section-heading space-y-3">
        <p class="eyebrow font-mono text-[0.68rem] font-bold uppercase tracking-[0.32em] text-teal-200">
          Links
        </p>
        <h2 class="font-serif text-3xl font-black tracking-[-0.05em] text-[#fff7df] sm:text-4xl">
          확인할 수 있는 리소스
        </h2>
      </div>
      <div class="quick-links mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {links.map(([label, href]) => (
          <a class="rounded-full border border-white/10 bg-white/[0.08] px-5 py-4 text-center font-mono text-xs font-black uppercase tracking-[0.18em] text-[#fff7df] transition hover:-translate-y-0.5 hover:border-amber-200/40 hover:bg-amber-200/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/45" href={href} key={href}>
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}
