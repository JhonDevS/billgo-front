const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add resolution for Firebase subpath exports
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs", "cjs"];
config.resolver.assetExts = [...config.resolver.assetExts, "png", "jpg", "jpeg", "gif"];

module.exports = config;