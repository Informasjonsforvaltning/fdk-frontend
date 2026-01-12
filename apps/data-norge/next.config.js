//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const { composePlugins, withNx } = require('@nx/next');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const createMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    assetPrefix: '/nb',
    sassOptions: {
        silenceDeprecations: ['legacy-js-api', 'import'],
    },
    // Ensure CSS HMR works properly
    compiler: {
        // Remove console logs in production
        removeConsole: process.env.NODE_ENV === 'production',
    },
    reactStrictMode: true,
    // React Compiler configuration (moved from experimental in Next.js 16)
    reactCompiler: false,
    // Add experimental features for better compatibility
    experimental: {
        // Optimize for development
        optimizePackageImports: ['@digdir/designsystemet-react'],
        // Enable CSS modules with better HMR support
        cssChunking: 'strict',
    },
    serverExternalPackages: ['@fellesdatakatalog/types'],
    // Optimize images
    images: {
        unoptimized: process.env.NODE_ENV === 'development',
    },
    webpack: (config) => {
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

        // Optimize for development with HMR-friendly settings
        if (process.env.NODE_ENV === 'development') {
            // Disable caching completely to prevent CSS HMR issues
            config.cache = false;

            config.optimization = {
                ...config.optimization,
                removeAvailableModules: false,
                removeEmptyChunks: false,
                splitChunks: false,
            };

            // Improve HMR performance with better file watching
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 50,
                ignored: /node_modules/,
            };
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
