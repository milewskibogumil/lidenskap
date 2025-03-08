import { LANGUAGES } from '../structure/languages';

/**
 * Creates a standardized document preview with language information
 *
 * @param title - The document title
 * @param slug - The document slug
 * @param language - The language code (e.g., 'en', 'pl')
 * @returns An object with the complete preview configuration
 */
export const documentPreview = () => ({
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      language: 'language',
    },
    prepare: ({ title, slug, language }: { title: string; slug?: string; language?: string }) => {
      const languageObj = language ? LANGUAGES.find(lang => lang.id === language) : undefined;
      const formattedTitle = languageObj
        ? `${title} (${languageObj.title})`
        : title;
      return {
        title: formattedTitle,
        subtitle: slug || '',
      };
    }
  }
})
