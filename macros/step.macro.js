const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(
  ({ references: { default: paths }, babel: { types: t } }) => {
    paths.forEach(({ parentPath }) => {
      const state = "__state426799876548";
      const task = "__task426799876548";
      parentPath.replaceWith(
        t.assignmentExpression(
          "=",
          t.identifier(state),
          t.yieldExpression(
            t.callExpression(t.identifier(task), [
              t.identifier(state),
              parentPath.node.arguments[0],
            ])
          )
        )
      );
    });
  }
);
