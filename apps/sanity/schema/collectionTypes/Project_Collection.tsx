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
      name: 'beforeImg',
      type: 'image',
      title: 'Zdjęcie przed realizacją (opcjonalnie)',
      options: {
        collapsed: true,
      }
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa',
      validation: Rule => Rule.required(),
    }),
    ...defineSlugForDocument({ source: 'name', prefix: '/realizacje/' }),
    defineField({
      name: 'description',
      type: 'PortableText',
      title: 'Krótki opis (opcjonalnie)',
      description: 'Krótki opis projektu, pojawi się na początku strony konkretnej realizacji.',
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
      name: 'gallery',
      type: 'object',
      title: 'Galeria (opcjonalna)',
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'images',
          type: 'array',
          title: 'Zdjęcia',
          of: [{ type: 'image' }],
          description: (
            <>
              Zawsze pamiętaj o optymalizacji zdjęć do formatu <em>WEBP</em>, dla najlepszej wydajności strony. Użyj narzędzi takich jak <a href="https://anywebp.com/convert-to-webp" target="_blank" rel="noopener">anywebp</a> lub <a href="https://squoosh.app" target="_blank" rel="noopener">Squoosh</a>
            </>
          ),
          validation: Rule => Rule.required(),
        }),
      ],
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
