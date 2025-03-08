import { defineConfig } from 'sanity'
import { PROJECT_ID, DATASET } from './constants'
import { structure } from './structure'
import { schemaTypes, singletonActions, singletonTypes, i18nTypes } from './structure/schema-types'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { visionTool } from '@sanity/vision'
import { showProductionUrl } from './utils/show-production-url'
import { documentInternationalization } from '@sanity/document-internationalization'
import { LANGUAGES } from './structure/languages'
import { assist } from '@sanity/assist'

export default defineConfig({
  name: 'default',
  title: 'lidenskap',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    structureTool({ structure }),
    media(),
    visionTool(),
    showProductionUrl(),
    documentInternationalization({
      supportedLanguages: LANGUAGES.map(({ id, title }) => ({ id, title })),
      schemaTypes: i18nTypes,
    }),
    assist({
      translate: {
        document: {
          languageField: 'language',
        }
      }
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
