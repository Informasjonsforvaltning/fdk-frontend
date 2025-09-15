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
    // Add experimental features for better compatibility
    experimental: {
        // Disable React Compiler to prevent hanging issues
        reactCompiler: false,
        // Optimize for development
        optimizePackageImports: ['@digdir/designsystemet-react'],
    },
    // Add timeout configuration
    serverExternalPackages: ['@fellesdatakatalog/types'],
    // Optimize images
    images: {
        unoptimized: process.env.NODE_ENV === 'development',
    },
    webpack: (config) => {
        // Completely disable all caching mechanisms
        config.cache = false;

        // Disable persistent caching
        if (config.cache && typeof config.cache === 'object') {
            config.cache = false;
        }

        // Ignore problematic native dependencies
        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                'rdf-canonize-native': false,
            },
            fallback: {
                ...config.resolve?.fallback,
                'rdf-canonize-native': false,
                crypto: false,
                stream: false,
                util: false,
            },
        };

        // Optimize for development
        if (process.env.NODE_ENV === 'development') {
            config.optimization = {
                ...config.optimization,
                removeAvailableModules: false,
                removeEmptyChunks: false,
                splitChunks: false,
            };

            // Disable source maps in development to speed up builds
            config.devtool = false;
        }

        return config;
    },
    async redirects() {
        return [
            // Content redirects
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
