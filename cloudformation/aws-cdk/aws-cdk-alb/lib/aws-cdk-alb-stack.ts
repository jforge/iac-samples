import { App, Stack, StackProps } from '@aws-cdk/core';
import { Vpc, InstanceClass, InstanceSize, InstanceType, AmazonLinuxImage } from '@aws-cdk/aws-ec2';
import { ApplicationLoadBalancer } from '@aws-cdk/aws-elasticloadbalancingv2';
import { AutoScalingGroup } from '@aws-cdk/aws-autoscaling';

export class AwsCdkAlbStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc: Vpc = new Vpc(this, 'VPC');

    // Create the load balancer in a VPC. 'internetFacing' is 'false'
    // by default, which creates an internal load balancer.
    const lb: ApplicationLoadBalancer = new ApplicationLoadBalancer(this, 'LB', {
      vpc,
      internetFacing: true
    });

    // Add a listener and open up the load balancer's security group to the world.
    // 'open' is the default, set this to 'false' and use `listener.connections`
    // if you want to be selective about who can access the listener.
    const listener = lb.addListener('Listener', {
      port: 80,
      open: true
    });

    // Create an AutoScaling group and add it as a load balancing target to the listener.
    const autoScalingGroup: AutoScalingGroup = new AutoScalingGroup(this, 'ASG', {
      vpc: vpc,
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
      machineImage: new AmazonLinuxImage()
    })

    listener.addTargets('ApplicationFleet', {
      port: 8080,
      targets: [autoScalingGroup]
    });

    listener.connections.allowDefaultPortFromAnyIpv4('Open to the world!');

    autoScalingGroup.scaleOnRequestCount('ModestLoad', {
      targetRequestsPerSecond: 1
    })

  }
}
