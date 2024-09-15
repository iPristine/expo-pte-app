// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = {
    ...config,
    // resolver: {
    //     assetExts: [...config.resolver.assetExts, 'db'],
    // },
    // transformer: {
    //     getTransformOptions: async () => ({
    //         transform: {
    //           experimentalImportSupport: false,
    //           inlineRequires: false,
    //         },
    //       }),
    // }
}
