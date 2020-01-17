import * as cdk from '@aws-cdk/core';
import * as sg from '@aws-cdk/aws-sagemaker';
import * as iam from '@aws-cdk/aws-iam';

export class AwsCdkSagemakerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const role = new iam.Role(
      this,
      id + 'notebook-role',
      {
        assumedBy: new iam.ServicePrincipal('sagemaker.amazonaws.com')
      }
    );

    const _notebook = new sg.CfnNotebookInstance(
      this,
      id + '-sagemaker-endpoint',
      {
        instanceType: 'ml.t2.medium',
        //        securityGroupIds: [this.securityGroup.securityGroupId],
        //        subnetId: vpc.privateSubnets[0].subnetId,
        directInternetAccess: 'Enabled',
        roleArn: role.roleArn
      }
    );

  }
}
