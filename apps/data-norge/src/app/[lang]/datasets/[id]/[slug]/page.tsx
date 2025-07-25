import { notFound, redirect } from 'next/navigation';
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { getDatasetSlug, printLocaleValue } from '@fdk-frontend/utils';
import { type PopulatedDatasetReference } from '@fdk-frontend/types';
import {
    type DatasetWithIdentifier,
    type DatasetScores,
    type DatasetScore,
    type DataService,
    type CommunityTopic,
    type SearchObject,
    type AccessService,
} from '@fellesdatakatalog/types';
import DatasetDetailsPage from '../../../../components/details-page/dataset';
import {
    getOrgLogo,
    getDataset,
    getApis,
    getAllCommunityTopics,
    getMetadataScores,
    searchRelations,
    searchOrgDatasets,
    searchThemeDatasets,
    searchConcepts,
    getPopulatedDatasetReferences,
    searchDatasets,
    searchDataServices,
    searchInformationModels,
} from '@fdk-frontend/data-access/server';

export type DetailsPageWrapperProps = {
    params: Promise<{
        lang: LocaleCodes;
        id: string;
        slug: string;
    }>;
    searchParams: Promise<any>;
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
    const { FDK_BASE_URI, FDK_COMMUNITY_BASE_URI } = process.env;

    const params = await props.params;
    const searchParams = await props.searchParams;
    const locale = params.lang ?? i18n.defaultLocale;
    const activeTab = searchParams?.tab ?? 'overview';
    const similarItemsLimit = 5;

    const dictionaries = {
        common: await getDictionary(locale, 'common'),
        detailsPage: await getDictionary(locale, 'details-page'),
    };

    let dataset: DatasetWithIdentifier;
    let metadataScore: DatasetScore | undefined = undefined;
    let orgLogo: string | null = null;
    let apis: DataService[] = [];
    let concepts: SearchObject[] = [];
    let externalRelatedAPIs: SearchObject[] = [];
    let externalRelatedDatasets: DatasetWithIdentifier[] = [];
    let internalRelatedDatasets: DatasetWithIdentifier[] = [];
    let similarDatasets: DatasetWithIdentifier[] = [];
    let orgDatasets: DatasetWithIdentifier[] = [];
    let themeDatasets: DatasetWithIdentifier[] = [];
    let communityTopics: CommunityTopic[] = [];
    let populatedReferences: PopulatedDatasetReference[] = [];
    let resolvedDistributionDataServices: SearchObject[] = [];
    let resolvedDistributionInformationModels: SearchObject[] = [];

    // Fetch details about dataset
    try {
        dataset = await getDataset(params.id);
    } catch (err) {
        console.error(`Failed to get dataset with ID ${params.id}`, JSON.stringify(err));
        notFound();
        throw err;
    }

    // Redirect to canonical slug if needed
    const canonicalSlug = getDatasetSlug(dataset, locale);
    if (params.slug !== canonicalSlug) {
        // Preserve query parameters
        const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
        const redirectUrl = queryString
            ? `/${locale}/datasets/${params.id}/${canonicalSlug}?${queryString}`
            : `/${locale}/datasets/${params.id}/${canonicalSlug}`;

        redirect(redirectUrl);
    }

    // Resolve data services from distribution & sample access services
    try {
        const services = [
            ...(dataset.distribution ?? []).reduce<AccessService[]>(
                (acc, dist) => acc.concat(dist.accessService ?? []),
                [],
            ),
            ...(dataset.sample ?? []).reduce<AccessService[]>(
                (acc, sample) => acc.concat((sample as any).accessService ?? []),
                [],
            ),
        ];
        const uris = services.map((service) => service?.uri).filter((uri) => !!uri);
        const { hits = [] } = await searchDataServices(uris);
        resolvedDistributionDataServices = hits;
    } catch {
        // Do nothing
    }

    // Resolve information models from distribution & sample conformsTo property
    try {
        const conformsTo = [
            ...(dataset.distribution ?? []).reduce<any[]>((acc, dist) => acc.concat(dist.conformsTo ?? []), []),
            ...(dataset.sample ?? []).reduce<any[]>((acc, sample) => acc.concat((sample as any).conformsTo ?? []), []),
        ];
        const uris = conformsTo.map((standard) => standard?.uri).filter((uri) => !!uri);
        const { hits = [] } = await searchInformationModels(uris);
        resolvedDistributionInformationModels = hits;
    } catch {
        // Do nothing
    }

    // Fetch publisher logo
    try {
        orgLogo = await getOrgLogo(dataset.publisher?.id);
    } catch {
        // Do nothing
    }

    // Fetch metadata scores
    try {
        metadataScore = ((await getMetadataScores([dataset.uri])) as DatasetScores)?.scores?.[dataset.uri];
    } catch {
        // Do nothing
    }

    // Fetch community posts
    try {
        communityTopics = await getAllCommunityTopics(dataset.id);
    } catch {
        // Do nothing
    }

    // Lookup concepts/subjects
    try {
        const results = await searchConcepts(
            dataset.subject?.map((concept) => concept.uri).filter((uri) => uri !== undefined),
        );
        concepts = results?.hits ?? [];
    } catch {
        // Do nothing
    }

    // Find internal related datasets
    try {
        const results = await searchDatasets(
            dataset.references?.map((r) => r.source?.uri).filter((uri) => uri !== undefined),
        );
        internalRelatedDatasets = results?.hits ?? [];
    } catch {
        // Do nothing
    }

    // Lookup references
    try {
        populatedReferences = await getPopulatedDatasetReferences(dataset.references);
    } catch {
        // Do nothing
    }

    // Find external related resources
    try {
        const results = await searchRelations(dataset.uri);
        const hits = results?.hits ?? [];

        externalRelatedAPIs = hits.filter((r: SearchObject) => r.searchType === 'DATA_SERVICE');
        externalRelatedDatasets = hits.filter((r: SearchObject) => r.searchType === 'DATASET');

        apis = await getApis(externalRelatedAPIs.map((api) => api.id).filter((id): id is string => id !== undefined));
    } catch {
        // Do nothing
    }

    // If room for more, fetch additional datasets from themes
    try {
        const results = await searchThemeDatasets(dataset.losTheme?.map((t: any) => t.losPaths[0]));

        // Filter self
        themeDatasets = results.hits?.filter((d: any) => d.id !== dataset.id) || [];

        // Combine and limit to 5
        similarDatasets = [...externalRelatedDatasets, ...themeDatasets].slice(0, similarItemsLimit);
    } catch {
        // Do nothing
    }

    // If room for more, fetch additional datasets based on org
    if (similarDatasets && similarDatasets?.length < similarItemsLimit) {
        try {
            const results = await searchOrgDatasets(dataset.publisher?.orgPath);

            // Filter self
            orgDatasets = results.hits?.filter((d: any) => d.id !== dataset.id && d.searchType === 'DATASET') || [];

            // Combine and limit to 5
            similarDatasets = [...similarDatasets, ...orgDatasets].slice(0, similarItemsLimit);
        } catch {
            // Do nothing
        }
    }

    return (
        <DatasetDetailsPage
            baseUri={FDK_BASE_URI as string}
            resource={dataset}
            orgLogo={orgLogo}
            apis={apis}
            concepts={concepts}
            metadataScore={metadataScore}
            similarDatasets={similarDatasets}
            populatedReferences={populatedReferences}
            internalRelatedDatasets={internalRelatedDatasets}
            communityTopics={communityTopics}
            communityBaseUri={FDK_COMMUNITY_BASE_URI as string}
            locale={locale}
            dictionaries={dictionaries}
            defaultActiveTab={activeTab}
            resolvedDistributionDataServices={resolvedDistributionDataServices}
            resolvedDistributionInformationModels={resolvedDistributionInformationModels}
        />
    );
};

export const generateMetadata = async (props: DetailsPageWrapperProps) => {
    const params = await props.params;
    const locale = params.lang ?? i18n.defaultLocale;
    const dictionary = await getDictionary(locale, 'details-page');

    try {
        const dataset = await getDataset(params.id);
        const title = printLocaleValue(locale, dataset.title) || dictionary.header.namelessDataset;
        const description = printLocaleValue(locale, dataset.description) ?? dictionary.breadcrumbs.datasets;
        const publisher = printLocaleValue(locale, dataset.publisher?.prefLabel);
        const keywords = dataset.keyword
            ?.map((k: any) => printLocaleValue(locale, k))
            .filter(Boolean)
            .join(', ');

        // Get the first available license URL from distributions
        const getFirstLicenseUrl = () => {
            const firstDistributionWithLicense = dataset.distribution?.find((dist: any) => dist.license?.length > 0);
            const firstLicense = firstDistributionWithLicense?.license?.[0];

            return firstLicense?.uri;
        };

        // Create structured data for better SEO
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: title,
            description: description,
            url: `https://data.norge.no/${locale}/datasets/${dataset.id}/${getDatasetSlug(dataset, locale)}`,
            identifier: dataset.id,
            ...(publisher && {
                publisher: {
                    '@type': 'Organization',
                    name: publisher,
                },
            }),
            dateModified: dataset.modified,
            datePublished: dataset.issued,
            keywords: keywords,
            isAccessibleForFree: dataset.isOpenData,
            ...(getFirstLicenseUrl() && { license: getFirstLicenseUrl() }),
            distribution: dataset.distribution
                ?.filter((dist: any) => dist.accessURL || dist.downloadURL)
                .map((dist: any) => ({
                    '@type': 'DataDownload',
                    ...(dist.fdkFormat?.uri && { encodingFormat: dist.fdkFormat.uri }),
                    contentUrl: dist.downloadURL || dist.accessURL,
                })),
        };

        return {
            title: `${title} - ${dictionary.breadcrumbs.datasets} - data.norge.no`,
            description: description,
            keywords: keywords,
            openGraph: {
                title: title,
                description: description,
                type: 'website',
                url: `https://data.norge.no/${locale}/datasets/${dataset.id}/${getDatasetSlug(dataset, locale)}`,
                siteName: 'data.norge.no',
                locale: locale,
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
            },
            alternates: {
                canonical: `https://data.norge.no/${locale}/datasets/${dataset.id}/${getDatasetSlug(dataset, locale)}`,
                languages: {
                    nb: `https://data.norge.no/nb/datasets/${dataset.id}/${getDatasetSlug(dataset, 'nb')}`,
                    en: `https://data.norge.no/en/datasets/${dataset.id}/${getDatasetSlug(dataset, 'en')}`,
                    nn: `https://data.norge.no/nn/datasets/${dataset.id}/${getDatasetSlug(dataset, 'nn')}`,
                },
            },
            other: {
                'structured-data': JSON.stringify(structuredData),
            },
        };
    } catch (err) {
        console.error(`Failed generate metadata for dataset with ID ${params.id}`, JSON.stringify(err));
        notFound();
    }
};

export default DetailsPageWrapper;
