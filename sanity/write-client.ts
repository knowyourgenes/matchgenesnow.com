import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "./env";

let _client: SanityClient | null = null;

export function getWriteClient(): SanityClient | null {
  if (typeof window !== "undefined") return null;
  if (!isSanityConfigured) return null;
  if (_client) return _client;
  const token = process.env.SANITY_API_TOKEN;
  if (!token) return null;
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: "raw",
  });
  return _client;
}
