const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'yjnqzh',
  component: {
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
});
