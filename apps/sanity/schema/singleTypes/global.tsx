import { defineField, defineType } from 'sanity';
import { LANGUAGES } from '../../structure/languages';

const name = 'global';
const title = 'Globalne ustawienia';
const icon = () => '🌍';

export default defineType({
  name: name,
  type: 'document',
  title: title,
  icon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Adres e-mail',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'tel',
      type: 'string',
      title: 'Numer telefonu',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'address',
      type: 'object',
      title: 'Adres',
      fields: [
        defineField({
          name: 'address',
          type: 'string',
          title: 'Adres',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'link',
          type: 'url',
          title: 'Link do wizytówki Google Maps',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'socials',
      type: 'object',
      title: 'Social Media',
      fields: [
        defineField({
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
          validation: Rule => Rule.uri({ scheme: ['https'] }).error('Podaj poprawny URL (zaczynając od https://)'),
        }),
        defineField({
          name: 'instagram',
          type: 'url',
          title: 'Instagram',
          validation: Rule => Rule.uri({ scheme: ['https'] }).error('Podaj poprawny URL (zaczynając od https://)'),
        }),
      ],
      options: { collapsible: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'companyInfo',
      type: 'object',
      title: 'Informacje o firmie',
      fields: [
        defineField({
          name: 'nip',
          type: 'string',
          title: 'NIP',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'krs',
          type: 'string',
          title: 'KRS',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'feauturedProjects',
      type: 'array',
      title: '3 wyróżnione projekty',
      description: '3 wyróżnione projekty będą widoczne w nawigacji oraz w stopce.',
      of: [
        defineField({
          name: 'project',
          type: 'reference',
          to: { type: 'Project_Collection' },
          options: {
            disableNew: true,
            filter: ({ parent }) => {
              const selectedIds = (parent as { _ref?: string }[])?.filter(item => item._ref).map(item => item._ref) || [];
              if (selectedIds.length > 0) {
                return {
                  filter: '!(_id in $selectedIds) && !(_id in path("drafts.**"))',
                  params: { selectedIds }
                }
              }
              return {}
            }
          }
        })
      ],
      validation: Rule => Rule.required().min(3).max(3),
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'Global SEO',
      fields: [
        defineField({
          name: 'img',
          type: 'image',
          title: 'Social Share Image',
          description: 'Social Share Image is visible when sharing website on social media. The dimensions of the image should be 1200x630px. For maximum compatibility, use JPG or PNG formats, as WebP may not be supported everywhere.',
          validation: Rule => Rule.required()
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'OrganizationSchema',
      type: 'object',
      title: 'Organization structured data',
      description: (
        <>
          Learn more about{' '}
          <a
            href="https://developers.google.com/search/docs/appearance/structured-data/organization?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Organization structured data
          </a>
        </>
      ),
      options: { collapsible: true },
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Name',
          description: 'Enter the name of your organization as you want it to appear in search results.',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'text',
          rows: 3,
          title: 'Description',
          description: 'A brief description of your organization that will appear in search results.',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      language: 'language',
    },
    prepare: ({ language }) => {
      const languageObj = language ? LANGUAGES.find(lang => lang.id === language) : undefined;
      const formattedTitle = languageObj
        ? `${title} (${languageObj.title})`
        : title;
      return {
        title: formattedTitle,
      }
    }
  }
})

