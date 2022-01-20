module.exports = {
  "typescript": { "reactDocgen": false },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.fallback.stream = false;
    config.resolve.fallback.os = false;
    config.resolve.fallback.http = false;
    config.resolve.fallback.https = false;

    // Return the altered config
    return config;
  },
}