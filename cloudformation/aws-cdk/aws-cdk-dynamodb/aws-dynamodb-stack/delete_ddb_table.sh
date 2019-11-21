#!/usr/bin/env bash

source exportAwsEnvironment.sh

echo "Deleting DynamoDB Table for Profile $AWS_PROFILE in region $AWS_DEFAULT_REGION"

dynamoDbTableName=$(aws ssm get-parameter --name /DeploymentConfig/dev/RequestRouting/DynamoDB/TableName --query Parameter.Value | tr -d '\"')

aws dynamodb delete-table --table-name $dynamoDbTableName
