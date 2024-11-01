
import type { StructureResolver } from 'sanity/structure'
import { createSingleton } from '../utils/create-singleton';
import { createCollection } from '../utils/create-collection';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Zawartość')
    .items([
      createSingleton(S, "global"),
      createSingleton(S, "redirects"),
      S.divider(),
      createSingleton(S, "Index_Page"),
      createSingleton(S, "Projects_Page"),
      createSingleton(S, "Investments_Page"),
      createSingleton(S, "About_Page"),
      createSingleton(S, "Contact_Page"),
      S.divider(),
      createSingleton(S, "PrivacyPolicy_Page"),
      createSingleton(S, "NotFound_Page"),
      S.divider(),
      createCollection(S, "Project_Collection"),
      createCollection(S, "Investment_Collection"),
      S.divider(),
      createCollection(S, "Faq_Collection"),
    ])
