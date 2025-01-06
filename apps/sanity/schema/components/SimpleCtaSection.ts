import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'SimpleCtaSection';
const title = 'Prosta sekcja z CTA';
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
    }),
  ],
  preview: {
    select: {
      subtitle: 'name',
    },
    prepare: ({ subtitle }) => ({
      title: title,
      subtitle: toPlainText(subtitle),
      ...sectionPreview({ name, icon: icon() }),
    }),
  },
});
