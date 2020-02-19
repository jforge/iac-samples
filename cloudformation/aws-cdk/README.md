# The AWS Cloud Development Kit

Infrastructure as Code tool samples with some focus on deployment of Cloudfront, Lambda@edge functions, Route53, ACM, S3 and DynamoDB AWS services.

The AWS Cloud Development Kit is developed in Typescript which is transpiled to JavaScript.

There are bindings for other programming languages to produce Cloudformation deployments: https://docs.aws.amazon.com/de_de/cdk/latest/guide/getting_started.html

Starter recommendation: [CDK Workshop](https://cdkworkshop.com/)

## Techradar

Thoughtworks technology radar tags Handwritten Cloudformation descriptors with HOLD: https://www.thoughtworks.com/radar/tools/handwritten-cloudformation

Reasons can be acceded, let's use regular programming languages and test suites to produce Cloudformation stacks for deploying AWS infrastructure.

One proposal is to use the original [AWS Cloud Development Kit](https://aws.amazon.com/cdk/) for Cloudformation Template production in order not to immediately adopt new high level frameworks like [troposphere](https://www.thoughtworks.com/radar/languages-and-frameworks/troposphere) (Thoughtworks ASSESS) or [Pulumi](https://www.thoughtworks.com/radar/platforms/pulumi) (Thoughtworks ASSESS).

## AWS CDK CLI Setup

```bash
brew install aws-cdk
npm i aws-cdk
cdk init sample-app --language=typescript
```

## References

- https://github.com/aws/aws-cdk
- https://docs.aws.amazon.com/de_de/cli/latest/userguide/install-bundle.html
- https://cdkworkshop.com/
- https://aws.amazon.com/de/blogs/developer/serverless-data-engineering-at-zalando-with-the-aws-cdk/

## SimpleStack Demo

First of all: have an AWS account, aws-cli and configure your local system appropriately (aws configure).

Switch your NVM environment to Node.js v10.16.3 (LTS: Dubnium).

Switch to the aws-cdk-simplestack directory

```bash
npm install
```

### Run unit tests with Jest

```bash
npm run test
```

### Produce a Cloudformation Template

```bash
cdk synth --profile your-profile
```

(use --json to produce this in json instead of yaml)

This may be useful for manual deployment, version comparison, review/testing and transformation purposes.

### Deploy the stack directly

```bash
cdk deploy --profile your-profile
```

### Destroy the stack directly

```bash
cdk destroy --profile your-profile
```

### Calculate a difference to a deployed stack

```bash
cdk diff --profile your-profile
```

## Lambda Cron Demo

Follow the instructions before.

Be aware that you need createRole and passRole right to produce this stack

## S3 Vue.js Demo

See above.

## DynamDB Demo

See above.

## Route 53 with Cloudfront Demo

See above.

This is based on [a forestry article](https://forestry.io/blog/adding-dns-and-edge-functions-to-our-cloudformation-stack/)

## Unit & Integration Tests

Unit-Tests including Snapshot Tests for resulting Cloudformation Templates 
are realized using [Jest](https://jestjs.io/).

Integration Tests with (partly) local server resources can be realized
with different tools, manually or even with Jest support, like [Jest DynamoDB](https://github.com/shelfio/jest-dynamodb).

The particular resources we can start realistic enviroments for are currently:

- DyanmoDB
- Lambda Functions

### DynamoDB integration tests

Start a local DyanmoDB environment (e.g. in a Docker Container) and use
[Jest DynamoDB](https://github.com/shelfio/jest-dynamodb) for integration tests.

### Lambda Function integration tests

For Lambda function several tools exist:

- [NPM Package Lambda-local](https://www.npmjs.com/package/lambda-local
- [AWS SAM Local CLI](https://aws.amazon.com/de/about-aws/whats-new/2017/08/introducing-aws-sam-local-a-cli-tool-to-test-aws-lambda-functions-locally/)
- [Local Stack](https://localstack.cloud/)
- [Serverless Offline](https://github.com/dherault/serverless-offline)
