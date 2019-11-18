#!/bin/sh

aws cloudformation deploy --stack-name routing-sample-s3 --template-file s3.yml
#--parameter-overrides LambdaHandlerPath=index.handler EnvName=dev --capabilities CAPABILITY_NAMED_IAM
