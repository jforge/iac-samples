#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');

// Defines a parameterized application which can be deployed anywhere
interface MyStackProps extends cdk.StackProps {
  dev: boolean;
}

class MyStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: MyStackProps) {
      super(scope, id, props);

      const instanceType = props.dev
          ? ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)
          : new ec2.InstanceType('c5.2xlarge');

      const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 });
      const cluster = new ecs.Cluster(this, 'Ec2Cluster', { vpc });
      cluster.addCapacity('DefaultAutoScalingGroup', {
        instanceType: instanceType
      });

      // ...
  }
}

// Controls where MyStack is ACTUALLY going to be deployed
const app = new cdk.App();

const environments = [
  { account: '12345678', region: 'us-east-1' },
  { account: '87654321', region: 'eu-west-1' },
  { account: '12344321', region: 'eu-central-1' },
];

// Beta instance in the first environment
new MyStack(app, 'BetaStack', { dev: true, env: environments[0] });

// Production instance in every other environment
for (const env of environments) {
  new MyStack(app, `ProdStack-${env.region}`, { dev: false, env });
}
