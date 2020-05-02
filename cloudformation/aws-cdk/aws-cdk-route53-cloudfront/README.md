# Deploying Route 53 and Cloudformation resources

Demonstrates provisioning of Route53 Zone resources together with a Cloudfront distribution.

## CDK synth with Route53

Using `cdk synth` causes the stack to be matched with remote resources for the selected AWS profile,
if using some lookup function like `HostedZone.fromLookup` to determine a Zone instance.
   
Synthesis then throws an error, if the referenced Route53 zone does not exist on the remote AWS account.

```
[Error at /StaticSiteStack] Found zones: [] for dns:abc.example.org., privateZone:undefined, vpcId:undefined, but wanted exactly 1 zone
Found errors
```

To avoid this, choose the respective profile: `cdk synth --profile <profile_name_of_account_managing_the_route53_zone>`

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## References

- [Route53 CDK API Reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-route53-readme.html)
