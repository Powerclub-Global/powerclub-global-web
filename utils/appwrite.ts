import { Client, Databases } from "appwrite";

// Initialize Appwrite client - only in browser
let client: Client | null = null;
let databases: Databases | null = null;

// Constants
export const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID =
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
export const APPWRITE_DATABASE_ID =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
export const APPWRITE_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "";

// Appwrite is the legacy dual-write target for the contact form. It is only
// wired up when a project *and* a collection are actually configured; on the
// self-hosted deployment those vars are absent, and callers must see `databases`
// as null so they take the CRM-only path instead of firing a request that is
// guaranteed to 401.
const appwriteConfigured = Boolean(
  APPWRITE_PROJECT_ID && APPWRITE_DATABASE_ID && APPWRITE_COLLECTION_ID
);

if (typeof window !== "undefined" && appwriteConfigured) {
  client = new Client();
  client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

  databases = new Databases(client);
}

export { client, databases };
