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
        // Enable source maps for better debugging
        sourceMap: process.env.NODE_ENV === 'development',
        // Additional options for better HMR
        includePaths: ['node_modules'],
    },
    // Ensure CSS HMR works properly
    compiler: {
        // Remove console logs in production
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Force CSS modules to work with HMR
    cssModules: {
        // Use a simpler naming pattern for CSS modules
        localIdentName: '[local]_[hash:base64:5]',
    },
    // Add experimental features for better compatibility
    experimental: {
        // Disable React Compiler to prevent hanging issues
        reactCompiler: false,
        // Optimize for development
        optimizePackageImports: ['@digdir/designsystemet-react'],
        // Enable CSS modules with better HMR support
        cssChunking: 'strict',
        // Disable Turbopack for now to fix CSS HMR issues
        // turbo: {
        //     rules: {
        //         '*.scss': {
        //             loaders: ['sass-loader'],
        //             as: '*.css',
        //         },
        //     },
        // },
    },
    // Add timeout configuration
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
            // Disable cache completely for CSS modules to fix HMR
            config.cache = false;
            
            // Force CSS modules to reload properly
            config.module.rules.forEach((rule) => {
                if (rule.test && rule.test.toString().includes('scss')) {
                    if (rule.use && Array.isArray(rule.use)) {
                        rule.use.forEach((use) => {
                            if (use.loader && use.loader.includes('css-loader')) {
                                use.options = {
                                    ...use.options,
                                    modules: {
                                        ...use.options?.modules,
                                        localIdentName: '[local]_[hash:base64:5]',
                                        exportLocalsConvention: 'camelCase',
                                        auto: true,
                                    },
                                };
                            }
                        });
                    }
                }
            });
            
            // Improve HMR performance with better file watching
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 200,
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
