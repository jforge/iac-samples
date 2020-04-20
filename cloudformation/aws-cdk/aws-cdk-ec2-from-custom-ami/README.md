# EC2 deployment with Custom AMI

This sample demonstrates how to deploy an EC2 instance using a custom (windows) AMI.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Deployment duration

`cdk deploy` and `cdk destroy` both need about 3 minutes to deploy or to destroy the cloudformation stack
and respective resources.

## Region agnostic stack

This stack does work, if the stack is not defined as region agnostic by ommitted any specific region setting
in the Stack Props.

For a custom AMI a region needs to be defined in the StackProps.

## Resources

- [CDK API Docs EC2 Machine Images](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-ec2-readme.html#machine-images-amis)


## Useful commands

- `npm run build`   compile typescript to js
- `npm run watch`   watch for changes and compile
- `npm run clean`   cleanup compiled files (.js, .d.ts, .js.map) matching any .ts file
- `npm run test`    perform the jest unit tests
- `cdk deploy`      deploy this stack to your default AWS account/region
- `cdk diff`        compare deployed stack with current state
- `cdk synth`       emits the synthesized CloudFormation template

- `cdk deploy --profile <your-profile`          choose a specific aws profile for deployment
- `cdk destroy ---profile <your-profile`        destroy resources of the stack for a specific profile
