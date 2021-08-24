/**
 * @fileoverview Disallow use of `Button` component from `@strv/design-system-legacy`
 */
"use strict";

const utils = require("../../utils");

const componentName = "Button";

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
    fixable: null,
    schema: [],
  },

  create(context) {
    return {};
  },
  componentName,
};
