---
to: lib/rules/<%- h.changeCase.kebab(id) %>.js
---

/**
 * @fileoverview <%- description %>
 */
"use strict";

const utils = require("../../utils");

const componentName = "<%- h.changeCase.pascal(id) %>";

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "<%- description %>",
      category: "",
      recommended: true,
       url: "https://github.com/LukasPolak/eslint-plugin-example/blob/main/docs/rules/<%- h.changeCase.kebab(id) %>.md",
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    return {};
  },
  componentName,
};
