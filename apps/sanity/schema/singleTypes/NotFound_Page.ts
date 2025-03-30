import { defineField, defineType } from "sanity"
import { defineSlugForDocument } from "../../utils/define-slug-for-document";
import { documentPreview } from "../../utils/document-preview";

const name = 'NotFound_Page';
const title = 'Strony nie znaleziono';
const icon = () => '🔍';

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
        pl: '/404',
        en: '/en/404',
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
