type OsInstallCardProps = {
  title: string
  description: string
  commands: string[]
}

export const OsInstallCard = ({
  commands,
  description,
  title
}: OsInstallCardProps) => {
  return (
    <article class="install-card overflow-hidden rounded-[1.75rem] border border-amber-200/20 bg-slate-950/70 p-5 shadow-2xl shadow-black/30 ring-1 ring-white/5">
      <h3 class="font-serif text-2xl font-black tracking-[-0.04em] text-amber-100">
        {title}
      </h3>
      <p class="mt-2 text-sm leading-7 text-[#d6c7a8]">{description}</p>
      <pre class="mt-5 max-w-full overflow-x-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/45 p-4 text-sm leading-7 text-teal-100 shadow-inner shadow-black/40">
        <code class="font-mono whitespace-pre-wrap break-words text-[0.82rem] leading-7 text-teal-100 sm:text-sm">
          {commands.join('\n')}
        </code>
      </pre>
    </article>
  )
}
