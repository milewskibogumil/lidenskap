import { defineField, defineType } from "sanity"
import { defineSlugForDocument } from "../../utils/define-slug-for-document";
import { documentPreview } from "../../utils/document-preview";

const name = 'Investments_Page';
const title = 'Inwestycje';
const icon = () => '💰';

export default defineType({
  name: name,
  type: 'document',
  title: title,
  icon,
  options: { documentPreview: true },
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    ...defineSlugForDocument({
      slugs: {
        pl: '/inwestycje',
        en: '/en/investments',
      }
    }),
    defineField({
      name: 'hero',
      type: 'object',
      title: 'Sekcja Hero',
      description: 'Sekcja Hero, to sekcja, która znajduje się na górze strony.',
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Paragraf',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'ctaBox',
          type: 'object',
          title: 'Sekcja z CTA wewnątrz listingu',
          fields: [
            defineField({
              name: 'text',
              type: 'Heading',
              title: 'Tekst',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'cta',
              type: 'cta',
              title: 'Wezwanie do działania',
              options: {
                collapsible: false,
              },
              validation: Rule => Rule.required(),
            }),
          ],
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'components',
      type: 'components',
      title: 'Page Components',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  ...documentPreview()
});
