// lib/backendClient.ts
// ✅ Server-side client (token allowed, only on server)

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Use fresh data on server paths
  token: process.env.SANITY_API_TOKEN, // Ensure this is set on your server environment
});
