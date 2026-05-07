const socialPreviewUrl =
  'https://raw.githubusercontent.com/epoko77-ai/im-not-ai/main/assets/social-preview.png'

export const HeroSection = () => {
  return (
    <section class="about-hero overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-7 lg:p-8">
      <div class="hero-copy-block space-y-6">
        <p class="eyebrow font-mono text-[0.7rem] font-bold uppercase tracking-[0.34em] text-amber-200">
          OpenCode profile · OCX registry
        </p>
        <div class="space-y-4">
          <h1 class="font-serif text-5xl font-black leading-[0.9] tracking-[-0.08em] text-[#fff7df] sm:text-6xl xl:text-7xl">
            im-not-ai-ocx
          </h1>
          <p class="hero-copy max-w-2xl text-lg leading-8 text-[#d8ceb8]">
          <strong>OCX</strong>는 OpenCode profile과 agent 구성을 registry에서
          설치·관리하기 위한 패키징 도구입니다.
          </p>
        </div>
        <p class="max-w-2xl text-base leading-8 text-[#c7bda7]">
          <a
            class="font-bold text-teal-200 underline decoration-teal-200/30 underline-offset-4 transition hover:text-teal-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/40"
            href="https://github.com/epoko77-ai/im-not-ai"
          >
            epoko77-ai/im-not-ai
          </a>
          를 OpenCode/OCX에서 쉽게 설치하도록 패키징한 비공식 포트입니다.
        </p>
        <div class="grid gap-3 sm:grid-cols-3">
          {['meaning locked', 'tone polished', 'OCX ready'].map((label) => (
            <span class="rounded-2xl border border-amber-200/15 bg-amber-200/[0.07] px-4 py-3 font-mono text-[0.66rem] font-bold uppercase tracking-[0.24em] text-amber-100/85" key={label}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <img
        class="hero-preview mt-7 aspect-[1200/630] w-full rounded-[1.75rem] border border-teal-200/20 object-cover shadow-2xl shadow-teal-950/40 ring-1 ring-white/10"
        src={socialPreviewUrl}
        alt="im-not-ai 원본 social preview 이미지"
        loading="eager"
      />
    </section>
  )
}
