"use strict";

const { rules } = require("./lib/index");
const utils = require("./utils");

const ruleTableRows = Object.keys(rules)
  .sort()
  .map((id) => {
    const { meta } = rules[id];
    const { fixable, docs } = meta;

    return [
      docs.recommended ? "✔" : "",
      fixable ? "🔧" : "",
      `[@strv/design-system/${id}](docs/rules/${id}.md)`,
      docs.description,
    ].join(" | ");
  });

const buildRulesTable = (rows) => {
  const header = "✔ | 🔧 | Rule | Description";
  const separator = ":---: | :---: | :--- | :---";

  return [header, separator, ...rows].map((row) => `| ${row} |`).join("\n");
};

const DESIGN_SYSTEM_LEGACY_RULES = () => buildRulesTable(ruleTableRows);

const DESIGN_SYSTEM_LEGACY_RECOMMENDED_RULES = () =>
  [
    "```json",
    JSON.stringify(utils.generateRecommendedRules(rules), null, 2),
    "```",
  ].join("\n");

module.exports = {
  transforms: {
    DESIGN_SYSTEM_LEGACY_RULES,
    DESIGN_SYSTEM_LEGACY_RECOMMENDED_RULES,
  },
  callback: () => {
    console.log("markdown processing done.");
  },
};
