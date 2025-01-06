import { defineField, defineType } from "sanity"
import { defineSlugForDocument } from "../../utils/define-slug-for-document";

const name = 'Projects_Page';
const title = 'Realizacje';
const slug = '/realizacje';
const icon = () => '🏢';

export default defineType({
  name: name,
  type: 'document',
  title: title,
  icon,
  options: { documentPreview: true },
  fields: [
    ...defineSlugForDocument({ slug }),
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
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'highlightedProjects',
          type: 'array',
          title: 'Projekty wyróżnione',
          description: 'Projekty wyróżnione, to projekty, które będą wyświetlane na górze listy projektów.',
          of: [{
            type: 'reference',
            to: [{ type: 'Project_Collection' }],
            options: {
              disableNew: true,
              filter: ({ parent }) => {
                const selectedIds = (parent as { _ref?: string }[])?.filter(item => item._ref).map(item => item._ref) || [];
                if (selectedIds.length > 0) {
                  return {
                    filter: '!(_id in $selectedIds)',
                    params: { selectedIds }
                  }
                }
                return {}
              }
            },
            validation: Rule => Rule.required(),
          }],
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
  preview: {
    prepare: () => ({
      title: title,
      subtitle: slug
    })
  }
});
