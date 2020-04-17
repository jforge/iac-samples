#!/usr/bin/env node
import 'source-map-support/register';
import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";

export class EcsTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

      // Create new VPC
      const vpc = new ec2.Vpc(this, 'VPC');

      // Open port 22 for SSH connection from anywhere
      const mySecurityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
        vpc,
        securityGroupName: "my-test-sg",
        description: 'Allow ssh access to ec2 instances from anywhere',
        allowAllOutbound: true,
      });
      mySecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allow public ssh access')
      mySecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(3389), 'allow public rdp access')
      mySecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(4840), 'allow public opc access')

      // ami-012ddf6cd25ab1e61

      // We are using the latest AMAZON LINUX AMI
      const awsAMI = new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 });

      // Instance details
      const ec2Instance = new ec2.Instance(this, 'Instance', {
        vpc,
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.NANO),
        machineImage: awsAMI,
        securityGroup: mySecurityGroup
      });

    }
}

const app = new App();
new EcsTemplateStack(app, 'Ec2TemplateStack');

