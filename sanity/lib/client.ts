import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion || "2025-08-27", // fallback to a valid date
  useCdn: true, // set to false if you need fresh data (ISR, revalidation)
});
