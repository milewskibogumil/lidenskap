import { defineField, defineType } from "sanity"
import { Tooltip, Box, Text, } from '@sanity/ui';
import { isValidUrl } from "../../utils/is-valid-url";
import { InternalLinkableTypes } from "../../structure/internal-linkable-types";

const name = 'cta';
const title = 'Call To Action (CTA)';
const icon = () => '👆';

export default defineType({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Text',
      description: 'The text that will be displayed on the button.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'theme',
      type: 'string',
      title: 'Theme',
      description: (
        <>
          <em>Primary</em> (main button) or <em>Secondary</em> (less important)
        </>
      ),
      options: {
        list: ['primary', 'secondary'],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: Rule => Rule.required(),
      fieldset: 'style',
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Type',
      description: (
        <>
          <em>External</em> (other websites) or <em>Internal</em> (within your site)
        </>
      ),
      options: {
        list: ['external', 'internal'],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: Rule => Rule.required(),
      fieldset: 'style',
    }),
    defineField({
      name: 'external',
      type: 'string',
      title: 'URL',
      description: 'Specify the full URL. Ensure it starts with "https://" and is a valid URL.',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) => [
        Rule.custom((value, { parent }) => {
          const linkType = (parent as { linkType?: string })?.linkType;
          if (linkType === 'external') {
            if (!value) return "URL is required";
            if (!value.startsWith('https://')) {
              return 'External link must start with the "https://" protocol';
            }
            if (!isValidUrl(value)) return 'Invalid URL';
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: 'internal',
      type: 'reference',
      title: 'Internal reference to page',
      description: 'Select an internal page to link to.',
      to: InternalLinkableTypes,
      options: {
        disableNew: true,
        filter: ({ document }) => {
          const language = (document as { language?: string })?.language;
          return {
            filter: 'defined(slug.current) && language == $lang',
            params: { lang: language }
          }
        }
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (rule) => [
        rule.custom((value, { parent }) => {
          const linkType = (parent as { linkType?: string })?.linkType;
          if (linkType === 'internal' && !value?._ref) return "You have to choose internal page to link to.";
          return true;
        }),
      ],
    }),
  ],
  fieldsets: [
    {
      name: 'style',
      title: 'Style',
      options: {
        columns: 2,
      }
    },
  ],
  preview: {
    select: {
      title: 'text',
      theme: 'theme',
      linkType: 'linkType',
      external: 'external',
      internal: 'internal.slug.current',
    },
    prepare({ title, theme, linkType, external, internal }) {
      const isExternal = linkType === 'external';
      const icon = isExternal ? '🌐' : '🔗';
      return {
        title: `${title}`,
        subtitle: isExternal ? external : internal,
        media: () => <Tooltip
          content={
            <Box padding={1}>
              <Text size={1}>
                {icon} {isExternal ? 'External link' : 'Internal link'}
                &nbsp;|&nbsp;
                {theme === 'primary' ? 'Primary button' : 'Secondary button'}
              </Text>
            </Box>
          }
          placement="top"
          portal
        >
          <span>{icon}</span>
        </Tooltip>
      };
    },
  },
});
