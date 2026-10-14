/** Last settled LLM search body, keyed by trimmed query. A reload starts empty. */
export type LlmSearchCacheHit = {
  id: string;
  title: string;
  description: string;
  type: string;
  publisher: string;
  publisherId: string;
};

export type LlmSearchCacheBody = {
  hits: LlmSearchCacheHit[];
};

const cache = new Map<string, LlmSearchCacheBody>();

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const readString = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);

const readHit = (value: unknown): LlmSearchCacheHit | undefined => {
  if (!isRecord(value)) return undefined;
  const id = readString(value.id)?.trim();
  const title = readString(value.title)?.trim();
  const type = readString(value.type)?.trim();
  if (!id || !title || !type) return undefined;

  return {
    id,
    title,
    description: readString(value.description) ?? "",
    type,
    publisher: readString(value.publisher) ?? "",
    publisherId: readString(value.publisherId) ?? "",
  };
};

/** A successful body, including `{ hits: [] }`. A missing or unusable body is not cached. */
export const readLlmSearchBody = (value: unknown): LlmSearchCacheBody | undefined => {
  if (!isRecord(value) || !Array.isArray(value.hits)) return undefined;

  const hits: LlmSearchCacheHit[] = [];
  for (const hit of value.hits) {
    const parsed = readHit(hit);
    if (parsed) hits.push(parsed);
  }

  if (hits.length === 0 && value.hits.length > 0) return undefined;
  return { hits };
};

export const readLlmSearchCache = (query: string): LlmSearchCacheBody | undefined => cache.get(query.trim());

export const writeLlmSearchCache = (query: string, body: LlmSearchCacheBody): void => {
  const key = query.trim();
  if (!key) return;
  cache.set(key, body);
};
