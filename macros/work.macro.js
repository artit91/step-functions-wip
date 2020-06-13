const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(
  ({ references: { default: paths }, babel: { types: t } }) => {
    paths.forEach(({ parentPath }) => {
      const rand = ~~(Math.random() * 1000);
      const _ = ["pipeline", "state", "gen", "gs"].reduce((memo, key) => {
        memo[key] = `__${key}${rand}`;
        return memo;
      }, {});
      parentPath.replaceWith(
        t.callExpression(
          t.arrowFunctionExpression(
            [t.identifier(_["pipeline"]), t.identifier(_["state"])],
            t.blockStatement([
              t.variableDeclaration("const", [
                t.variableDeclarator(
                  t.identifier(_["gen"]),
                  t.callExpression(t.identifier(_["pipeline"]), [
                    parentPath.node.arguments[1],
                  ])
                ),
              ]),
              t.variableDeclaration("let", [
                t.variableDeclarator(
                  t.identifier(_["gs"]),
                  t.awaitExpression(
                    t.callExpression(t.identifier(`${_["gen"]}.next`), [])
                  )
                ),
              ]),
              t.whileStatement(
                t.logicalExpression(
                  "&&",
                  t.unaryExpression("!", t.identifier(`${_["gs"]}.done`)),
                  t.unaryExpression(
                    "!",
                    t.identifier(`${_["gs"]}.value.status`)
                  )
                ),
                t.blockStatement([
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      t.identifier(_["gs"]),
                      t.awaitExpression(
                        t.callExpression(t.identifier(`${_["gen"]}.next`), [
                          t.identifier(`${_["gs"]}.value`),
                        ])
                      )
                    )
                  ),
                ])
              ),
              t.expressionStatement(
                t.unaryExpression(
                  "delete",
                  t.identifier(`${_["gs"]}.value.status`)
                )
              ),
              t.returnStatement(t.identifier(`${_["gs"]}.value`)),
            ]),
            true
          ),
          parentPath.node.arguments
        )
      );
    });
  }
);
