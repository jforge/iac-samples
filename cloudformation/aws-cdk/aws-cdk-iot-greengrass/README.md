# AWS IoT Greengrass sample project

This is a AWS CDK project for demonstrating AWS IoT Greengrass and companion services.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

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
