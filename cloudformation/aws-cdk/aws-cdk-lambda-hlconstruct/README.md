# AWS CDK sample for NodejsFunction Higher Level Construct

The NodejsFunction construct was introduced with AWS CDK 1.23.0 .
and provides a shortcut with certain defaults (e.g. Node.js 12.x by the time of writing)

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Parcel

The construct calls the Parcel Bundler with some configurable properties.

To be able to use the construct you need:

- The lambda function named by the stack file (index.ts -> index.(construct-id).ts)
  - The (construct-id) is the name used in the NodejsFunction constructor.
- The Parcel module in dev dependencies:
  - `npm i parcel --save-dev`
  - Otherwise the following error occurs: `Error: spawnSync parcel ENOENT`

## Useful commands

- `npm run build`   compile typescript to js
- `npm run watch`   watch for changes and compile
- `npm run clean`   cleanup compiled files (.d.ts, .js, .js.map) matching any .ts file
- `cdk deploy`      deploy this stack to your default AWS account/region
- `cdk diff`        compare deployed stack with current state
- `cdk synth`       emits the synthesized CloudFormation template
