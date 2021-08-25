/**
 * @fileoverview Disallow use of `Button` component from `@strv/design-system-legacy`
 */
"use strict";

const utils = require("../../utils");

const componentName = "Button";

const types = ["submit", "reset", "button"];

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow use of `Button` component from `@strv/design-system-legacy`",
      category: "",
      recommended: true,
      url: "https://github.com/LukasPolak/eslint-plugin-example/blob/main/docs/rules/button.md",
    },
    fixable: "code",
    schema: [],
  },

  create(context) {
    let localName;

    return {
      ImportDeclaration(node) {
        if (utils.isLegacyImport(node)) {
          node.specifiers.forEach((specifier) => {
            if (specifier.imported.name === componentName) {
              localName = specifier.local.name;

              utils.generateImportReport(
                context,
                node,
                specifier,
                componentName
              );
            }
          });
        }
      },
      JSXOpeningElement(node) {
        if (node.name.name === localName) {
          node.attributes.forEach((node) => {
            switch (node.name.name) {
              case "isDisabled":
                utils.generateRenamedPropReport(context, node, "disabled");

                break;

              case "deprecatedProp":
                utils.generateRemovedPropReport(context, node);

                break;

              case "type":
                if (node?.value?.value === "formSubmit") {
                  utils.generateRenamedPropValueReport(context, node, "submit");
                } else {
                  utils.generateIncorrectPropValueReport(context, node, types);
                }

                break;
            }
          });
        }
      },
    };
  },
  componentName,
  types,
};
