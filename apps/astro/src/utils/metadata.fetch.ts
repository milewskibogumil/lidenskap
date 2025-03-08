import sanityFetch from "@utils/sanity.fetch";
import { type HeadProps } from '@layouts/Head.astro'

export default async function metadataFetch(slug: string): Promise<HeadProps> {
  const seo = await sanityFetch<HeadProps>({
    query: /* groq */ `
      *[slug.current == $slug][0] {
        "path": slug.current,
        "title": seo.title,
        "description": seo.description,
        "openGraphImage": seo.img.asset -> url + "?w=1200",
        "alternates": coalesce(
          *[_type == 'translation.metadata' && references(^._id)][0] {
            "urls": translations[] {
              "lang": _key,
              "url": *[_id == ^.value._ref][0].slug.current
            }
          }.urls,
          []
        ),
      }
    `,
    params: { slug: slug }
  })
  if (!seo?.path) throw new Error(`Missing required field \`path\` for slug \`${slug}\``);
  if (!seo?.title) throw new Error(`Missing required field \`title\` for slug \`${slug}\``);
  if (!seo?.description) throw new Error(`Missing required field \`description\` for slug \`${slug}\``);
  return seo;
}
