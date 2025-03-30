import { defineField, defineType } from "sanity"
import { defineSlugForDocument } from "../../utils/define-slug-for-document";
import { documentPreview } from "../../utils/document-preview";
import { PortableText } from "../ui/portable-text";

const name = 'PrivacyPolicy_Page';
const title = 'Polityka Prywatności';
const icon = () => '📄';

export default defineType({
  name: name,
  type: 'document',
  title: title,
  icon,
  options: { documentPreview: true },
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    ...defineSlugForDocument({
      slugs: {
        pl: '/polityka-prywatnosci',
        en: '/en/privacy-policy',
      }
    }),
    defineField({
      name: 'header',
      type: 'object',
      title: 'Sekcja nagłówkowa',
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Paragraf',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required()
    }),
    PortableText({
      name: 'content',
      title: 'Treść',
      allowHeadings: true
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
  ...documentPreview()
});
