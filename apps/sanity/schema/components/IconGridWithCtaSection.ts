import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'IconGridWithCtaSection';
const title = 'Sekcja z siatką ikon i CTA';
const icon = () => '🔲';

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
      title: 'Elementy',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              type: 'image',
              title: 'Ikona',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Etykieta',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              media: 'icon',
              label: 'label',
            },
            prepare: ({ media, label }) => ({
              media: media,
              title: label,
            }),
          },
        }),
      ],
      validation: Rule => Rule.required().min(1).max(4),
    }),
    defineField({
      name: 'ctaDescription',
      type: 'PortableText',
      title: 'Opis przed CTA',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Wezwanie do działania',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title: title,
      subtitle: toPlainText(heading),
      ...sectionPreview({ name, icon: icon() }),
    }),
  },
});
