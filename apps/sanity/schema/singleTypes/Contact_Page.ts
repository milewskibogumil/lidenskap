import { defineField, defineType } from "sanity"
import { defineSlugForDocument } from "../../utils/define-slug-for-document";
import { documentPreview } from "../../utils/document-preview";

const name = 'Contact_Page';
const title = 'Kontakt';
const icon = () => '📞';

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
        pl: '/kontakt',
        en: '/en/contact',
      }
    }),
    defineField({
      name: 'components',
      type: 'components',
      title: 'Page Components',
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
