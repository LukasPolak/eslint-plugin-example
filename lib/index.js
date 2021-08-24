/**
 * @fileoverview ESLint rules for design-system
 */
"use strict";

const requireIndex = require("requireindex");

const utils = require("../utils");

const rules = requireIndex(__dirname + "/rules");

module.exports.rules = rules;

const recommendedRules = utils.generateRecommendedRules(rules);

module.exports.configs = {
  recommended: {
    rules: recommendedRules,
  },
};
