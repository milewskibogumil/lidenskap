import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'TwoColumnTextWithTags';
const title = 'Sekcja Kolumnowa z Tagami';
const icon = () => '🏛️';

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
      name: 'headingSecondary',
      type: 'PortableText',
      title: 'Drugi Nagłówek',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Tagi',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'paragraphSecondary',
      type: 'PortableText',
      title: 'Drugi Paragraf',
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
      media,
      icon,
    }),
  },
});