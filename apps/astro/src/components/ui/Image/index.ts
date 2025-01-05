export { default, type ImageDataProps } from './image.astro';

export const ImageDataQuery = (name: string) => `
  ${name} {
    asset -> {
      url,
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
