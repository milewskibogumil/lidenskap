import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'MetricsSection';
const title = 'Sekcja z metrykami';
const icon = () => '📊';

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
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraf',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metrics',
      type: 'array',
      title: 'Metryki',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              title: 'Wartość',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Etykieta',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'icon',
              type: 'image',
              title: 'Ikona',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
              icon: 'icon',
            },
            prepare: ({ value, label, icon }) => ({
              title: value,
              subtitle: label,
              media: icon,
            }),
          },
        },
      ],
      validation: Rule => Rule.required().min(1).max(4),
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: '4 Zdjęcia',
      of: [
        { type: 'image' }
      ],
      validation: Rule => Rule.required().min(4).max(4),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title: title,
      subtitle: toPlainText(heading),
      icon,
    }),
  },
});
