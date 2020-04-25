import * as cdk from '@aws-cdk/core';
import { CfnThing , CfnThingProps } from '@aws-cdk/aws-iot';

export class AwsIotSampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let thingProps: CfnThingProps = {
      thingName: "The Thing"
    }
    let thing: CfnThing = new CfnThing(this,"the-thing", thingProps);

  }
}
