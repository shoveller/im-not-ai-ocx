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
    <main class="about-page">
      <HeroSection />
      <DefinitionSection />
      <CapabilitiesSection />
      <InstallSection />
      <CommandUsageSection />
      <AttributionSection />
      <QuickLinksSection />
      <FooterSection />
    </main>
  )
}
