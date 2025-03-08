import { createClient, type QueryParams } from '@sanity/client'
import { isProductionDeployment } from './is-production-deployment';

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || import.meta.env.SANITY_API_TOKEN;

if (!SANITY_API_TOKEN) console.warn('\x1b[33m%s\x1b[0m', "The `SANITY_API_TOKEN` environment variable is required.");

export const client = createClient({
  projectId: '0qbklpoh',
  dataset: 'production',
  apiVersion: '2025-03-08',
  useCdn: false,
  perspective: isProductionDeployment ? 'published' : 'drafts',
  token: SANITY_API_TOKEN
})

export default async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}): Promise<QueryResponse> {
  return await client.fetch<QueryResponse>(query, params);
}
