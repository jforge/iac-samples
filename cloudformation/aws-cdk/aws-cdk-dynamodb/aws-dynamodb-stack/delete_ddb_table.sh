#!/usr/bin/env bash

PROFILE="default"

aws ssm get-parameters-by-path --path /DeploymentConfig --profile $PROFILE

dynamoDbTableName=$(aws ssm get-parameter --name /DeploymentConfig/dev/RequestRouting/DynamoDB/TableName --query Parameter.Value --profile $PROFILE)

aws dynamodb delete-table --table-name $dynamoDbTableName --profile $PROFILE
