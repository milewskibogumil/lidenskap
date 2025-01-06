/**
 * Array of objects defining the types of documents that can be linked internally.
 * Each object contains a 'type' property specifying the document type.
 *
 * @type {{type: string}[]}
 */
export const InternalLinkableTypes: { type: string }[] = [
  { type: 'Index_Page' },
  { type: 'Projects_Page' },
  { type: 'Investments_Page' },
  { type: 'About_Page' },
  { type: 'Service_Page' },
  { type: 'Contact_Page' },
  { type: 'PrivacyPolicy_Page' },
  { type: 'Project_Collection' },
];
