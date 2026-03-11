import { llmSearch } from '@fdk-frontend/data-access';

const LLM_TIMEOUT_MS = 30000;

export const POST = async function (request: Request) {
  const { FDK_LLM_SEARCH_BASE_URI: baseUri = '' } = process.env;
  const endpoint = baseUri ? `${baseUri}/llm` : '';

  if (!endpoint) {
    return Response.json({ hits: [] } as { hits: unknown[] }, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const query = typeof body?.query === 'string' ? body.query : '';
    if (!query.trim()) {
      return Response.json({ hits: [] } as { hits: unknown[] }, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await llmSearch(endpoint, query, { timeout: LLM_TIMEOUT_MS });
    return Response.json(result, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.warn('LLM search proxy error:', err);
    return Response.json(
      { error: 'LLM search failed' },
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
