import { defineField, defineType } from "sanity"
import { defineSlugForDocument } from "../../utils/define-slug-for-document";

const name = 'Contact_Page';
const title = 'Kontakt';
const slug = '/kontakt';
const icon = () => '📞';

export default defineType({
  name: name,
  type: 'document',
  title: title,
  icon,
  fields: [
    ...defineSlugForDocument({ slug: slug }),
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
  preview: {
    prepare: () => ({
      title: title,
      subtitle: slug
    })
  }
});
