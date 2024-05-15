//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  webpack(config, { isServer }) {
    // Find the existing CSS rule and modify it
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('css')
    );

    if (cssRule) {
      // Ensure it only applies to CSS Modules
      cssRule.oneOf.forEach((r) => {
        if (r.use) {
          r.use.forEach((u) => {
            if (u.loader && u.loader.includes('css-loader')) {
              u.options = {
                ...u.options,
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  mode: 'local',
                },
              };
            }
          });
        }
      });
    }

    // Return the modified config
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
