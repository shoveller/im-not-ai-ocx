const socialPreviewUrl =
  'https://raw.githubusercontent.com/epoko77-ai/im-not-ai/main/assets/social-preview.png'

export const HeroSection = () => {
  return (
    <section class="about-hero">
      <div class="hero-copy-block">
        <p class="eyebrow">OpenCode profile · OCX registry</p>
        <h1>im-not-ai-ocx</h1>
        <p class="hero-copy">
          <strong>OCX</strong>는 OpenCode profile과 agent 구성을 registry에서
          설치·관리하기 위한 패키징 도구입니다.
        </p>
        <p>
          <a href="https://github.com/epoko77-ai/im-not-ai">
            epoko77-ai/im-not-ai
          </a>
          를 OpenCode/OCX에서 쉽게 설치하도록 패키징한 비공식 포트입니다.
        </p>
      </div>
      <img
        class="hero-preview"
        src={socialPreviewUrl}
        alt="im-not-ai 원본 social preview 이미지"
        loading="eager"
      />
    </section>
  )
}
