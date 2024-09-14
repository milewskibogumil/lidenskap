
/**
 * Global declaration of the domain for the application.
 * This constant is used for constructing full URLs and determining external links.
 * @constant
 * @type {string}
 */
export const DOMAIN: string = "https://lidenskap.pl";

/**
 * The domain used for preview deployments.
 * This constant is utilized to generate URLs for preview environments,
 * allowing content to be reviewed before it's published to the main site.
 * @constant
 * @type {string}
 */
export const PREVIEW_DEPLOYMENT_DOMAIN: string = import.meta.env.SANITY_STUDIO_PREVIEW_DOMAIN;
