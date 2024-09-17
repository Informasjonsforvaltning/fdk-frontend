//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
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
    assetPrefix: '/nb/docs',
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
