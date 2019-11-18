#!/bin/sh

aws cloudformation deploy --stack-name lambda-sample --template-file lambda_origin-request.yml --parameter-overrides LambdaHandlerPath=index.handler EnvName=dev --capabilities CAPABILITY_NAMED_IAM
