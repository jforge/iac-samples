#!/usr/bin/env bash

PROFILE="default"
STACK_NAME="DynamodbStack"

aws cloudformation delete-stack --stack-name $STACK_NAME --profle $PROFILE
