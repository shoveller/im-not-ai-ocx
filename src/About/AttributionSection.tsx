export const AttributionSection = () => {
  return (
    <section
      class="attribution-card rounded-[2rem] border border-white/10
        bg-[#f6edd8]/[0.9] p-6 text-slate-950 shadow-2xl shadow-black/25 sm:p-7"
    >
      <p
        class="eyebrow font-mono text-[0.68rem] font-bold uppercase
          tracking-[0.32em] text-amber-700"
      >
        Attribution
      </p>
      <h2
        class="mt-3 font-serif text-2xl font-black tracking-[-0.05em]
          text-slate-950 sm:text-3xl"
      >
        원작자와 원 프로젝트를 존중합니다
      </h2>
      <p class="mt-4 text-sm leading-7 text-slate-800">
        이 registry는{' '}
        <a
          class="font-bold text-teal-800 underline decoration-teal-800/30
            underline-offset-4"
          href="https://github.com/epoko77-ai/im-not-ai"
        >
          epoko77-ai/im-not-ai
        </a>
        의 아이디어, 프롬프트, 레퍼런스, 한국어 AI 티 제거 노하우를 기반으로
        합니다.
      </p>
      <p class="mt-3 text-sm leading-7 text-slate-800">
        im-not-ai-ocx는 원 프로젝트를 대체하거나 소유권을 주장하지 않습니다. MIT
        License와 출처를 보존하며, OpenCode/OCX 배포 형식에 맞춘 어댑터입니다.
      </p>
    </section>
  )
}
