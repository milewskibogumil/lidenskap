// Single Types
import global from '../schema/singleTypes/global';
import redirects from '../schema/singleTypes/redirects';
import Index_Page from '../schema/singleTypes/Index_Page';
import Contact_Page from '../schema/singleTypes/Contact_Page';
import Projects_Page from '../schema/singleTypes/Projects_Page';
import Investments_Page from '../schema/singleTypes/Investments_Page';
import About_Page from '../schema/singleTypes/About_Page';
import Service_Page from '../schema/singleTypes/Service_Page';
import PrivacyPolicy_Page from '../schema/singleTypes/PrivacyPolicy_Page';
import NotFound_Page from '../schema/singleTypes/NotFound_Page';

const singleTypes = [
  global,
  redirects,
  Index_Page,
  Projects_Page,
  Investments_Page,
  About_Page,
  Service_Page,
  Contact_Page,
  PrivacyPolicy_Page,
  NotFound_Page,
];

// Collections Types
import Project_Collection from '../schema/collectionTypes/Project_Collection';
import Investment_Collection from '../schema/collectionTypes/Investment_Collection';
import Faq_Collection from '../schema/collectionTypes/Faq_Collection';

const collectionTypes = [
  Project_Collection,
  Investment_Collection,
  Faq_Collection,
];

// Components
import Components from '../schema/Components';

const components = [
  Components,
];

// UI Components
import cta from '../schema/ui/cta';
import seo from '../schema/ui/seo';
import PortableText from '../schema/ui/portable-text';
import Heading from '../schema/ui/portable-text/Heading';

const ui = [
  cta,
  seo,
  PortableText,
  Heading,
];

export const schemaTypes = [...singleTypes, ...collectionTypes, ...components, ...ui];

export const i18nTypes = [...singleTypes, ...collectionTypes]
  .map(type => type.name)
  .filter(name => !['redirects'].includes(name))

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
export const singletonTypes = new Set(singleTypes.map(type => type.name as string));
