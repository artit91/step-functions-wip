# Naive implementation of step functions

Step functions can help to interrupt serverless (Cloud Functions, AWS Lambda) workers to shorten running times.

This naive implementation uses babel to generate async generators from pretty worker syntax.

It supports embedding workers and parrallel execution with minimal memory footprint.

Application:

- It allows you to run very lightweight webservers with serverless support backend
- Outsource connection management and pooling of mysql, mongodb, postgresql, etc
- Handle all IO on high performance, low cost instances
- Many others

## `test.sh`

```bash
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
```

## Output of `test.sh`

```text
I'm doing some calculations...
{"id":1,"args":{"message":"Could you request an image for me, please?","imgUrl":"https://picsum.photos/200/300"}}
Thank you, I got the image: IMAGE_IN_BASE64
I'm going to resize this image...
Resize done.
{"id":2,"args":{"message":"Could you distribute the image, please?","imgBase64":"IMAGE_IN_BASE64"}}
Cheers! Image distributed!
{"id":3,"args":{"message":"Could you update the user's profile picture, please?"}}
I'm doing some cleanup..
```
