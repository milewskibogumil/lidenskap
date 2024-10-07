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
      title: 'Heading',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraph',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metrics',
      type: 'array',
      title: 'Metrics',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              title: 'Value',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'icon',
              type: 'image',
              title: 'Icon',
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
      title: '4 Images',
      of: [
        { type: 'image' }
      ],
      validation: Rule => Rule.required().min(4).max(4),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      metrics: 'metrics',
    },
    prepare: ({ heading, metrics }) => ({
      title: title,
      subtitle: toPlainText(heading),
      icon,
    }),
  },
});
