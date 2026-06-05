// /lib/live.ts
import "server-only";
import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error("SANITY_API_READ_TOKEN is not set");
}

export const { sanityFetch: liveFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
});

// ✅ Create a safe version that won't throw during static generation
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, any>;
}): Promise<{ data: QueryResponse }> {
  try {
    // Use the liveFetch but catch draftMode errors during build
    return await liveFetch({ query, params });
  } catch (error: any) {
    // If it's a draftMode error during build, fall back to regular fetch
    if (
      error.message?.includes("draftMode") ||
      error.message?.includes("request scope")
    ) {
      console.log(
        "Fallback to static fetch for:",
        query.substring(0, 50) + "..."
      );

      // Use regular client fetch without draft mode
      const data = await client.fetch<QueryResponse>(query, params);
      return { data };
    }
    throw error;
  }
}
