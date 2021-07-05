module.exports = {
  concurrency: 5,
  failFast: true,
  nonSemVerExperiments: {
    configurableModuleFormat: true,
  },
  extensions: ["ts"],
  require: require.resolve("ts-node/register"),
  files: ["test/**/*", "!test/utils"],
};
