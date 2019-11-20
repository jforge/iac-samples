#!/usr/bin/env bash

aws ssm get-parameters-by-path --path /DeploymentConfig

dynamoDbTableName=$(aws ssm get-parameter --name /DeploymentConfig/dev/RequestRouting/DynamoDB/TableName --query Parameter.Value)

aws dynamodb delete-table --table-name $dynamoDbTableName
