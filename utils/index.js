const fs = require("fs");
const path = require("path");

const generateRecommendedRules = (rules) => {
  return Object.keys(rules).reduce((result, rule) => {
    const fullRuleName = `@strv/design-system/${rule}`;

    result[fullRuleName] = "error";

    return result;
  }, {});
};

const getCodeExamples = (ruleId) => {
  const readFile = (file, variant) => {
    return fs.readFileSync(
      path.resolve(__dirname, `../lib/code-examples/${file}-${variant}.jsx`),
      "utf8"
    );
  };

  const correctCode = readFile(ruleId, "correct");
  const incorrectCode = readFile(ruleId, "incorrect");
  const outputCode = readFile(ruleId, "output");

  return { correctCode, incorrectCode, outputCode };
};

const ruleTesterConfig = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
};

const isLegacyImport = (node) => {
  return ["@strv/design-system-legacy"].includes(node.source.value);
};

const generateComponentImportMessage = (componentName) => {
  return `Do not import \`${componentName}\` from \`@strv/design-system-legacy\`. Use \`@strv/design-system\` instead.`;
};

const generateImportReport = (context, node, specifier, componentName) => {
  context.report({
    node: specifier.imported,
    message: generateComponentImportMessage(componentName),
  });
};

module.exports = {
  generateRecommendedRules,
  getCodeExamples,
  ruleTesterConfig,
  isLegacyImport,
  generateComponentImportMessage,
  generateImportReport,
};
