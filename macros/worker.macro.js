const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(
  ({ references: { default: paths }, babel: { types: t } }) => {
    paths.forEach(({ parentPath }) => {
      const state = "__state426799876548";
      const task = "__task426799876548";
      const rand = ~~(Math.random() * 1000);
      const _ = ["fn", "state", "worker"].reduce((memo, key) => {
        memo[key] = `__${key}${rand}`;
        return memo;
      }, {});
      parentPath.replaceWith(
        t.functionExpression(
          t.identifier(_["worker"]),
          [t.identifier(state)],
          t.blockStatement([
            t.functionDeclaration(
              t.identifier(task),
              [t.identifier(_["state"]), t.identifier(_["fn"])],
              t.blockStatement([
                t.expressionStatement(
                  t.assignmentExpression(
                    "=",
                    t.identifier(`${task}.counter`),
                    t.logicalExpression(
                      "||",
                      t.identifier(`${task}.counter`),
                      t.numericLiteral(0)
                    )
                  )
                ),
                t.expressionStatement(
                  t.assignmentExpression(
                    "=",
                    t.identifier(`${task}.counter`),
                    t.binaryExpression(
                      "+",
                      t.identifier(`${task}.counter`),
                      t.numericLiteral(1)
                    )
                  )
                ),
                t.ifStatement(
                  t.logicalExpression(
                    "&&",
                    t.identifier(_["state"]),
                    t.binaryExpression(
                      "!==",
                      t.identifier(`${_["state"]}.id`),
                      t.binaryExpression(
                        "-",
                        t.identifier(`${task}.counter`),
                        t.numericLiteral(1)
                      )
                    )
                  ),
                  t.blockStatement([
                    t.returnStatement(
                      t.callExpression(t.identifier("Object.assign"), [
                        t.objectExpression([]),
                        t.identifier(_["state"]),
                        t.objectExpression([
                          t.objectProperty(
                            t.stringLiteral("status"),
                            t.booleanLiteral(false)
                          ),
                        ]),
                      ])
                    ),
                  ])
                ),
                t.returnStatement(
                  t.objectExpression([
                    t.objectProperty(
                      t.stringLiteral("id"),
                      t.identifier(`${task}.counter`)
                    ),
                    t.objectProperty(
                      t.stringLiteral("args"),
                      t.awaitExpression(
                        t.callExpression(t.identifier(_["fn"]), [
                          t.identifier(`${_["state"]}?${_["state"]}.args:null`),
                        ])
                      )
                    ),
                    t.objectProperty(
                      t.stringLiteral("status"),
                      t.booleanLiteral(true)
                    ),
                  ])
                ),
              ]),
              false,
              true
            ),
            parentPath.node.arguments[0].body,
          ]),
          true,
          true
        )
      );
    });
  }
);
