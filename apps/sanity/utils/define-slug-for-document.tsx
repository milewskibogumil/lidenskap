import { defineField } from "sanity";
import { slugify } from "./slugify";
import { isUniqueSlug } from "./is-unique-slug";

export const defineSlugForDocument = ({ source, prefix = '', slug }: { source?: string, prefix?: string, slug?: string }) => [
  ...(source ? [] : [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of the document, used for display in the Breadcrumbs.',
      validation: Rule => Rule.required(),
    }),
  ]),
  defineField({
    name: 'slug',
    type: 'slug',
    title: `Slug`,
    description: (
      <>
        Slug is a unique identifier for the document, used for SEO and links.
        {slug && <> <strong><em>That slug can&apos;t be changed.</em></strong></>}
        {prefix && <> The slug should start with a prefix: <strong>{prefix}</strong></>}
      </>
    ),
    ...!!slug && {
      initialValue: { current: slug },
      readOnly: true,
    },
    options: {
      source: source || 'title',
      slugify: (slug: string) => `${prefix || '/'}${slugify(slug)}`,
      isUnique: isUniqueSlug,
    },
    validation: (Rule) =>
      Rule.required().custom((value) => {
        if (prefix && value?.current && !value.current.startsWith(prefix)) {
          return `Slug should start with ${prefix}`;
        }
        if (!slug && value?.current && value.current.replace(prefix, '') !== slugify(value.current.replace(prefix, ''))) {
          return 'There is a typo in the slug. Remember that slug can contain only lowercase letters, numbers and dashes.';
        }
        return true;
      })
  }),
]
