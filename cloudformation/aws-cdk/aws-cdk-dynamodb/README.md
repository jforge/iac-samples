# Deploying DynamoDB resources

Demonstrates provisioning of a DynamoDB tables optionally replicates as a Global table.

## Setup

The database folder contains tools to work and test with a deployed DynamoDB stack.
The cdk-stack folder contains the CDK deployment project for a DyanmoDB with some initial content.

To initialize the CDK project, use the CDK CLI, switch to the stack folder and type

```
cdk init app --language=typescript
```

## References

[DynamoDB CDK API Reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-dynamodb-readme.html)
