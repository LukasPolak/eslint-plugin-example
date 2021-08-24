---
to: tests/lib/rules/<%- h.changeCase.kebab(id) %>.js
---

/**
 * @fileoverview <%- description %>
 */
"use strict";

const rule = require("../../../lib/rules/<%- h.changeCase.kebab(id) %>");
const RuleTester = require("eslint").RuleTester;
const utils = require("../../../utils");

const { correctCode, incorrectCode, outputCode } =
  utils.getCodeExamples("<%- h.changeCase.kebab(id) %>");

const ruleTester = new RuleTester(utils.ruleTesterConfig);

ruleTester.run("<%- h.changeCase.kebab(id) %>", rule, {
  valid: [
    {
      code: correctCode,
    },
  ],
  invalid: [
    {
      code: incorrectCode,
      errors: [
        {
          message: "",
        },
      ],
      output: `\n${outputCode}`,
    },
  ],
});
