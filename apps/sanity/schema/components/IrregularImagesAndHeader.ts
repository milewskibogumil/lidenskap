import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'IrregularImagesAndHeader';
const title = 'Sekcja z nieregularnymi zdjęciami i nagłówkiem';
const icon = () => '🖼️';

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
      name: 'images',
      type: 'array',
      title: '3 Zdjęcia',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          title: 'Zdjęcie',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required().min(3).max(3),
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
