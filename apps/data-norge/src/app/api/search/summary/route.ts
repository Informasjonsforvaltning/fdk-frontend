import { searchEntitiesByPath } from '@fdk-frontend/data-access/server';

const SUMMARY_PAGE_SIZE = 10;
const SUMMARY_PAGE = 0;

const ENTITY_PATHS = [
  'datasets',
  'data-services',
  'concepts',
  'information-models',
  'services',
  'events',
] as const;

type PagedResult = {
  hits?: unknown[];
  page?: {
    currentPage: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  [key: string]: unknown;
};

const emptyResult = (): PagedResult => ({
  hits: [],
  page: {
    currentPage: SUMMARY_PAGE,
    size: SUMMARY_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
  },
});

export type SearchSummaryResponse = {
  summary: {
    datasets: PagedResult;
    apis: PagedResult;
    concepts: PagedResult;
    informationModels: PagedResult;
    services: PagedResult;
    events: PagedResult;
  };
};

export const POST = async function (request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const pagination = body?.pagination ?? { size: SUMMARY_PAGE_SIZE, page: SUMMARY_PAGE };

    const results = await Promise.all(
      ENTITY_PATHS.map(async (path) => {
        try {
          return await searchEntitiesByPath(path, { pagination: { ...pagination } });
        } catch (err) {
          console.warn(`Search summary failed for /search/${path}:`, err);
          return emptyResult();
        }
      })
    );

    const [datasets, apis, concepts, informationModels, services, events] = results;

    const response: SearchSummaryResponse = {
      summary: {
        datasets: (datasets as PagedResult) ?? emptyResult(),
        apis: (apis as PagedResult) ?? emptyResult(),
        concepts: (concepts as PagedResult) ?? emptyResult(),
        informationModels: (informationModels as PagedResult) ?? emptyResult(),
        services: (services as PagedResult) ?? emptyResult(),
        events: (events as PagedResult) ?? emptyResult(),
      },
    };

    return Response.json(response, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.warn('Search summary route error:', err);
    return Response.json(
      { error: 'Search summary failed' },
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
