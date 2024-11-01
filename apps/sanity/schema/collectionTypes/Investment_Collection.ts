import { defineField, defineType } from "sanity";

const name = 'Investment_Collection';
const title = 'Zbiór inwestycji';
const icon = () => '💰';

export default defineType({
  name: name,
  type: 'document',
  title: title,
  icon,
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
      name: 'url',
      type: 'url',
      title: 'Adres URL strony inwestycji',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      img: 'img',
      name: 'name',
      url: 'url',
    },
    prepare: ({ img, name, url }) => ({
      title: name,
      subtitle: url,
      media: img,
    }),
  },
});
