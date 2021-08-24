# Disallow use of `Button` component from `@strv/design-system-legacy` (button)

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../../lib/code-examples/button-incorrect.jsx) -->
<!-- The below code snippet is automatically added from ../../lib/code-examples/button-incorrect.jsx -->

```jsx
import { Button } from "@strv/design-system-legacy";

const Home = () => {
  return <Button />;
};
```

<!-- AUTO-GENERATED-CONTENT:END -->

Examples of **correct** code for this rule:

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=../../lib/code-examples/button-correct.jsx) -->
<!-- The below code snippet is automatically added from ../../lib/code-examples/button-correct.jsx -->

```jsx
import { Button } from "@strv/design-system";

const Home = () => {
  return <Button />;
};
```

<!-- AUTO-GENERATED-CONTENT:END -->

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
