export { default, type ImageDataProps } from './image.astro';

export const ImageDataQuery = (name: string) => `
  ${name} {
    asset -> {
      "url": url + "?w=2560",
      altText,
      extension,
      metadata {
        dimensions {
          width,
          height,
        },
        lqip,
      },
    },
  },
`
