import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'SimpleCtaSection';
const title = 'Prosta sekcja z wezwaniem do działania';
const icon = () => '📞';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'name',
      type: 'Heading',
      title: 'Nazwa',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'PortableText',
      title: 'Tekst',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Wezwanie do działania',
      validation: Rule => Rule.required(),
    })
  ],
  preview: {
    select: {
      heading: 'heading',
      media: 'list.0.img',
    },
    prepare: ({ heading, media }) => ({
      title: title,
      subtitle: toPlainText(heading),
      media,
      icon,
    }),
  },
});
