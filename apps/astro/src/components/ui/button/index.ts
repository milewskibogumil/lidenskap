export { default, type Props as ButtonDataProps } from './index.astro';

export const ButtonDataQuery = (name: string) => `
  ${name} {
    text,
    theme,
    type,
    "href": select(type == "internal" => internal -> slug.current, type == "external" => external, "#"),
  },
`
