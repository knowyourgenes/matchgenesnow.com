import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn, isSanityConfigured } from "./env";

let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (_client) return _client;
  const token = typeof window === "undefined" ? process.env.SANITY_API_TOKEN : undefined;
  _client = createClient({ projectId, dataset, apiVersion, useCdn, token });
  return _client;
}
