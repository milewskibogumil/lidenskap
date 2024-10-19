import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'PeopleShowcase';
const title = 'Sekcja z osobami';
const icon = () => '👥';

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
      name: 'list',
      type: 'array',
      title: 'Lista osób',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          fields: [
            defineField({
              name: 'img',
              type: 'image',
              title: 'Zdjęcie',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'name',
              type: 'string',
              title: 'Imię i nazwisko',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'position',
              type: 'Heading',
              title: 'Stanowisko (opcjonalne)',
            }),
            defineField({
              name: 'description',
              type: 'PortableText',
              title: 'Opis (opcjonalne)',
            }),
            defineField({
              name: 'email',
              type: 'string',
              title: 'Email (opcjonalne)',
              validation: Rule => Rule.email(),
            }),
            defineField({
              name: 'tel',
              type: 'string',
              title: 'Telefon (opcjonalne)',
            }),
          ],
          preview: {
            select: {
              media: 'img',
              name: 'name',
              position: 'position',
            },
            prepare: ({ media, name, position }) => ({
              media: media,
              title: name,
              subtitle: toPlainText(position),
            }),
          },
        }),
      ],
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
      icon,
    }),
  },
});
