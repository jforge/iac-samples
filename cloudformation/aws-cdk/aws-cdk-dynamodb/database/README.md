# Using DynamoDB with JavaScript

Demonstrates some basic handling of DynamoDB resources and a utility to process raw json input.

## Setup

Configure your environment with ```aws_resource_config.yml```

If the DynamoDB target is a local environment (see [Docker Image dynamodb-local](https://hub.docker.com/r/amazon/dynamodb-local)),
then set the configuration parameter ```useLocalEndpoint``` to 'true'.

Have the AWS CLI to verify proper content in the addressed environment, e.g. ```aws dynamodb scan --table-name Your-Table```.

