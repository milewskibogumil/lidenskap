import styles from './Button.module.scss'

export type ButtonDataProps = React.HTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  text?: React.ReactNode
  theme?: 'primary' | 'secondary'
  linkType?: 'external' | 'internal'
  href?: string
  className?: string
}

export default function Button({ children, text, theme = 'primary', linkType, href, className, ...props }: ButtonDataProps) {
  const Element = href ? 'a' : 'button'
  const isExternal = linkType === 'external'
  const renderedProps = {
    ...(href && { href }),
    ...(isExternal && { target: '_blank', rel: 'noreferrer' }),
    'data-theme': theme,
    className: `${styles.Button}${className ? ` ${className}` : ''}`,
    ...props,
  }

  return (
    <Element {...renderedProps}>
      {children || text}
      {theme === 'primary' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path stroke="#FFFEFD" stroke-linecap="round" stroke-linejoin="round" d="M3 8h10m0 0L9.25 4M13 8l-3.75 4" />
        </svg>
      )}
    </Element>
  )
}

export const ButtonDataQuery = (name: string) => `
  ${name} {
    text,
    theme,
    linkType,
    "href": select(linkType == "internal" => internal -> slug.current, linkType == "external" => external, "#"),
  },
`
