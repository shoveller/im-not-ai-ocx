import { AttributionSection } from './AttributionSection'
import { CapabilitiesSection } from './CapabilitiesSection'
import { CommandUsageSection } from './CommandUsageSection'
import { DefinitionSection } from './DefinitionSection'
import { FooterSection } from './FooterSection'
import { HeroSection } from './HeroSection'
import { InstallSection } from './InstallSection'
import { QuickLinksSection } from './QuickLinksSection'

export const About = () => {
  return (
    <main class="about-page min-h-screen overflow-hidden bg-[#07111f] text-[#f4ead2] selection:bg-amber-300 selection:text-slate-950">
      <div class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(245,158,11,0.24),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(45,212,191,0.2),transparent_26%),radial-gradient(circle_at_72%_86%,rgba(124,58,237,0.22),transparent_34%),linear-gradient(135deg,#07111f_0%,#10172a_45%,#170f24_100%)]" />
      <div class="pointer-events-none fixed inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(244,234,210,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(244,234,210,0.12)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div class="relative mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header class="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-amber-200/90">
              OCX Registry · Korean copy desk
            </p>
            <div class="flex flex-wrap gap-2 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-teal-100/80">
              <span class="rounded-full border border-teal-200/20 bg-teal-200/10 px-3 py-2">
                Hono SSR
              </span>
              <span class="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-2">
                OpenCode profile
              </span>
            </div>
          </div>
        </header>

        <div class="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] lg:items-start">
          <aside class="space-y-6 lg:sticky lg:top-8">
            <HeroSection />
            <AttributionSection />
          </aside>

          <section class="space-y-6" aria-label="registry details">
            <DefinitionSection />
            <CapabilitiesSection />
            <InstallSection />
            <CommandUsageSection />
            <QuickLinksSection />
            <FooterSection />
          </section>
        </div>
      </div>
    </main>
  )
}
