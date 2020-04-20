#!/usr/bin/env node
import 'source-map-support/register';
import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import { Vpc, Peer, Port, SecurityGroup, MachineImage,
  Instance, InstanceType, InstanceClass, InstanceSize } from "@aws-cdk/aws-ec2";

export const KEPServerExImageId: string ='ami-012ddf6cd25ab1e61';

export class EcsTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

      // Create new VPC
      const vpc = new Vpc(this, 'VPC');

      // Open ports for connections from anywhere
      // WARNING: be aware of the impact on using such settings, better retrict access to a VPN or others
      const mySecurityGroup = new SecurityGroup(this, 'SecurityGroup', {
        vpc,
        securityGroupName: "my-test-sg",
        description: 'Allow ssh, rdp and opc/tcp access to ec2 instances from anywhere',
        allowAllOutbound: true,
      });
      mySecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22), 'allow public ssh access')
      mySecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(3389), 'allow public rdp access')
      mySecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(4840), 'allow public opc access')

      // Sample: for a regular AMAZON LINUX AMI the simplest object would be:
      // const awsAMI = new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 });

      // For custom (Windows) images, instantiate a `GenericWindowsImage`
      // with a map giving the AMI to in for each region:
      const genericWindows = MachineImage.genericWindows({
        'eu-central-1': KEPServerExImageId,
        // ...
      });

      // Instance details
      const ec2Instance = new Instance(this, 'Instance', {
        vpc,
        instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.NANO),
        machineImage: genericWindows,
        securityGroup: mySecurityGroup
      });

    }
}

const app = new App();
new EcsTemplateStack(app, 'Ec2TemplateStack', {
   env: {
     region: 'eu-central-1'
   }
});

