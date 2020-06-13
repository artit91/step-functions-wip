const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(
  ({ references: { default: paths }, babel: { types: t } }) => {
    paths.forEach(({ parentPath }) => {
      const state = "__state426799876548";
      parentPath.replaceWith(
        t.ifStatement(
          t.unaryExpression("!", t.identifier(state)),
          t.expressionStatement(
            t.assignmentExpression(
              "=",
              t.identifier(state),
              t.objectExpression([
                t.objectProperty(t.stringLiteral("id"), t.numericLiteral(0)),
                t.objectProperty(
                  t.stringLiteral("args"),
                  t.awaitExpression(
                    t.callExpression(parentPath.node.arguments[0], [])
                  )
                ),
              ])
            )
          )
        )
      );
    });
  }
);
