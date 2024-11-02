import { defineField, defineType } from "sanity";
import { defineSlugForDocument } from "../../utils/define-slug-for-document";

const name = 'Project_Collection';
const title = 'Zbiór realizacji';
const icon = () => '🏢';

export default defineType({
  name: name,
  type: 'document',
  title: title,
  icon,
  options: {
    documentPreview: true,
  },
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
      title: 'Nazwa',
      validation: Rule => Rule.required(),
    }),
    ...defineSlugForDocument({ source: 'name', prefix: '/realizacje/' }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Rodzaj projektu',
      options: {
        list: [
          'Generalne wykonawstwo',
          'Pozostałe realizacje'
        ],
        direction: "horizontal",
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'city',
      type: 'string',
      title: 'Miasto',
      options: {
        list: [
          'Warszawa',
          'Poznań'
        ],
        direction: "horizontal",
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Data rozpoczęcia projektu',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'Data zakończenia projektu (opcjonalnie)',
      description: 'Jeśli to pole jest puste, projekt będzie traktowany jako w trakcie realizacji.'
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    select: {
      img: 'img',
      name: 'name',
    },
    prepare: ({ img, name }) => ({
      title: name,
      media: img,
    }),
  },
});
