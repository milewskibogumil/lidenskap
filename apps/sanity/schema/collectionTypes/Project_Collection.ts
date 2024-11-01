import { defineField, defineType } from "sanity";

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
