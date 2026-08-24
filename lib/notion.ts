import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import {
  PageObjectResponse,
  QueryDatabaseParameters,
  GetBlockParameters,
  QueryDatabaseResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionBlock } from "@/components/NotionContent";

type NotionErrorCode =
  | "unauthorized"
  | "restricted_resource"
  | "object_not_found"
  | "rate_limited"
  | "invalid_request"
  | "invalid_json"
  | "maintenance"
  | "conflict_error"
  | "internal_server_error"
  | "service_unavailable"
  | "unknown";

class NotionError extends Error {
  constructor(
    message: string,
    public code: NotionErrorCode,
    public status?: number
  ) {
    super(message);
    this.name = "NotionError";
  }
}

interface NotionResponseError extends Error {
  status: number;
  code: NotionErrorCode;
}

// Simplified Notion client for server-side use
class ServerNotionClient {
  private client: Client;
  private MAX_RETRIES = 3;
  private RETRY_DELAY = 1000; // 1 second

  constructor(auth: string) {
    this.client = new Client({ auth });
  }

  private isNotionError(error: unknown): error is NotionResponseError {
    if (!(error instanceof Error)) return false;
    const errorObj = error as { status?: unknown };
    return "status" in error && typeof errorObj.status === "number";
  }

  private async withRetry<T>(operation: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (this.isNotionError(error)) {
          // Don't retry on client errors (4xx)
          if (error.status >= 400 && error.status < 500) {
            throw new NotionError(
              error.message,
              error.code || "unknown",
              error.status
            );
          }
        }
        if (attempt < this.MAX_RETRIES) {
          await new Promise((resolve) =>
            setTimeout(resolve, this.RETRY_DELAY * Math.pow(2, attempt - 1))
          );
        }
      }
    }
    throw lastError;
  }

  async queryDatabase(
    databaseId: string,
    params: Partial<Omit<QueryDatabaseParameters, "database_id">> = {}
  ): Promise<QueryDatabaseResponse> {
    return this.withRetry(() =>
      this.client.databases.query({
        database_id: databaseId,
        ...params,
      })
    );
  }

  async getBlockChildren(
    blockId: string,
    params: Partial<Omit<GetBlockParameters, "block_id">> = {}
  ): Promise<ListBlockChildrenResponse> {
    return this.withRetry(() =>
      this.client.blocks.children.list({
        block_id: blockId,
        ...params,
      })
    );
  }
}

// Export singleton instance
export const notionClient = new ServerNotionClient(
  process.env.NOTION_API_KEY || ""
);

// Initialize NotionToMarkdown
export const n2m = new NotionToMarkdown({
  notionClient: new Client({ auth: process.env.NOTION_API_KEY }),
});

export interface BlogPost {
  id: string;
  title: string;
  coverImage: string;
  coverVideo: string;
  mediaType: "image" | "video";
  description: string;
  content: NotionBlock[];
  date: string;
  tags: string[];
}

/**
 * True only when both Notion credentials are present. The self-hosted
 * deployment may run without them (they lived only in the old Vercel project),
 * in which case the press section degrades to an empty list rather than
 * throwing and 500-ing the route.
 */
export function isNotionConfigured(): boolean {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isNotionConfigured()) {
    console.warn(
      "[notion] NOTION_API_KEY / NOTION_DATABASE_ID not set — press content disabled."
    );
    return [];
  }

  try {
    return await fetchBlogPosts();
  } catch (error) {
    // Never let a Notion outage or a revoked token take the page down; the rest
    // of the site is unrelated to it.
    console.error("[notion] failed to load press posts:", error);
    return [];
  }
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_DATABASE_ID!;

  const response = await notionClient.queryDatabase(databaseId, {
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const posts = await Promise.all(
    response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map(async (page) => {
        // Fetch blocks
        const blocksResponse = await notionClient.getBlockChildren(page.id);
        const blocks = blocksResponse.results as NotionBlock[];

        // Extract cover media and determine type
        const coverFiles = (
          page.properties["Cover Image"] as {
            files: Array<{
              file?: { url: string };
              external?: { url: string };
              name: string;
              type?: string;
            }>;
          }
        ).files;

        const coverFile = coverFiles[0];
        let coverImage = "";
        let coverVideo = "";
        let mediaType: "image" | "video" = "image";

        if (coverFile) {
          let url = coverFile.file?.url || coverFile.external?.url || "";
          const fileName = coverFile.name.toLowerCase();

          if (url.includes("secure.notion-static.com")) {
            try {
              const urlParts = url.split("secure.notion-static.com/")[1];
              if (urlParts) {
                const [fileId] = urlParts.split("?");
                url = `https://prod-files-secure.s3.us-west-2.amazonaws.com/${fileId}`;
              }
            } catch (error) {
              console.warn("Failed to transform Notion URL:", error);
            }
          }

          if (url.toLowerCase().endsWith(".mp4") || fileName.endsWith(".mp4")) {
            coverVideo = url;
            coverImage = "";
            mediaType = "video";
          } else {
            coverImage = url;
            coverVideo = "";
            mediaType = "image";
          }
        }

        // Extract tags
        const tagsProperty = page.properties.Tags as {
          multi_select: Array<{ name: string }>;
        };
        const tags = tagsProperty.multi_select.map((tag) => tag.name);

        // Format date
        const dateProperty = page.properties.Date as {
          date: { start: string } | null;
        };
        const date = dateProperty.date?.start || "";

        return {
          id: page.id,
          title:
            (
              page.properties.Title as {
                title: Array<{ plain_text: string }>;
              }
            ).title[0]?.plain_text || "",
          description:
            (
              page.properties.Description as {
                rich_text: Array<{ plain_text: string }>;
              }
            ).rich_text[0]?.plain_text || "",
          content: blocks,
          coverImage,
          coverVideo,
          mediaType,
          date,
          tags,
        };
      })
  );

  return posts;
}
