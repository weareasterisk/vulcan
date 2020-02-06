module.exports = {
  extends: ["@commitlint/config-conventional", "@commitlint/config-lerna-scopes"],
  rules: {
    "header-max-length": [1, "always", 144],
  },
}
