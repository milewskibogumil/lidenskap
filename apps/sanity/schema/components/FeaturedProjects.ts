import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'FeaturedProjects';
const title = 'Wyróżnione projekty';
const icon = () => '✨';

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
      name: 'cta',
      type: 'cta',
      title: 'Wezwanie do działania',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'projects',
      type: 'array',
      title: 'Projekty (opcjonalne)',
      description: 'Jeśli to pole zostanie puste, zostaną wyświetlone 4 ostatnie projekty (według daty zakończenia).',
      of: [{
        type: 'reference',
        to: [{ type: 'Project_Collection' }],
        options: {
          disableNew: true,
          filter: ({ document, parent }) => {
            const language = (document as { language?: string })?.language;
            const selectedIds = (parent as { _ref?: string }[])?.filter(item => item._ref).map(item => item._ref) || [];
            return {
              filter: '!(_id in $selectedIds) && language == $lang',
              params: { selectedIds, lang: language }
            }
          }
        }
      }],
      validation: Rule => Rule.max(4).error('Rekomendujemy dodanie maksymalnie 4 projektów.'),
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

