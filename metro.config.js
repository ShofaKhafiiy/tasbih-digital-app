const path = require("path");

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

const threeEsm = path.resolve(
  __dirname,
  "node_modules/three/build/three.module.js",
);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "three") {
    return { filePath: threeEsm, type: "sourceFile" };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
