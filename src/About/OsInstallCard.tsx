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
    <article class="install-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <pre>
        <code>{commands.join('\n')}</code>
      </pre>
    </article>
  )
}
