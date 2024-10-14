import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'Faq';
const title = 'Sekcja FAQ';
const icon = () => '❓';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Nagłówek',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Elementy FAQ',
      of: [
        defineField({
          name: 'item',
          type: 'reference',
          to: [{ type: 'Faq_Collection' }],
          options: {
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
          }
        }),
      ],
      validation: Rule => Rule.required().unique(),
    }),
    defineField({
      name: 'ctaDescription',
      type: 'PortableText',
      title: 'Opis wezwania do działania',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Wezwanie do działania',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'img',
      type: 'image',
      title: 'Zdjęcie',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'img',
    },
    prepare: ({ heading, media }) => ({
      title: title,
      subtitle: toPlainText(heading),
      media: media || icon,
    }),
  },
});
