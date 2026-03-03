import { searchAllEntities } from '@fdk-frontend/data-access/server';

export const POST = async function (request: Request) {
  try {
    const body = await request.json();
    const result = await searchAllEntities({
      query: body?.query,
      pagination: body?.pagination ?? { size: 20, page: 0 },
      filters: body?.filters,
      sort: body?.sort,
      ...body,
    });
    return Response.json(result, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.warn('Search entities proxy error:', err);
    return Response.json(
      { error: 'Search failed' },
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
