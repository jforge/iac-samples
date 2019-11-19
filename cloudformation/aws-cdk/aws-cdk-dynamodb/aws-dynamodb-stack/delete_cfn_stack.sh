#!/usr/bin/env bash

STACK_NAME="AwsDynamodbStack"

aws cloudformation delete-stack --stack-name $STACK_NAME
