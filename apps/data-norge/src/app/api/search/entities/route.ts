import {
  searchAllEntities,
  searchEntitiesByPath,
} from '@fdk-frontend/data-access/server';

/** URL segment → fdk-search-service path (apis is alias for data-services). */
const SET_TO_SEARCH_PATH: Record<string, string> = {
  datasets: 'datasets',
  apis: 'data-services',
  concepts: 'concepts',
  'information-models': 'information-models',
  'services-and-events': 'services',
};

const VALID_SET_SEGMENTS = new Set<string>(Object.keys(SET_TO_SEARCH_PATH));

export const POST = async function (request: Request) {
  try {
    const body = await request.json();
    const query = typeof body?.query === 'string' ? body.query : '';
    const set = typeof body?.set === 'string' ? body.set : undefined;
    const pagination = body?.pagination ?? { size: 20, page: 0 };

    if (set !== undefined && !query.trim()) {
      if (set === 'docs') {
        return Response.json(
          { hits: [], page: { currentPage: 0, size: pagination.size ?? 20, totalElements: 0, totalPages: 0 } },
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (VALID_SET_SEGMENTS.has(set)) {
        const path = SET_TO_SEARCH_PATH[set];
        const result = await searchEntitiesByPath(path, { pagination });
        return Response.json(result, {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const result = await searchAllEntities({
      query,
      pagination,
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
