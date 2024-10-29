//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const { composePlugins, withNx } = require('@nx/next');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const createMDX = require('@next/mdx');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    assetPrefix: '/nb',
    sassOptions: {
        silenceDeprecations: ['legacy-js-api', 'import'],
    },
    async redirects() {
        return [
            {
                source: '/:lang/docs/tutorials/:slug',
                destination: '/:lang/docs/sharing-data/:slug',
                permanent: true,
            },
            {
                source: '/:lang/docs/how-to-guides/:slug',
                destination: '/:lang/docs/sharing-data/:slug',
                permanent: true,
            },
            {
                source: '/:lang/docs/additional-resources',
                destination: '/:lang/docs/resources',
                permanent: true,
            },
            {
                source: '/:lang/docs/rdf',
                destination: '/:lang/docs/sharing-data/rdf',
                permanent: true,
            },
            {
                source: '/:lang/docs/rdf-crash-course',
                destination: '/:lang/docs/sharing-data/rdf/rdf-crash-course',
                permanent: true,
            },
        ];
    },
};

// Create the MDX configuration
const withMDX = createMDX({
    // Add markdown plugins here, as desired
});

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
    withMDX,
];

module.exports = composePlugins(...plugins)(nextConfig);
