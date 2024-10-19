import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'ImagesMarquee';
const title = 'Sekcja z przewijającymi się zdjęciami';
const icon = () => '🔄';

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
      name: 'ctas',
      type: 'array',
      of: [{ type: 'cta' }],
      title: 'CTAs',
      validation: Rule => Rule.required().min(1).max(2)
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Zdjęcia',
      of: [{ type: 'image' }],
      validation: Rule => Rule.required().min(5),
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
