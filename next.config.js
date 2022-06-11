const withImages = require("next-images");

const config = {
  fileExtensions: ["jpg", "jpeg", "png", "gif", "ico", "webp", "jp2", "avif"],
  pageExtensions: ["tsx","ts"],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: "json",
          use: "yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
      ]
    );
    return config;
  },
};

module.exports = withImages(config);
