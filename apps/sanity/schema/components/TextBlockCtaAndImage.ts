import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'TextBlockCtaAndImage';
const title = 'Sekcja z blokiem tekstu, przyciskiem CTA i obrazem | warianty';
const icon = () => '📄';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'isReversed',
      type: 'boolean',
      title: 'Odwróć kolejność',
      description: 'Domyślnie tekst znajduję się po prawej stronie, jeśli zaznaczysz tą opcję, tekst będzie po lewej.',
      initialValue: false,
      validation: Rule => Rule.required(),
    }),
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
      name: 'cta',
      type: 'cta',
      title: 'Wezwanie do działania',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{ type: 'image' }],
      title: '2 zdjęcia',
      validation: Rule => Rule.required().min(2).max(2),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title: title,
      subtitle: toPlainText(heading),
      ...sectionPreview({ name, icon: icon(), label: 'Posiada warianty' }),
    }),
  },
});
