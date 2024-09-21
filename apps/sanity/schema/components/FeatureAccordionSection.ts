import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'FeatureAccordionSection';
const title = 'Sekcja z akordeonem cech';
const icon = () => '🏛️';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'img',
      type: 'image',
      title: 'Zdjęcie',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Nagłówek',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'list',
      type: 'array',
      title: 'Lista',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'Heading',
              title: 'Tytuł',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'PortableText',
              title: 'Opis',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
            },
            prepare: ({ title, description }) => ({
              title: toPlainText(title),
              subtitle: toPlainText(description),
            }),
          }
        }),
      ],
      validation: Rule => Rule.required()
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
      media,
      icon,
    }),
  },
});
