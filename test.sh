#!/bin/bash
COMMAND="node node_modules/.bin/babel index.js"

STATE=$($COMMAND | node - "$STATE")
echo $STATE | base64 -d; echo

STATE=$(echo '{"id":1,"args":{"image":"IMAGE_IN_BASE64"}}' | base64)
STATE=$($COMMAND | node - "$STATE")
echo $STATE | base64 -d; echo

STATE=$(echo '{"id":2}' | base64)
STATE=$($COMMAND | node - "$STATE")
echo $STATE | base64 -d; echo

STATE=$(echo '{"id":3}' | base64)
STATE=$($COMMAND | node - "$STATE")
echo $STATE | base64 -d; echo
