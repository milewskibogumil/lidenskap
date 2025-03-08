import { defineConfig } from 'sanity'
import { structure } from './structure'
import { schemaTypes, singletonActions, singletonTypes, i18nTypes } from './structure/schema-types'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { visionTool } from '@sanity/vision'
import { showProductionUrl } from './utils/show-production-url'
import { documentInternationalization } from '@sanity/document-internationalization'
import { LANGUAGES } from './structure/languages'

export default defineConfig({
  name: 'default',
  title: 'lidenskap',

  projectId: 'ozvu6nwg',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    media(),
    visionTool(),
    showProductionUrl(),
    documentInternationalization({
      supportedLanguages: LANGUAGES.map(({ id, title }) => ({ id, title })),
      schemaTypes: i18nTypes,
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
