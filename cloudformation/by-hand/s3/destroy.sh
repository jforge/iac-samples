#!/bin/sh

aws cloudformation delete-stack --stack-name routing-sample-s3
#--parameter-overrides LambdaHandlerPath=index.handler EnvName=dev --capabilities CAPABILITY_NAMED_IAM
