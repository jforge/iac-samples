# Using DynamoDB with JavaScript

Demonstrates some basic handling of DynamoDB resources and a utility to process raw json input.

## Setup

Configure your environment with ```aws_resource_config.yml```

If the DynamoDB target is a local environment (see [Docker Image dynamodb-local](https://hub.docker.com/r/amazon/dynamodb-local)),
then set the configuration parameter ```useLocalEndpoint``` to 'true'.

Have the AWS CLI to verify proper content in the addressed environment, e.g. ```aws dynamodb scan --table-name Your-Table```.

## Copying DynamoDB tables

The dynamo copy examples base on the [copy-dynamodb-table npm package](https://www.npmjs.com/package/copy-dynamodb-table).

This tool is capable of copying cross region and cross account without an s3 intermediate or preliminary table creation measures.

A limitation is described in the issue [Add support for ondemand dynamodb tables](https://github.com/enGMzizo/copy-dynamodb-table/issues/20):

To be able to copy a table it cannot be created with zero Read/WriteCapacityUnits.
Especially tables with BillingMode PAY_PER_REQUEST cannot be copied, because no Read/WriteCapacityUnits can be set in this mode.
