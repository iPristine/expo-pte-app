// const { getDefaultConfig } = require('expo/metro-config');
// const defaultConfig = getDefaultConfig(__dirname);

// module.exports = {
//   resolver: {
//     assetExts: [...defaultConfig.resolver.assetExts, 'db', 'json'],
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// };

// module.exports = config

// const path = require("path");

// const defaultAssetExts = require("metro-config/src/defaults/defaults").assetExts;

// module.exports = {
//     resolver: {
//         assetExts: [
//             ...defaultAssetExts,
//             "db", "sqlite", 'png', 'jpg', 'jpeg', 'gif', 'mp4'
//         ],
//         // extraNodeModules: {
//         //     'react-native': path.resolve(__dirname, 'node_modules/react-native'),
//         // },
//     },
// };

const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("db")

module.exports = defaultConfig;