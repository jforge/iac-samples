# Amazon AWS SAM samples for serverless appications

Purpose of this project is to demonstrate AWS Serverless Application Model (SAM).

## Prerequisites

This is a [AWS SAM](https://aws.amazon.com/de/cdk/) and [TypeScript](https://typescriptlang.org) based project. 

AWS CDK is the official Amazon way to use modern programming languages for convenient infrastructure deployment, the selected infrastructure language is Typescript.

Besides the regular AWS CLI also install the AWS CDK CLI or use respective docker containers.

### Installation 

Have a proper local AWS configration and follow the guide [Insallation the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

You should see Version 0.33.0 or higher after installation using `sam --version`.

Have Docker installed for useful local applications tests deployment builds using the `--use-container` flag.


## Create an application

```bash
sam init
cd sam-app 
sam build
```

`sam init` creates a folder `sam-app` containing a SAM sample application.

Read the respective [SAM App README file](./sam-app/README.md).

The SAM magic - in this case  - is the implicit API Gateway built by provinding some lambda event declaration.


## Test the application locally

```bash
sam local invoke --event events/event.json
sam deploy --guided 
```

`sam local invoke` tests the lambda function instrumenting a docker image (One-off invocation).


Manual testing can be done using 

```bash
sam local start-api
```

This provide a local endpoint (docker) and the function can be tested with `http://localhost:3000/hello`.


## Deploy the application

```bash
sam deploy --guided 
```

`sam deploy --guided` guides you through the rollout process of the Lambda function and its companion API gateway. During the process several resources will be created through Cloudformation.


https://gg9uqwgal6.execute-api.eu-central-1.amazonaws.com/Prod/hello


## Destroy the application

Unlike other IaC toolkits SAM CLI does not provide an explicit destruction method for the app.

Therefore we need to use the AWS CLI and take it down using the respective Cloudformation stack

```bash
aws cloudformation delete-stack --stack-name <your_stack_name> --region <the_region_you_deployed-to>
```

There is no feedback about this process and the return code is always 0, so you need to verify the removal of the app in AWS console or using `aws cloudformation describe-stacks`.

Be aware, that SAM deploys a special (bootstrap-like) stack called `aws-sam-cli-managed-default` that is no more removed.


## Further Resources

* [Comparing AWS SAM with Serverless Framework](https://sanderknape.com/2018/02/comparing-aws-sam-with-serverless-framework/))
* [Getting Started with AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html)
* [Github Project awslabs/aws-sam-cli](https://github.com/awslabs/aws-sam-cli)
