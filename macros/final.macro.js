const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(
  ({ references: { default: paths }, babel: { types: t } }) => {
    paths.forEach(({ parentPath }) => {
      const state = "__state426799876548";
      parentPath.replaceWithMultiple([
        t.assignmentExpression(
          "=",
          t.identifier(`${state}.args`),
          t.awaitExpression(
            t.callExpression(parentPath.node.arguments[0], [
              t.identifier(`${state}.args`),
            ])
          )
        ),
        t.identifier(`return ${state}`),
      ]);
    });
  }
);
