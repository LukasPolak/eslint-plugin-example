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

const generateImports = (node, componentName, suffix = "") => {
  const generatedImport = node.specifiers.map((specifier) => {
    const importedName = specifier.imported.name;
    const localName = specifier.local.name;

    if (importedName === componentName) {
      if (importedName !== localName) {
        return `import { ${importedName}${suffix} as ${localName} } from "@strv/design-system";`;
      } else {
        return `import { ${importedName}${suffix} } from "@strv/design-system";`;
      }
    }
  });

  const legacyImportComponents = node.specifiers
    .filter((specifier) => {
      return specifier.imported.name !== componentName;
    })
    .map((specifier) => {
      const importedName = specifier.imported.name;
      const localName = specifier.local.name;

      if (importedName !== localName) {
        return `${importedName} as ${localName}`;
      } else {
        return `${importedName}`;
      }
    });

  const legacyImport = legacyImportComponents.length
    ? `import { ${legacyImportComponents.join(
        ",\n"
      )} } from "@strv/design-system-legacy";`
    : "";

  return [legacyImport, ...generatedImport].join("\n");
};

const generateImportReport = (context, node, specifier, componentName) => {
  context.report({
    node: specifier.imported,
    message: generateComponentImportMessage(componentName),
    fix(fixer) {
      return fixer.replaceText(node, generateImports(node, componentName));
    },
  });
};

const generateRenamedPropMessage = (prop, newProp) => {
  return `\`${prop}\` prop was renamed to \`${newProp}\``;
};

const generateRenamedPropReport = (context, node, newProp) => {
  context.report({
    node,
    message: generateRenamedPropMessage(node.name.name, newProp),
    fix(fixer) {
      return fixer.replaceText(node.name, newProp);
    },
  });
};

const generateRemovedPropMessage = (prop) => {
  return `\`${prop}\` prop was removed.`;
};

const generateRemovedPropReport = (context, node) => {
  context.report({
    node,
    message: generateRemovedPropMessage(node.name.name),
  });
};

module.exports = {
  generateRecommendedRules,
  getCodeExamples,
  ruleTesterConfig,
  isLegacyImport,
  generateComponentImportMessage,
  generateImportReport,
  generateRenamedPropMessage,
  generateRenamedPropReport,
  generateRemovedPropMessage,
  generateRemovedPropReport,
};
