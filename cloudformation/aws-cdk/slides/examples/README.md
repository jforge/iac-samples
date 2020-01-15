# Examples

## Disassembling Cloudformation templates

The given source templates are taken from [AWS Cloudformation Templates](https://aws.amazon.com/de/cloudformation/aws-cloudformation-templates/).

Github: https://github.com/awslabs/aws-cloudformation-templates

Use `cdk-dasm` to disassemble templates to generate rudimentary TypeScript CDK code:

```bash
cdk-dasm < LambdaBackedCustomResourceWithPythonRuntime.template > LambdaBackedCustomResourceWithPythonRuntime.stack.ts
```

NPM  package: https://www.npmjs.com/package/cdk-dasm


## Deploy Vue.js APP 

[GCME Gif Search](http://gcme-search.s3-website.eu-central-1.amazonaws.com/)

