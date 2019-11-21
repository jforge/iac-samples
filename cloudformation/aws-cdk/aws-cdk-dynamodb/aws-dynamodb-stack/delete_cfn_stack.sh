#!/usr/bin/env bash

source exportAwsEnvironment.sh

echo "Deleting Stack for Profile $AWS_PROFILE in region $AWS_DEFAULT_REGION"

STACK_NAME=AwsDynamodbStack

aws cloudformation delete-stack --stack-name $STACK_NAME
