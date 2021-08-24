/**
 * @fileoverview Disallow use of `Button` component from `@strv/design-system-legacy`
 */
"use strict";

const rule = require("../../../lib/rules/button");
const RuleTester = require("eslint").RuleTester;
const utils = require("../../../utils");

const { correctCode, incorrectCode, outputCode } =
  utils.getCodeExamples("button");

const ruleTester = new RuleTester(utils.ruleTesterConfig);

ruleTester.run("button", rule, {
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
          message: utils.generateComponentImportMessage(rule.componentName),
        },
        {
          message: utils.generateRenamedPropMessage("isDisabled", "disabled"),
        },
        {
          message: utils.generateRemovedPropMessage("deprecatedProp"),
        },
      ],
      output: `\n${outputCode}`,
    },
  ],
});
