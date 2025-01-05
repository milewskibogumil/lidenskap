import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'ServicesOverview';
const title = 'Sekcja z przeglądem usług';
const icon = () => '🛠️';

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
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Kategorie usług',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              type: 'Heading',
              title: 'Nazwa kategorii',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'services',
              type: 'array',
              title: 'Usługi',
              of: [
                defineField({
                  name: 'service',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'isIcon',
                      type: 'boolean',
                      title: 'Czy jest ikoną?',
                      description: 'Domyślnie, dla danej usługi jest wyświetlane zdjęcie. Jeśli zaznaczysz to pole, to będziesz mógł zamienić zdjęcie na ikonę.',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'img',
                      type: 'image',
                      title: 'Zdjęcie',
                      hidden: ({ parent }: { parent: { isIcon: boolean } }) => parent?.isIcon,
                      validation: Rule => Rule.custom((value, context) => {
                        const isIcon = (context.parent as { isIcon: boolean }).isIcon;
                        return value || isIcon ? true : 'To pole jest wymagane';
                      }),
                    }),
                    defineField({
                      name: 'icon',
                      type: 'image',
                      title: 'Ikona',
                      hidden: ({ parent }) => !parent?.isIcon,
                      validation: Rule => Rule.custom((value, context) => {
                        const isIcon = (context.parent as { isIcon: boolean }).isIcon;
                        return value || !isIcon ? true : 'To pole jest wymagane';
                      }),
                      options: {
                        accept: '.svg',
                      },
                    }),
                    defineField({
                      name: 'name',
                      type: 'Heading',
                      title: 'Nazwa usługi',
                      validation: Rule => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      name: 'name',
                      img: 'img',
                      icon: 'icon',
                    },
                    prepare: ({ name, img, icon }) => ({
                      title: toPlainText(name),
                      media: img || icon,
                    }),
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              name: 'name',
            },
            prepare: ({ name }) => ({
              title: toPlainText(name),
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaDescription',
      type: 'PortableText',
      title: 'Opis wezwania do działania',
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
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title: title,
      subtitle: toPlainText(heading),
      ...sectionPreview({ name, icon: icon() }),
    }),
  },
});
