import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'HighlightedPerson';
const title = 'Sekcja z osobą wyróżnioną';
const icon = () => '👤';

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
      name: 'email',
      type: 'string',
      title: 'Adres email (opcjonalny)',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'tel',
      type: 'string',
      title: 'Numer telefonu (opcjonalny)',
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Imię i nazwisko',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Stanowisko (opcjonalne)',
    }),
    defineField({
      name: 'description',
      type: 'PortableText',
      title: 'Opis',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'descriptionSecondary',
      type: 'PortableText',
      title: 'Drugi opis',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'img',
      type: 'image',
      title: 'Zdjęcie',
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
