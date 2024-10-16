export { default, type ButtonDataProps } from './index.astro';

export const ButtonDataQuery = (name: string) => `
  ${name} {
    text,
    theme,
    linkType,
    "href": select(type == "internal" => internal -> slug.current, type == "external" => external, "#"),
  },
`
